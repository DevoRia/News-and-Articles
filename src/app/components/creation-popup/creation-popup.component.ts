import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {Post, PostTypes} from '../../models/models';
import {SelectTypeService} from '../../services/selectType.service';

@Component({
  selector: 'app-creation-popup',
  templateUrl: './creation-popup.component.html',
  styleUrls: ['./creation-popup.component.scss']
})
export class CreationPopupComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreationPopupTemplateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  templateUrl: 'popup-template.html',
})
export class CreationPopupTemplateComponent {

  type: PostTypes;
  isEdit = false;
  title = '';
  content = '';
  id: string;

  constructor(private router: Router,
              private firebaseService: FirebaseService,
              private selectTypeService: SelectTypeService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const type = this.selectTypeService.getTypeByName(this.router.url.replace('/', ''));
    this.type = type ? type : this.selectTypeService.getTypeByName(this.router.url.split('/')[1]);
    this.isEditMode(data);
  }

  isEditMode(data) {
    if (!!data) {
      this.isEdit = true;
      this.title = data.title;
      this.content = data.content;
      this.id = data.id;
    }
  }

  savePost(title: string, content: string) {
    const post = this.preparePost(title, content);
    console.log(post);
    if (!post) {
      return;
    }
    this.firebaseService.create(this.type, post)
      .subscribe(post => {
        this.dialog.closeAll();
        this.router.navigateByUrl(this.type);
      });
  }

  updatePost(title: string, content: string) {
    const post = this.preparePost(title, content);

    if (!post) {
      return;
    }

    this.firebaseService.update(this.type, this.id, post)
      .subscribe(post => {
        this.dialog.closeAll();

      });
  }

  private preparePost(title, content): Post {
    if (!title || !content) {
      return null;
    }

    return  {
      title,
      content,
      date: new Date()
    };
  }

}