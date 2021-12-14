import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitslidePage } from './initslide.page';

const routes: Routes = [
  {
    path: '',
    component: InitslidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitslidePageRoutingModule {}
