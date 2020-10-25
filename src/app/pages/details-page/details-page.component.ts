import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import {Post, PostTypes} from '../../models/post.model';
import {SelectTypeService} from '../../services/selectType.service';
import {CreationPopupTemplateComponent} from '../../components/creation-popup/creation-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {ErrorNotifierService} from '../../services/error-notifier.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  type = PostTypes.ARTICLE;
  isSignedIn = false;
  isOwner = false;
  id = '';
  post: Post = {
    content: '',
    owner: '',
    date: null,
    title: ''
  };

  constructor(private firebaseService: FirebaseService,
              private selectTypeService: SelectTypeService,
              private authService: AuthService,
              private errorNotifierService: ErrorNotifierService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const [ _, type, id] = this.router.url.split('/');
    this.type = this.selectTypeService.getTypeByName(type);
    this.id = id;
    this.findById(id);
  }

  findById(id: string): void {
    this.firebaseService.findById(this.type, id).subscribe(
      post => {
        this.post = post;
        this.checkOwner();
      },
      () => {
        this.router.navigateByUrl(this.type);
        this.errorNotifierService.connectionError();
      }
    );
  }

  remove(): void {
    if (confirm('Are you sure to remove this post?')) {
      this.firebaseService.remove(this.type, this.id)
        .subscribe(
          () => this.router.navigateByUrl(this.type),
          () => this.errorNotifierService.connectionError()
        );
    }
  }

  update(): void {
    this.dialog.open(CreationPopupTemplateComponent, {
      data: {
        title: this.post.title,
        content: this.post.content,
        id: this.post.id,
      }
    });
    this.dialog.afterAllClosed.subscribe(
      () => this.findById(this.id),
      () => this.errorNotifierService.connectionError()
    );
  }

  goBack(): void {
    this.router.navigateByUrl(this.type);
  }

  checkOwner(): void {
    this.authService.getUser().subscribe(user => {
      this.isSignedIn = !!user;
      if (this.isSignedIn) {
        this.isOwner = (this.post.owner === user.uid);
      } else {
        this.isOwner = false;
      }
    });
  }
}
