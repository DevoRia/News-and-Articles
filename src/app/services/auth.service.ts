import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import {ErrorNotifierService} from './error-notifier.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  user: Observable<any>;

  constructor(private firebaseAuth: AngularFireAuth,
              private errorNotifierService: ErrorNotifierService
  ) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(user => user)
      .catch(err => this.loginError(err.message));
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => user)
      .catch(err => this.loginError(err.message));
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  getUser() {
    return this.user;
  }

  isActivated() {
    return this.user.pipe(map(user => !user));
  }

  private loginError(message) {
    this.errorNotifierService.error(message);
  }
}
