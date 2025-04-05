import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseDto } from '../models/user-response-dto';
import { Observable } from 'rxjs';
import { UserRequestDto } from '../models/user-request-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl="http://localhost:8080/api/v1/users";
  constructor(private http:HttpClient) { }

  createUser(userRequestDto: UserRequestDto): Observable<UserResponseDto> {
    

    // Send a POST request to the backend with FormData
    return this.http.post<UserResponseDto>(`${this.apiUrl}/signup`,userRequestDto);
  }
  deleteUser(id:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);

  }
  updateUser(id:number,userRequestDto:UserRequestDto):Observable<UserResponseDto>{
    return this.http.put<UserResponseDto>(`${this.apiUrl}/update/${id}`,userRequestDto);

  }
  getUser(id:number):Observable<UserResponseDto>{
    return this.http.get<UserResponseDto>(`${this.apiUrl}/get/${id}`);
  }
  getAllUsers():Observable<UserResponseDto[]>{
    return this.http.get<UserResponseDto[]>(`${this.apiUrl}/get`);
  }
  activateUser(id:number):Observable<string>{
    return this.http.patch<string>(`${this.apiUrl}/activate/${id}`,{});

  }
  desactivateUser(id:number){
    return this.http.patch<string>(`${this.apiUrl}/desactivate/${id}`,{});
  }




}
