import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    ProgressIndicatorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ToolbarComponent,
    ProgressIndicatorComponent
  ]
})
export class SharedModule { }
