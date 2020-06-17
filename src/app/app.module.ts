import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MassageComponent } from './massage/massage.component';
import { CommentComponent } from './comment/comment.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MassageComponent,
    CommentComponent,
    CategoriesComponent,
    AdvertisementComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      MatDatepickerModule,
      MatNativeDateModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatRadioModule,
      MatSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
