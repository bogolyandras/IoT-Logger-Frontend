import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {AboutComponent} from './component/about/about.component';
import {UserListComponent} from './component/user-list/user-list.component';
import {DeviceListComponent} from './component/device-list/device-list.component';
import {AddUserComponent} from './component/add-user/add-user.component';
import {ViewUserComponent} from './component/view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-user/:id', component: ViewUserComponent },
  { path: 'device-list', component: DeviceListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
