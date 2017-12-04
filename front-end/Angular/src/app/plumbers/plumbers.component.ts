import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

// services
import { PlumbersService } from './plumbers.service';

@Component({
  selector: 'app-root',
  templateUrl: './plumbers.component.html',
  styleUrls: ['./plumbers.component.css']
})
export class PlumbersComponent implements OnInit {
  allPlumbers: any;
  plumberSchedule: any;

  constructor(
    private plumbersService: PlumbersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getAllPlumbers() {
    this.plumbersService.getPlumbers()
      .then(plumbers => {
        this.allPlumbers = plumbers;
      });
  }

  ngOnInit(): void {
    this.getAllPlumbers();
  }

  getID(plumber) {
    this.plumbersService.getSchedules(plumber._Id)
      .then(plumberSchedule => {
        console.log(plumberSchedule);
        this.plumberSchedule = plumberSchedule;
      });
  }

}
