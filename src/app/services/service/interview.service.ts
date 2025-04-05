import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterviewRequestDto } from '../models/interview-request-dto';
import { Observable } from 'rxjs';
import { InterviewResponseDto } from '../models/interview-response-dto';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl="http://localhost:8080/api/v1/interviews";
  constructor(private http:HttpClient) { }

  createInterview(recruiterId:number,candidateId:number,interviewRequestDto:InterviewRequestDto):Observable<InterviewResponseDto>{
    const params=new HttpParams();
    params.set('recruiterId',recruiterId);
    params.set('candidateId',candidateId);
    return this.http.post<InterviewResponseDto>(this.apiUrl,interviewRequestDto,{params});
  }
  updateInterview(id:number,interviewRequestDto:InterviewRequestDto):Observable<InterviewResponseDto>{
    return this.http.put<InterviewResponseDto>(`${this.apiUrl}/${id}`,interviewRequestDto);

  }
  getInterviewsWithRecruiter(id:number):Observable<InterviewResponseDto[]>{
   
    return this.http.get<InterviewResponseDto[]>(`${this.apiUrl}/getrecruiter/${id}`);
  }
  getInterviewWithCandidate(id:number):Observable<InterviewResponseDto[]>{
    return this.http.get<InterviewResponseDto[]>(`${this.apiUrl}/getcandidate/${id}`);
  }

}
