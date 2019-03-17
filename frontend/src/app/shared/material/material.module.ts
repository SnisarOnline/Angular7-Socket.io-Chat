import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
  MatCardModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatRippleModule,
  MatFormFieldModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatRippleModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatRippleModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: []
})
export class MaterialModule { }
