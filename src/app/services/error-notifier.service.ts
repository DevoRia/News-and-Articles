import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotifierService {

  constructor(private snackBar: MatSnackBar) { }

  connectionError(): void {
    this.snackBar.open('Something is going wrong. Please try again.', 'Close', {
      duration: 2000,
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }


}
