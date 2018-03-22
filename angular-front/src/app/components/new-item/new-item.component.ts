import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

@Component({
  selector: "app-new-item",
  templateUrl: "./new-item.component.html",
  styleUrls: ["./new-item.component.css"]
})

export class NewItemComponent implements OnInit {
  itemData = {
    itemCategory: "",
    itemName: "",
    itemDescription: "",
    userName: "",
    itemNotification: ""
  };
  saveError: string;

  imgUploader = new FileUploader({
    url: environment.apiBase + "/api/items/",
    itemAlias: "itemImage"
  });

  constructor(private myItemService: ItemService, private myAuthService: AuthService, private myRouter: Router) {}


  ngOnInit() {
     this.myAuthService
       .checklogin()
       // If success, we are logged in.
       .then(resultFromApi => {
    this.itemData.userName = resultFromApi.username;
  })
    // Even if you don't do anything on error, catch to avoid a console error.
    .catch(err => {
      console.log(err);
      this.myRouter.navigate(["/"]);
    });
  }

  saveNewItem() {
    if (this.imgUploader.getNotUploadedItems().length === 0) {
      this.saveItemNoImage();
    } else {
      this.saveItemWithImage();
    }
  }

  checkUsername() {
    this.myItemService.getUsername()
   .subscribe((result) => this.itemData.userName = result.json()) 
  }

  private saveItemNoImage() {
    this.myItemService
      .createNewItem(this.itemData)
      .then(newItem => {
        this.itemData = {
          itemCategory: "",
          itemName: "",
          itemDescription: "",
          userName: "",
          itemNotification: ""
        };
        this.saveError = "";
        this.myRouter.navigate(["/items"]);
      })
      .catch(err => {
        this.saveError = "Saving item with no image went bad. Sorry!";
      });
  } // close saveItemNoImage()
  private saveItemWithImage(){
    this.imgUploader.onBuildItemForm = (item, form) => {
      form.append('itemCategory', this.itemData.itemCategory);
      form.append("itemName", this.itemData.itemName);
      form.append("itemDescription", this.itemData.itemDescription);
      form.append("itemOwnerName", this.itemData.userName);
    }
    this.imgUploader.onSuccessItem = (item, response) =>{
      this.itemData = {
          itemCategory: "",
          itemName: "",
          itemDescription: "",
          userName: "",
          itemNotification: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/items"]);
    }
    this.imgUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving item with image went bad. Sorry!";
    }
    this.imgUploader.uploadAll();
  }
}