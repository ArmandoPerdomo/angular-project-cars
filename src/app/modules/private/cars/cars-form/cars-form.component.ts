import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Moment} from "moment";
import {UIComponentsService} from "../../../../core/shared/services/ui-components.service";
import {Car} from "../core/models/car.model";
import {CarsService} from "../core/services/cars.service";

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private ui: UIComponentsService,
    private carsService: CarsService,
    private ref: MatDialogRef<CarsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Car
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      brand: [this.data ? this.data.brand: '', Validators.required],
      model: [this.data ? this.data.model: '', Validators.required],
      color: [this.data ? this.data.color: '', Validators.required],
      admissionDate: [this.data ? this.data.admissionDate: '', Validators.required],
      driver: [this.data ? this.data.driver: '', Validators.required],
      active: [this.data ? this.data.active: true, Validators.required],
    });
  }

  save(){
    this.loading = true;
    const value = this.form.value;
    value['admissionDate'] = (value['admissionDate'] as Moment).unix();
    if(!this.data){
      this.create(value);
    }else{
      this.update(value);
    }

  }

  create(value: Car){
    this.carsService.create(value).subscribe(
      (data) => {
        this.ref.close(data);
      },
      (error) => {
        this.ui.internalError({error});
        this.loading = false;
      }
    )
  }

  update(value: Car){
    this.carsService.update((this.data as Car).id, value).subscribe(
      () => {
        this.ref.close(Object.assign(this.data, value));
      },
      (error) => {
        this.ui.internalError({error});
        this.loading = false;
      }
    )
  }

}
