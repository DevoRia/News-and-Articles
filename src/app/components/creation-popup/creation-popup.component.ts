import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {Post, PostTypes} from '../../models/post.model';
import {SelectTypeService} from '../../services/selectType.service';
import {ErrorNotifierService} from '../../services/error-notifier.service';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-creation-popup',
  templateUrl: './creation-popup.component.html',
  styleUrls: ['./creation-popup.component.scss']
})
export class CreationPopupComponent implements OnInit {

  isSignedIn = false;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.isSignedIn = !!user;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreationPopupTemplateComponent);

    dialogRef.afterClosed().subscribe(result => {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
   );
  }
}

@Component({
  templateUrl: 'popup-template.html',
  styleUrls: ['./creation-popup.component.scss']
})
export class CreationPopupTemplateComponent implements OnInit{

  type: PostTypes;
  isEdit = false;
  title = '';
  content = '';
  id: string;
  userId: string;
  file: File;

  constructor(private router: Router,
              private firebaseService: FirebaseService,
              private storageService: StorageService,
              private authService: AuthService,
              private selectTypeService: SelectTypeService,
              private errorNotifierService: ErrorNotifierService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const type = this.selectTypeService.getTypeByName(this.router.url.replace('/', ''));
    this.type = type ? type : this.selectTypeService.getTypeByName(this.router.url.split('/')[1]);
    this.isEditMode(data);
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.userId = !!user ? user.uid : '';
    });
  }

  isEditMode(data): void {
    if (!!data) {
      this.isEdit = true;
      this.title = data.title;
      this.content = data.content;
      this.id = data.id;
    }
  }

  setFile(files: File[]): void {
    const fileName = files[0];
    const fileType = fileName.type;
    if (fileType.match(/image\/(.*?)/)) {
      this.file = files[0];
    }
  }

  savePost(title: string, content: string): void {
    const post = this.preparePost(title, content);
    if (!post) {
      return;
    }

    if (this.file) {
      post.photo = this.uploadPhoto(post);
    }

    this.firebaseService.create(this.type, post)
      .subscribe(post => {
        this.dialog.closeAll();
        this.router.navigateByUrl(this.type + '/' + post.id + '/details');
      },
      () => this.errorNotifierService.connectionError()
      );
  }

  updatePost(title: string, content: string): void {
    const post = this.preparePost(title, content);

    if (!post) {
      return;
    }

    if (this.file) {
      post.photo = this.uploadPhoto(post);
    }

    this.firebaseService.update(this.type, this.id, post)
      .subscribe(
        post => this.dialog.closeAll(),
      () => this.errorNotifierService.connectionError()
      );
  }

  private preparePost(title, content): Post {
    if (!title || !content) {
      return null;
    }

    return  {
      title,
      content,
      owner: this.userId,
      date: new Date()
    };
  }

  private uploadPhoto(post) {
    return this.storageService.uploadPhoto(this.file, post.title);
  }

}
