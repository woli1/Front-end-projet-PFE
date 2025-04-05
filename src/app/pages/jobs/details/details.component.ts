import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferResponseDto } from 'src/app/services/models/offer-response-dto';
import { OfferService } from 'src/app/services/service/offer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

/**
 * Details Component 
 */
export class DetailsComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private offerService:OfferService,private route:ActivatedRoute) { }
  id:number;
  offer:OfferResponseDto;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Job Details', active: true }];
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.offerService.getOffer(this.id).subscribe(data=>{
      this.offer=data;
    })

  }

}
