import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODO } from './todo/TODO.interface';
import { tap, map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }


  url:string = "http://localhost:8080/api";
  private _refreshNeeded$ = new Subject<void>();
  private _deleteneed$ = new Subject<void>();


  get deleteneed$(){
    return this._deleteneed$;
  }
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  getTodo():Observable<any>{
    return this.http.get<any>(this.url+"/todos");
  }

  newTodo(value: TODO){
    return this.http.post(this.url+"/new", value).pipe(
      tap(
        ()=>{
          this._refreshNeeded$.next();
        }
      )
    )
  }

  delTodo(id: number){
    return this.http.delete(this.url+"/todo/del/"+id);
  }

  patchTodo(id:number, todo:any){
   
    return this.http.patch(this.url+"/todo/edit/"+id, todo);
  }
}

