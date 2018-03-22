import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ItemService } from "../../services/item.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})

export class ItemsComponent implements OnInit {
  currentUser: any = {};
  logoutError: string;
  items: Array<Object> = [];
  itemListError: string;

  constructor(
    private myAuthService: AuthService,
    private myItemService: ItemService,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        this.getTheItems()
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

  // get all the items
  getTheItems() {
    this.myItemService.getAllItems()
    .subscribe(allTheItems => {
        this.items = allTheItems;
      },
      () => {
        this.itemListError = "Sorry, no items.";
      }
    );
  } // close getTheItems()

  doTheTrade() {
    // fjvnvv
  }

}