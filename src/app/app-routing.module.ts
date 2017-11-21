import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AboutComponent } from './component/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
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
