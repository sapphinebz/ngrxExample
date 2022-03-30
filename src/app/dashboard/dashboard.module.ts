import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StoreModule } from '@ngrx/store';
import { DashboardState } from '../store/root-store.model';
import { dashboardReducer } from './store/dashboard.reducers';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature<DashboardState>('dashboard', dashboardReducer),
  ],
})
export class DashboardModule {}
