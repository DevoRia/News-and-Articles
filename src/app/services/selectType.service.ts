import {Injectable, InjectionToken, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Post, PostTypes} from '../models/post.model';


@Injectable()
export class SelectTypeService {

  constructor() {
  }

  getTypeByName(name: string): PostTypes {
    switch (name) {
      case PostTypes.ARTICLE: return PostTypes.ARTICLE;
      case PostTypes.NEWS: return PostTypes.NEWS;
    }
  }

}
