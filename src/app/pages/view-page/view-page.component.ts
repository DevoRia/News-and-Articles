import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PostTypes} from '../../models/post.model';
import {FirebaseService} from '../../services/firebase.service';
import {SelectTypeService} from '../../services/selectType.service';
import {ErrorNotifierService} from '../../services/error-notifier.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

  type = PostTypes.ARTICLE;
  posts = [];

  constructor(private firebaseService: FirebaseService,
              private selectTypeService: SelectTypeService,
              private errorNotifierService: ErrorNotifierService,
              private router: Router) { }

  ngOnInit(): void {
    this.type = this.selectTypeService.getTypeByName(this.router.url.replace('/', ''));
    this.findAll();
  }

  findAll(): void {
    this.firebaseService.findAll(this.type).subscribe(
      posts => this.posts = posts,
      () => this.errorNotifierService.connectionError()
    );
  }
}

