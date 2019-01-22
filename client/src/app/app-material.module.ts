import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AppMaterialModule { }
