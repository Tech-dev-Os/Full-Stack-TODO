import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoComponent } from './todo/todo.component';
import {  BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './todo/list/list.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterptorService } from './todo/loader/interptor.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MdbModalModule,  } from 'mdb-angular-ui-kit/modal';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgbAccordionModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MdbModalModule ,
    

    
    
  ],
  providers: [
    
    {provide:HTTP_INTERCEPTORS,useClass:InterptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
