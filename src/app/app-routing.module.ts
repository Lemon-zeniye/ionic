import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'tasks',
    component: DescriptionComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
