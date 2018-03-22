import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

@Injectable()
export class ItemService {

  constructor(private myHttp: Http) {}

  getAllItems(){
    return this.myHttp.get(`${environment.apiBase}/api/items`,
    { withCredentials: true })
    .map(res => res.json())
  }

  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/items/${id}`,
          { withCredentials: true })
          .toPromise()
          .then(res => res.json())
  }

  getUsername(){
    return this.myHttp.get(`${environment.apiBase}/api/checkUsername`,
          { withCredentials: true })
  }

  createNewItem(dataToSend){
    return this.myHttp
      .post(`${environment.apiBase}/api/items/new`, dataToSend, { withCredentials: true })
      .toPromise()
      .then(res => res.json());
  }

  updateItem(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/items/${id}`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteItem(id){
    return this.myHttp.delete(`${environment.apiBase}/api/items/${id}`,
        { withCredentials: true })
        .toPromise()
  }

  addNotification(id){
    return this.myHttp
    .post(`${environment.apiBase}/api/items/:id/notifications/new`, {id: id}, { withCredentials: true })
    .toPromise()
    .then(res => res.json());
  }
}