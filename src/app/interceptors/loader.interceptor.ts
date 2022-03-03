import { DialogLoaderComponent } from './../dialog-loader/dialog-loader.component';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private dialogRef = null;

  constructor(
    private dialog: MatDialog
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    Promise.resolve(null).then(() => {
       this.dialogRef = this.dialog.open(DialogLoaderComponent);
    });

    return next.handle(request).pipe(
      finalize(() => this.dialogRef.close())
    );
  }
}
