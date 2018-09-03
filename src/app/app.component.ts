import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gifts-app';

  constructor(public angularFireAuth: AngularFireAuth, private router: Router) {}
  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/auth']);
  }
}
