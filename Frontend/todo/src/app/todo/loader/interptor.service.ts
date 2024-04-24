import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterptorService implements HttpInterceptor{

  constructor(public loaderservice: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderservice.is_loading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.loaderservice.is_loading.next(false);
        }  
      )
    );
  }
}
