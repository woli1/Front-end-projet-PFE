import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidacyResponseUserDto } from '../models/candidacy-response-user-dto';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  private apiUrl="http://localhost:8080/api/v1/candidacy";
  constructor(private http:HttpClient) { }

  candidate(userId:number,offerId:number):Observable<CandidacyResponseUserDto>{
    const params=new HttpParams();
    params.set('userId',userId);
    params.set('offerId',offerId);
    return this.http.post<CandidacyResponseUserDto>(`${this.apiUrl}`,{},{params});

  }

  getCandidacyByOffer(offerId:number):Observable<CandidacyResponseUserDto[]>{
    return this.http.get<CandidacyResponseUserDto[]>(`${this.apiUrl}/${offerId}`)
  }
  getCandidacyByCandidate():Observable<CandidacyResponseUserDto[]>{
    return this.http.get<CandidacyResponseUserDto[]>(`${this.apiUrl}`);
  }
  reject(candidacyId:number):Observable<string>{
    return this.http.patch<string>(`${this.apiUrl}/reject/${candidacyId}`,{});

  }
  accept(candidacyId:number):Observable<string>{
    return this.http.patch<string>(`${this.apiUrl}/accept/${candidacyId}`,{});

  }

  
}
