import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './modules/user-management/user-management.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/services/auth.interceptor.service';
import { LayoutComponent } from './core/components/layout/layout.component';
import { RoleBasedAccessDirective } from './shared/directives/role-based-access.directive';
import { RoleBackgroundDirective } from './shared/directives/role-background.directive';
import { IconsModule } from '@progress/kendo-angular-icons';

const routes: Routes = [
  {
    path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'users', component: UserManagementComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


export class AppRoutingModule { }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
