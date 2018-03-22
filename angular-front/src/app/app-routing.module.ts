import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { ItemsComponent } from "./components/items/items.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";
import { NewItemComponent } from "./components/new-item/new-item.component";
import { ProfileComponent } from './components/profile/profile.component';

//Routes
const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'items', component: ItemsComponent
  },
  {
    path: 'items/new', component: NewItemComponent
  },
  {
    path: 'items/:id', component: ItemDetailsComponent
  },
  {
    path: 'users/:id', component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}