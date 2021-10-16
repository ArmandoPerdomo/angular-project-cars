import {NgModule} from '@angular/core';
import {MomentFormatPipe} from './moment-format.pipe';

const declarations = [
  MomentFormatPipe,
]

@NgModule({
  declarations: [...declarations],
  exports: [...declarations],
  providers: [...declarations]
})
export class PipesModule { }
