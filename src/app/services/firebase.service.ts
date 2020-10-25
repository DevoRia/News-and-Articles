import {Injectable, InjectionToken, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Post, PostTypes} from '../models/post.model';

interface CreateResponse {
  name: string;
}

@Injectable()
export class FirebaseService {

  private FIREBASE_LINK = 'https://viseventest-709db.firebaseio.com';

  constructor(private http: HttpClient) {
  }

  findAll(type: PostTypes): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.FIREBASE_LINK}/${type}.json`)
      .pipe(map(posts => {
        if (!posts) {
          return [];
        }
        return Object.keys(posts).map(key => ({...posts[key], id: key}));
      }));
  }

  findById(type: PostTypes, id: string): Observable<Post> {
    return this.http
      .get<Post>(`${this.FIREBASE_LINK}/${type}/${id}.json`)
      .pipe(map(post => {
        if (!post) {
          throw Error('there is no post');
        } else {
          return ({...post, id});
        }
      }));
  }

  create(type: PostTypes, post: Post): Observable<Post> {
    return this.http
      .post<CreateResponse>(`${this.FIREBASE_LINK}/${type}.json`, post)
      .pipe(map(res => {
        return {...post, id: res.name};
      }));
  }

  update(type: PostTypes, id: string, post: Post): Observable<Post> {
    return this.http
      .patch<CreateResponse>(`${this.FIREBASE_LINK}/${type}/${id}.json`, post)
      .pipe(map(res => {
        return {...post, id: res.name};
      }));
  }

  remove(type: PostTypes, id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.FIREBASE_LINK}/${type}/${id}.json`);
  }

}
