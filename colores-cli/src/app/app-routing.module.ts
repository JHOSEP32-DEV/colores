import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {GuestGuard} from "./guards/guest.guard";
import {LoginComponent} from "./pages/user/login/login.component";
import {NotFoundComponent} from "./pages/errors/not-found/not-found.component";
import {ColorsComponent} from "./pages/colors/colors.component";
import {AuthGuard} from "./guards/auth.guard";
import {ColorsResolver} from "./resolvers/colors.resolver";
import {ColorListComponent} from "./pages/colors/color-list/color-list.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'colors',
        component: ColorsComponent,
        canActivate: [AuthGuard],
        resolve: {
          colors: ColorsResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ColorListComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent
  },
  {
    path: 'error',
    component: LayoutComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
