import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: '**', component: DashboardComponent
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
