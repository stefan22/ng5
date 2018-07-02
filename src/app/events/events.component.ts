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
  events:any[];
  eventName = '';
  details: Array<Apidata>
  isValidEvent = false;
  isLoading = true;
  eventsOff: boolean;
  detailsOn = false;
  $index: number;
  eventContainer: any;
  emptyArray = 'empty array';
  schedArray = [];
  schadArray = [];
  sname:string;
  

  //eventSchedule
  buyin: string; chips: string; clock: string; date: string; daytwo: string;
  daythree: string; evnam: string; id: number; latereg: string; nolatereg: string; online: string; lateregst: string; lateregtime: string;
  start: string; title: string; 
  esk: any; eventSchedule:any[]; eventStructure: any[];

  constructor(
    private apidataService: ApidataService
    //private router: ActivatedRoute
  ) {}

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

  
  // event structure
  estrKeys: any[];
  stkys: any = [];
  days: any = [];
  skdays:any[];
  live: any = [];
  sklive:any[];

  big:string;

  
  

  eventStructureData(obj) {
   
    obj = obj || undefined;
    this.eventStructure = obj[0].eventStructure;
    console.log(this.eventStructure);
    this.stkys = (Object.keys(this.eventStructure));
    this.schadArray.push(this.stkys);
    console.log(this.schadArray);

    for(this.stkys in this.eventStructure) {
      for(var x=0; x < this.eventStructure[this.stkys].days.length; x++) {
        
        this.days.push(
    
           {
             day_name: this.stkys,
             day_id: this.eventStructure[this.stkys].days[x].day_id, 
             title: this.eventStructure[this.stkys].days[x].title || 'empty field', 
             event_name: this.eventStructure[this.stkys].event_name || 'empty field',
             schedule_title: this.eventStructure[this.stkys].schedule_title || 'empty field'
             
        });

        this.live.push( 
          
          {

          // type: this.eventStructure[this.stkys].days[x].live[x + 1].type || 'empty field',
          // status: this.eventStructure[this.stkys].days[x].live[x + 1].status || 'empty field',
          // position: this.eventStructure[this.stkys].days[x].live[x + 1].position || 'empty field',
          // level: this.eventStructure[this.stkys].days[x].live[x + 1].level || 'empty field',
          // duration: this.eventStructure[this.stkys].days[x].live[x + 1].duration || 'empty field',
         
          day_id: this.eventStructure[this.stkys].days[x].day_id,
          event_name: this.eventStructure[this.stkys].event_name,
          schedule_title: this.eventStructure[this.stkys].schedule_title,

        });


      }// for 1  

    }// for 2
    
    console.log(this.days);

  }// eventStructureData fn
 




}// eventsComponent class
