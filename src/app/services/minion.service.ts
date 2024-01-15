import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Minion } from '../../interface/minion';

@Injectable({
  providedIn: 'root'
})
export class MinionService {
  URL:string ="http://localhost:3000/minions";
  constructor(private readonly http:HttpClient) { }

  getMinions():Observable<Minion[]>{
    return this.http.get<Minion[]>(this.URL);
  }

  getMinion(name:string):Observable<Minion[]>{
    return this.http.get<Minion[]>(this.URL+"?name="+name);
  }
  getMinionById(id:string):Observable<Minion>{
    return this.http.get<Minion>(this.URL+"/"+id);
  }

  updateMinionById(minion:Minion):Observable<Minion>{
    return this.http.put<Minion>(this.URL+"/"+minion.id,minion);
  }

  createMinion(minion:Omit<Minion,"id">):Observable<Minion>{
    return this.http.post<Minion>(this.URL,minion);
  }

  deleteMinion(minion:Minion):Observable<Minion>{
    return this.http.delete<Minion>(this.URL+"/"+minion.id);
  }

}
