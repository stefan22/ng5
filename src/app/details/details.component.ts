import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';
import { ActivatedRoute } from '@angular/router';
import { Apidata } from '../apidata';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  details: Array<Apidata>;
  
  eventContainer: any;
  eventName = '';
  eventsOff = false;
  detailsOn = false;

  constructor(private apidataService: ApidataService, private router: ActivatedRoute) { }

  ngOnInit() {
    
  }
 
  closeDetails() {
    this.eventsOff = false;
    this.detailsOn = false;
  }

  stripTags(ogstr) {
    var StrippedString = ogstr.replace(/(<([^>]+)>)/gi, "");
    return StrippedString;
  }

  eventDetails($event, econt) {
    $event.preventDefault();
    this.eventContainer = econt;
    this.eventName = this.eventContainer.outerText;
    console.log("event-name: ", this.eventName);
    this.pgDetails();
  }

  pgDetails() {
    var name = this.eventName;
    this.apidataService.getPageDetails(name).subscribe(details => {
      this.details = details.event;
      console.log('event details: ', details);
      this.eventsOff = true;
      this.detailsOn = true;
      this.apidataService.shareDetails({ d: this.details });
      console.log(this.details);
    });
  }

}
