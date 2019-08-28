import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})

export class MaterialModule { }
