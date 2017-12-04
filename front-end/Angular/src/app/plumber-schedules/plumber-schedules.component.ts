import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

// services
import { PlumbersService } from '../plumbers/plumbers.service';

@Component({
  selector: 'app-plumber-schedules',
  templateUrl: './plumber-schedules.component.html',
  styleUrls: ['./plumber-schedules.component.css']
})
export class PlumberSchedulesComponent implements OnInit {
  schedules: any;

  constructor(
    private plumbersService: PlumbersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  getPlumberSchedule() {
    const _id = this.activatedRoute.snapshot.params['_id'];
    this.plumbersService.getSchedules(_id)
      .then(schedules => {
        console.log(schedules);
        return this.schedules = schedules;
      });
  }

  ngOnInit() {
    this.getPlumberSchedule();
  }

}
