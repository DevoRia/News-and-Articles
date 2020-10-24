export interface Post {
  id?: string;
  title: string;
  content: string;
  date: Date;
}

export enum PostTypes {
  ARTICLE = 'articles',
  NEWS = 'news'
}

export interface Article extends Post {
  id?: string;
  title: string;
  content: string;
  date: Date;
}

export interface News extends Post {
  id?: string;
  title: string;
  content: string;
  date: Date;
}
