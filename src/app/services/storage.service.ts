import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {ErrorNotifierService} from './error-notifier.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private angularFireStorage: AngularFireStorage,
              private errorNotifierService: ErrorNotifierService
  ) { }

  uploadPhoto(file: File, name: string): string {
    const path = `${name}${new Date().getTime()}.jpg`;
    this.angularFireStorage.upload(path, file)
      .catch(e => this.errorNotifierService.error(e.message));
    return path;
  }

  getDownloadURL(path) {
    return this.angularFireStorage.ref(path).getDownloadURL();
  }

}
