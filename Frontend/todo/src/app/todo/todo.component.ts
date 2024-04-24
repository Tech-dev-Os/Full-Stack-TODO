import { Component, ContentChild, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TODO } from './TODO.interface';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: any = [];
  open_form: boolean = true;
  formData!: FormGroup;
  del_id!: number;
  is_postMethod:boolean = true;
  edit_form:any;
  edit_data:any;


  constructor(private service: TodoService, private fb: FormBuilder) {}

  resetForm() {
    this.formData.reset();
  }
  handleEmitFormOpen(value: boolean) {
    this.open_form = value;
    this.is_postMethod = false;
  }

  resetStatusForm() {
    this.open_form = !this.open_form;
    this.is_postMethod = true;
  }

  handleEmitIdForDelete(id: number) {
    this.del_id = id;
    this.deleteTodo(this.del_id);
    this.del_id = 0;
  }
  handleEditformData(elm: any){
    let new_data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

    this.edit_data = {id:elm.id, modify:new_data};

    this.formData  = this.fb.group({
      title: [elm.title, Validators.required],
      descr: [elm.descr, Validators.required],
      complete: [elm.complete]
    });



    
    
  }

  modifyTodo(){

    if(!this.open_form){
    console.log("modidy todo put mehtod");
    let sample = {...this.edit_data, ...this.formData.value};
    let final_data = {
      title:sample.title,
      descr:sample.descr,
      complete:sample.complete,
      modify:sample.modify
    };
    this.service.patchTodo(sample.id, final_data).subscribe(
      (res)=>{
        console.log("Todo Modify");
        this.getTodo();
      },
      (err)=>{
        console.log("Error");
        
      }
    );
    
    }
    
  }

  deleteTodo(id: number){
    this.service.delTodo(id).subscribe(
        (res)=>{
            console.log("Todo deleted successfully");
            this.getTodo(); // Refresh todo list
        },
        (err)=>{
            console.error("Error while deleting Todo:", err);
        }
    );
  }


  submitData(arg0: FormGroup<any>) {
    let new_data: TODO = { ...arg0.value, modify: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() };
    if(this.is_postMethod){
      this.service.newTodo(new_data).subscribe(
        (res) => {
          console.log("Data Saved");
        },
        (err) => {
          console.log("Error while adding new Todo");
        }
      );
    }else{
      this.modifyTodo();
    }
  }

  ngOnInit(): void {
    this.formData = this.fb.group({
      title: ['', Validators.required],
      descr: ['', Validators.required],
      complete: ['']
    });

    // Subscribe to refreshNeeded$ to update the todo list after adding or deleting a todo item
    this.service.refreshNeeded$.subscribe(() => {
      this.getTodo();
    });

    this.getTodo(); // Initial fetching of todo items
  }

  getTodo() {
    console.log(this.todo);
    this.service.getTodo().subscribe(
      (res) => {
        this.todo = res;
      },
      (err) => {
        console.log("Error while fetching Todos");
      }
    );
  }
}
interface editTODO {
  id:number,
  title:string, 
  descr:string, 
  complete:boolean,

}