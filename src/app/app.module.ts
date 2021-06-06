import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ReportCSTComponent } from './components/report-cst/report-cst.component';
import {RouterModule, Routes} from '@angular/router';

const rutas: Routes = [
  {
    path: 'cst',
    component: ReportCSTComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReportCSTComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rutas),
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
