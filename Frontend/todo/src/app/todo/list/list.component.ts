import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TODO } from '../TODO.interface';
import { Observable, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges, OnInit {


  @Input() todo:TODO[] = [];
  @Output() open_form:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() del_id:EventEmitter<number> = new EventEmitter<number>();
  @Output() editForm:EventEmitter<any> = new EventEmitter<any>();
elm: any;
  temp_todo!:any[];
  filter_value:number = 1;
  

  filter_option = [
              {'id':1, 'name':'none'}, 
              {'id':2, 'name':'complete'},
              {'id':3, 'name':'incomplete'},
  ];

  constructor(public loaderservice: LoaderService){}

  ngOnInit(): void {
  }
 
  ngOnChanges(): void {
    this.temp_todo = this.todo;
    
  } 

  emitOpenform(value: boolean){
    this.open_form.emit(!value);
  }
  setFormtoEditContent(elm:any){
    this.editForm.emit(elm);
    
  }

  emitDelTodoId(id: number|undefined) {
    this.del_id.emit(id);
  }
  filter() {
    if(this.filter_value == 2){
      //complete      
      console.log("complete todo");
      
      this.temp_todo = this.todo.filter(elm => elm.complete !== true);

     
    }
    else if(this.filter_value == 3){
      //incomplete
      console.log("incomplete todo");
      this.temp_todo = this.todo.filter(elm => elm.complete === true);


    }
    else{
      //all
      console.log("all todo");
      this.temp_todo = this.todo;

      
    }
    
  }
}
