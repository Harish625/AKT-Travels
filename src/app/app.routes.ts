import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TopbarComponent } from './topbar/topbar';
import { PlanJourneyComponent } from './contact/contact';
import { VehicleDetailsComponent } from './details/details';
import { LoginComponent } from './admin/login/login';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { DashboardComponent } from './admin/dashboard/dashboard';
import { BlogListComponent } from './admin/blog/blog-list/blog-list';
import { BlogFormComponent } from './admin/blog/add-blog/add-blog';
import { AddReviewComponent } from './add-review/add-review';
import { CorporateHeroComponent } from './corporate-rental/corporate-rental';
import { StudentHeroComponent } from './student/student';
import { TourPackageHeroComponent } from './tour-package/tour-package';
import { PackageComponent } from './package/package';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'admin', component: LoginComponent },
     {
          path: 'admin/dashboard',
          component: AdminLayoutComponent,
          children: [
               { path: '', component: DashboardComponent },
               { path: 'blogs', component: BlogListComponent },
               { path: 'blogs/add', component: BlogFormComponent },
               { path: 'blogs/edit/:id', component: BlogFormComponent },
          ],
     },
     { path: 'topbar', component: TopbarComponent },
     { path: 'contact', component: PlanJourneyComponent },
     { path: 'add-review', component: AddReviewComponent },
     { path: 'corporate-rental', component: CorporateHeroComponent },
     { path: 'student-rental', component: StudentHeroComponent },
     { path: 'tour-packages', component: TourPackageHeroComponent },
     { path: 'package/:slug', component: PackageComponent },
     { path: 'fleet/:id', component: VehicleDetailsComponent },
     { path: '**', redirectTo: '' },
];
