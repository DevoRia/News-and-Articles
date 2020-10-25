import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      if (user) {
        this.router.navigateByUrl('');
      }
    });
  }

  logIn(email: string, password: string) {
    this.auth.login(email, password);
  }

  signUp(email: string, password: string) {
    this.auth.signup(email, password);
  }
}
