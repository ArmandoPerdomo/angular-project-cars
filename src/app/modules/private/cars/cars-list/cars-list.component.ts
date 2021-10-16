import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import * as moment from "moment";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";
import {UIComponentsService} from "../../../../core/shared/services/ui-components.service";
import { CarsFormComponent } from '../cars-form/cars-form.component';
import {Car} from "../core/models/car.model";
import {CarsService} from "../core/services/cars.service";

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {

  loading: boolean;
  dataSource = new MatTableDataSource<Car>();
  displayedColumns: string[] = ['brand', 'model', 'color', 'admissionDate', 'driver', 'active', 'opts'];

  @ViewChild(MatSort) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator) set pag(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterPredicate(data: Car, filter: string): boolean {
    return data.brand.toLowerCase().indexOf(filter) !== -1 ||
      data.color.toLowerCase().indexOf(filter) !== -1 ||
      data.driver.toLowerCase().indexOf(filter) !== -1 ||
      data.model.toLowerCase().indexOf(filter) !== -1 ||
      (data.active ? 'si' : 'no').indexOf(filter) !== -1 ||
      (moment.unix(data.admissionDate).format('DD/MM/YYYY')).toLowerCase().indexOf(filter) !== -1;
  }

  constructor(
    private carsService: CarsService,
    private ui: UIComponentsService,
    private dialog: MatDialog,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.getAll()
    this.dataSource.filterPredicate = this.filterPredicate;
  }

  getAll() {
    this.loading = true;
    this.carsService.getAll().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.loading = false;
      }, (error) => {
        this.ui.internalError({error});
        this.loading = false;
      }
    )
  }

  async add(){
    const addedData = await this.dialog.open(CarsFormComponent, {
      width: '500px',
      disableClose: true
    }).afterClosed().toPromise();

    if(!addedData) return;

    this.dataSource.data = [addedData, ...this.dataSource.data];
    this.ui.showSnackNotification({customMsg: 'Creación Exitosa'});
  }

  async update(element: Car) {
    const updatedData = await this.dialog.open(CarsFormComponent, {
      width: '500px',
      disableClose: true,
      data: element
    }).afterClosed().toPromise();

    if(!updatedData) return;

    const list = this.dataSource.data;
    const itemIndex = list.findIndex(i => i.id === element.id);
    list[itemIndex] = updatedData;
    this.dataSource.data = list;
    this.ui.showSnackNotification({customMsg: 'Actualización Exitosa'});
  }

  async delete(element: Car) {
    const ok = await this.ui.showDialogNotification(
      'Estas seguro de la operación?',
      'Si continuas puede que no recuperes los datos que estás eliminando',
      'Eliminar'
    ).afterClosed().toPromise();

    if(!ok) return;

    this.carsService.delete(element.id).subscribe(
      () => {
        const list = this.dataSource.data;
        const itemIndex = list.findIndex(i => i.id === element.id);
        list.splice(itemIndex, 1);
        this.dataSource.data = list;
        this.ui.showSnackNotification({customMsg: 'Eliminación Existosa'});
      }, (error) => {
        this.ui.internalError({error});
      }
    );
  }
}
