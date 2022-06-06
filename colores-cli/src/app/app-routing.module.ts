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
import {ColorResolver} from "./resolvers/color.resolver";
import {ColorListComponent} from "./pages/colors/color-list/color-list.component";
import {ColorCreateComponent} from "./pages/colors/color-create/color-create.component";
import {ColorDetailComponent} from "./pages/colors/color-detail/color-detail.component";

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
          },
          {
            path: 'create',
            component: ColorCreateComponent
          },
          {
            path: 'detail/:colorId',
            resolve: {
              color: ColorResolver
            },
            component: ColorDetailComponent
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
