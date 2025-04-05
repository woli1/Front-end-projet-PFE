import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferRequestDto } from '../models/offer-request-dto';
import { OfferResponseDto } from '../models/offer-response-dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl="http://localhost:8080/api/v1/offers";
  constructor(private http:HttpClient) { }

  createOffer(id:number,categorieId:number,offerRequestDto:OfferRequestDto):Observable<OfferResponseDto>{
    let params=new HttpParams();
    params = params.set('userId', id.toString());
  params = params.set('categorieID', categorieId.toString()); 

    return this.http.post<OfferResponseDto>(`${this.apiUrl}`,offerRequestDto,{params});

  }
  updateOffer(id:number,categorieId:number,offerId:number,offerRequestDto:OfferRequestDto):Observable<OfferResponseDto>{
    const params=new HttpParams();
    params.set('id',id.toString());
    params.set('categorieId',categorieId.toString());
    params.set('offerId',offerId.toString())
    return this.http.put<OfferResponseDto>(`${this.apiUrl}`,offerRequestDto,{params});
  }
  deleteOffer(id:number):Observable<string>{

    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  getAllOffers():Observable<OfferResponseDto[]>{
    return this.http.get<OfferResponseDto[]>(`${this.apiUrl}/get`);
  }
  getOfferWithTitle(title:string):Observable<OfferResponseDto[]>{
    return this.http.get<OfferResponseDto[]>(`${this.apiUrl}/title/${title}`);
  }
  getOfferWithCategorie(categorieId:number):Observable<OfferResponseDto[]>{
    return this.http.get<OfferResponseDto[]>(`${this.apiUrl}/categorie/${categorieId}`);
  }
  getOfferToRecruiter(id:number):Observable<OfferResponseDto>{
    return this.http.get<OfferResponseDto>(`${this.apiUrl}/get-user/${id}`);
  }
  getOffer(id:number):Observable<OfferResponseDto>{
    return this.http.get<OfferResponseDto>(`${this.apiUrl}/get-offer/${id}`)
  }


}
