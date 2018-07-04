import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';
// import { ActivatedRoute } from '@angular/router';
import { Apidata } from '../apidata';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[];
  eventName = '';
  details: any[];
  isValidEvent = false;
  isLoading = true;
  eventsOff: boolean;
  detailsOn = false;
  $index: number;
  eventContainer: any;
  emptyArray = 'empty array';
  schedArray = [];
  schadArray = [];
  sname: string;
  eventStructure: any;
  days: any = [];
  schevent: string;
  prop: string;
  stkys: any;
  live: any = [];

  //eventSchedule
  buyin: string; chips: string; clock: string; date: string; daytwo: string;
  daythree: string; evnam: string; id: number; latereg: string; nolatereg: string; online: string; lateregst: string; lateregtime: string;
  start: string; title: string;
  esk: any; eventSchedule: any[];


  constructor(
    private apidataService: ApidataService
    //private router: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.router.params.subscribe(params => {
    //   this.eventName = params['eventName'];
    // });

    this.apidataService.getEvents().subscribe(events => {
      this.events = events.events[0];
      console.log('events list: ', events);
    });

  }// ngOnInit


  displayPPEvent() {
    this.isValidEvent = true;
    this.isLoading = false;
  }

  eventDetails($event, econt) {
    $event.preventDefault();
    this.eventContainer = econt;
    this.eventName = this.eventContainer.outerText;
    // console.log("event-name: ", this.eventName);
    this.pgDetails();

  }

  pgDetails() {
    var name = this.eventName;
    this.apidataService.getPageDetails(name).subscribe(details => {
      this.details = details.event;
      console.log('event details: ', details);
      this.eventsOff = true;
      this.detailsOn = true;
      this.scheduleFn(this.details);

      this.eventStructureData(this.details);


    });
  }

  closeDetails() {
    console.clear();
    this.eventsOff = false;
    this.detailsOn = false;
  }

  stripTags(ogstr) {
    var StrippedString = ogstr.replace(/(<([^>]+)>)/gi, "");
    return StrippedString;
  }


  scheduleFn(obj) {
    obj = obj || undefined;

    this.eventSchedule = obj;
    this.eventSchedule = obj[0].eventSchedule;
    //console.log(this.eventSchedule);
    this.esk = (Object.keys(this.eventSchedule));
    this.schedArray.push(this.esk);
    //console.log(this.esk);
    for (this.esk in this.eventSchedule) {
      this.eventSchedule[this.esk];

      for (var i = 0; i < this.eventSchedule.length; i++) {
        this.buyin = this.eventSchedule[i].buy_in;
        //console.log(this.buyin);
        this.chips = this.eventSchedule[i].chips;
        //console.log(this.chips);
        this.clock = this.eventSchedule[i].clock;
        //console.log(this.clock);
        this.date = this.eventSchedule[i].date;
        //console.log(this.date);
        this.daythree = this.eventSchedule[i].day_three_late_reg;
        //console.log(this.daythree);
        this.daytwo = this.eventSchedule[i].day_two_late_reg;
        //console.log(this.daytwo);
        this.evnam = this.eventSchedule[i].event_name;
        //console.log(this.evnam);
        this.id = this.eventSchedule[i].id;
        //console.log(this.id);
        this.lateregst = this.eventSchedule[i].late_reg_str;
        ////console.log(id);
        this.lateregtime = this.eventSchedule[i].late_reg_time;
        //console.log(lateregtime);
        this.nolatereg = this.eventSchedule[i].no_late_reg;
        //console.log(nolatereg);
        this.online = this.eventSchedule[i].online;
        //console.log(online);
        this.start = this.eventSchedule[i].start_time;
        //console.log(start);
        this.title = this.eventSchedule[i].title;
        //console.log(title);
      }//for

    }//for in
  }// scheduleFn


  eventStructureData(obj) {
    obj = obj || undefined;
    var y = 1;
    // eventStructure arr
    var estruck = obj[0].eventStructure;
    this.eventStructure = Object.keys(estruck)
      .map(key => {
        var reobj = [
          {
            name: key
          },
          {
            event: estruck[key]
          }
        ]
        return reobj;
      });

    // eventStructure keys  
    this.stkys = (Object.keys(obj[0].eventStructure));
    this.schadArray.push(this.stkys);
    console.log('eventStructure: ', this.eventStructure);

  }// eventStructureData fn




}// eventsComponent class
