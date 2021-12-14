import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // APP WELCOME
  {
    path: 'welcome',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'initslide',
    pathMatch: 'full'
  },

  // INIT SLIDE
  {
    path: 'initslide',
    loadChildren: () => import('./pages/initslide/initslide.module').then( m => m.InitslidePageModule)
  },

  // AUTH ROUTING
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },

  // BUDGETS ROUTING
  {
    path: 'budgets',
    loadChildren: () => import('./pages/budget/budgets/budgets.module').then( m => m.BudgetsPageModule)
  },
  {
    path: 'budget/edit',
    loadChildren: () => import('./pages/budget/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'budget/edit/:id',
    loadChildren: () => import('./pages/budget/edit/edit.module').then( m => m.EditPageModule)
  },

  // TRANSACTIONS ROUTING
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transaction/transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'transactions/edit',
    loadChildren: () => import('./pages/transaction/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'transactions/edit/:id',
    loadChildren: () => import('./pages/transaction/edit/edit.module').then( m => m.EditPageModule)
  },

  // HOME PAGE ROUTING
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule)
  },

  // SETTING ROUTING
  {
    path: 'settings/user',
    loadChildren: () => import('./pages/settings/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'car-fuel',
    loadChildren: () => import('./pages/car-fuel/car-fuel.module').then( m => m.CarFuelPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
