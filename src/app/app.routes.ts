import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: 'list', component: ListComponent },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);