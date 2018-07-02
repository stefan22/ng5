import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApidataService {
  results: any;
  details: any;
  isLoading = true;
  eventsOff = true;
  private urlEL = 'https://mypartypokerlive.com/en/api/partypoker/events/list';
  private urlED = 'https://mypartypokerlive.com/en/api/partypoker/events/';
  
  
  constructor(private http: Http) {}

  getEvents() {
    return this.http.get(this.urlEL).map(res => res.json());
  }// getEvents method

  getPageDetails(name) {
    var urlPD = this.urlED + name;
    return this.http.get(urlPD)
      .map(res => res.json());

  }// getPageDetails

  shareDetails(d) {
    if (typeof d == "object") {
      //console.log(d);
      this.details = d;
    }
  }//shareDetails


}
