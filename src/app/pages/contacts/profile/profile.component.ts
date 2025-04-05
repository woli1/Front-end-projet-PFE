import { Component, OnInit } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserService } from 'src/app/services/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserResponseDto } from 'src/app/services/models/user-response-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[CommonModule,PagetitleComponent,NgApexchartsModule]
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
downloadCV(arg0: number) {
throw new Error('Method not implemented.');
}
  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueBarChart: ChartType;
  statData:any;
  id:number;
  user:UserResponseDto;
  constructor(private userService:UserService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];

    // fetches the data
    this._fetchData();
    this.id=Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.userService.getUser(this.id).subscribe(data=>{
      this.user=data;
    })
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
}
