import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { IGiftItem } from '../types/gift-item.interface';
import { Observable } from 'rxjs';
import { auth, User } from 'firebase';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.css']
})
export class GiftsListComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<IGiftItem>;
  public items: Observable<IGiftItem[]>;
  private user: User;

  constructor(private dbStore: AngularFirestore, private angularFireAuth: AngularFireAuth, private router: Router) {
    this.itemsCollection = dbStore.collection<IGiftItem>('gifts');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IGiftItem;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.angularFireAuth.user.subscribe((user: User) => {
      if (user && user.displayName) {
        this.user = user;
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }
  ngOnInit() {
  }

  bookItem(item: IGiftItem) {
    if (!this.user) {
      this.router.navigate(['/auth']);
    }
    item.bookedBy = this.user.email;
    this.dbStore.doc<IGiftItem>(`gifts/${item.id}`).update(item);
  }

  cancelBook(item: IGiftItem) {
    if (!this.user) {
      this.router.navigate(['/auth']);
    }
    item.bookedBy = '';
    this.dbStore.doc<IGiftItem>(`gifts/${item.id}`).update(item);
  }

}
