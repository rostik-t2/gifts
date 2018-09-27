import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gifts-app';
public showLogout: boolean = false;

  constructor(public angularFireAuth: AngularFireAuth, private router: Router) {
  this.angularFireAuth.user.subscribe((user: User) => {
      if (user) {
        this.showLogout = true;
      } else {
        this.showLogout = false;
      }
    });
  }
  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/auth']);
  }
}
