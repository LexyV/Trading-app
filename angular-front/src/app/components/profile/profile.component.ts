import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ItemService } from "../../services/item.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  myItems: any;
  currentUser: any = {};
  public updatedItem: Object = {};
  logoutError: string;
  public itemCategory: String;
  public itemName: String;
  public itemDescription: String;
  public itemImage: String;

  baseUrl = environment.apiBase;

  constructor(private myItemService: ItemService, private myAuthService: AuthService, private myRouter: Router) { }

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(res =>{
        this.currentUser = res;
        this.myItemService.getAllItems()
        .subscribe(allItems =>{
          this.myItems = allItems;
        })
      })
      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
  }

  logMeOutPls() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOutPls()
}
