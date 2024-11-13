import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ContainerComponent } from '~/modules/resources/container.component';
import { CreateResourcesComponent } from '~/modules/resources/create-resources/create-resources.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ContainerComponent }, 
      { path: 'categoria/:categoria', component: ContainerComponent },
      { path: 'crear', component: CreateResourcesComponent }, 
      { path: '**', redirectTo: '' } 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutes {}
