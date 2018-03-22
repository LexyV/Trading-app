import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { ItemService } from "../../services/item.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.component.html",
  styleUrls: ["./item-details.component.css"]
})

export class ItemDetailsComponent implements OnInit {
  item = <any>{};

  public updatedItem: Object = {};
  public itemCategory: String;
  public itemName: String;
  public itemDescription: String;

  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myItemService: ItemService,
    private myAuthService: AuthService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then()
      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
        this.myRouter.navigate(["/"]);
      });
    this.myRoute.params.subscribe(params => {
      this.getItemDetails(params["id"]);
    });
  }
  // getting one item and its details
  getItemDetails(id) {
    this.myItemService.getId(id).then(theItemDetails => {
      this.item = theItemDetails;
    });
  }

  doTheUpdate(id, formData) {
    const formInfo = formData.form.controls;
    this.itemCategory = formInfo.itemCategory.value;
    this.itemName = formInfo.itemName.value;
    this.itemDescription = formInfo.itemDescription.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id){
    this.updatedItem = { itemCategory: this.item.category, itemName: this.item.name, itemDescription: this.item.description };
    this.myItemService.updateItem(id, this.updatedItem)
      .toPromise()
      .then(()=>{
        this.myRouter.navigate(['/items'])
      })
      .catch()
  }

  deleteThisItem(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myItemService
      .deleteItem(this.item._id)
      .then(() => {
        this.myRouter.navigate(["/items"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log(err);
      });
  }
}