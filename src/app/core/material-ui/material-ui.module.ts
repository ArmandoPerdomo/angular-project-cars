import {LayoutModule} from '@angular/cdk/layout';
import {NgModule} from '@angular/core';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule
} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {CUSTOM_MAT_MOMENT_DATE_FORMATS} from "./consts/custom-mat-moment-date-formats.const";

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatSelectModule,
  MatDividerModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatPaginatorModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatInputModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatDatepickerModule,
  MatTreeModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatMomentDateModule,
  LayoutModule,
  MatRippleModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_MAT_MOMENT_DATE_FORMATS}
  ]
})
export class MaterialModule {}
