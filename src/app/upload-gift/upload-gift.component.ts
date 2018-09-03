import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UploadTaskSnapshot } from 'angularfire2/storage/interfaces';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IGiftItem } from '../types/gift-item.interface';

@Component({
  selector: 'app-upload-gift',
  templateUrl: './upload-gift.component.html',
  styleUrls: ['./upload-gift.component.css']
})
export class UploadGiftComponent implements OnInit {

  public uploadForm: FormGroup;
  private chosenFile;
  public preloader: boolean = false;

  constructor(private storage: AngularFireStorage, private dbStore: AngularFirestore) {
    this.uploadForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      file: new FormControl(''),
    });
  }

  private upload(filePath: string) {

    const task = this.storage.upload(filePath, this.chosenFile);

    // observe percentage changes
    //this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
      switchMap((fileState: UploadTaskSnapshot) => {
        if (fileState.totalBytes === fileState.bytesTransferred) {
          const fileRef = this.storage.ref(filePath);
          return fileRef.getDownloadURL();
        } else {
          return of(null);
        }
      })
    );
  }

  private writeToDb(fileUrl) {
    const itemsCollection: AngularFirestoreCollection<IGiftItem> = this.dbStore.collection<IGiftItem>('gifts');
    const giftItem: IGiftItem = {
      name: this.uploadForm.get('name').value,
      description: this.uploadForm.get('description').value,
      price: this.uploadForm.get('price').value,
      downloadUrl: fileUrl
    };
    itemsCollection.add(giftItem);
    console.log(giftItem);
  }



  public saveGift() {
    const filePath = this.uploadForm.get('file').value;
    this.preloader = true;
    this.upload(filePath).subscribe((downloadUrl) => {
      if (downloadUrl) {
        this.preloader = false;
        this.writeToDb(downloadUrl);
      }
    });
  }

  public onChooseFile($event) {
    this.chosenFile = $event.target.files[0];
  }

  ngOnInit() {
  }

}
