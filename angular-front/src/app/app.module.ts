import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

//Service Stuff
import { AuthService } from './services/auth.service';
import { ItemService } from './services/item.service';

//Routes
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ItemsComponent } from './components/items/items.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

// image stuff
import { FileUploadModule } from "ng2-file-upload";
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ItemsComponent,
    NewItemComponent,
    ItemDetailsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [AuthService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
