import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-toggle',
  templateUrl: './login-toggle.component.html',
  styleUrls: ['./login-toggle.component.scss']
})
export class LoginToggleComponent implements OnInit {

  isSignedIn = false;
  userEmail = '';

  constructor(private router: Router,
              private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.isSignedIn = !!user;
      this.userEmail = this.isSignedIn ? user.email : '';
    });
  }

  goToLoginPage() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.authService.logout();
  }

}
