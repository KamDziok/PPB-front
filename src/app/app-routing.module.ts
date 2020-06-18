import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {AdvertisementComponent} from "./advertisement/advertisement.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CommentComponent} from "./comment/comment.component";
import {MassageComponent} from "./massage/massage.component";


const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'advertisement', component: AdvertisementComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'comment', component: CommentComponent},
  { path: 'massage', component: MassageComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
