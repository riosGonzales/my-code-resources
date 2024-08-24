import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { ContainerComponent } from '~/modules/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: '', pathMatch: 'full', redirectTo: '' },
    { path: 'categoria/:categoria', component: ContainerComponent },
    { path: '**', redirectTo: '' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutes { }
