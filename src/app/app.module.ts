import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule, MatSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LineChartComponent } from './01_line_chart/line-chart.component';
import { MultiSeriesComponent } from './02_multi_series_line_chart/multi-series.component';

 import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
    { path: 'line-chart', component: LineChartComponent },
    { path: 'multi-series', component: MultiSeriesComponent },
   
    { path: '',
        redirectTo: '/line-chart',
        pathMatch: 'full'
    },
    { path: '**', component: LineChartComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LineChartComponent,
        MultiSeriesComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatSidenavModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
