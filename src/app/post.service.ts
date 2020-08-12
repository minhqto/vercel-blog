import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../blogpost';
import { allowedNodeEnvironmentFlags } from 'process';
import { environment } from '../environments/environment.prod';

let perPage: number = 6;
@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<Array<BlogPost>>(
      `${this.apiUrl}/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`
    );
  }

  getPosts(page, tag, category): Observable<BlogPost[]> {
    if (category && tag) {
      return this.http.get<Array<BlogPost>>(
        `${this.apiUrl}/api/posts?page=${page}&perPage=${perPage}&tag=${tag}&category=${category}`
      );
    }
    if (tag) {
      return this.http.get<Array<BlogPost>>(
        `${this.apiUrl}/api/posts?page=${page}&perPage=${perPage}&tag=${tag}`
      );
    }
    if (category) {
      return this.http.get<BlogPost[]>(
        `${this.apiUrl}/api/posts?page=${page}&perPage=${perPage}&category=${category}`
      );
    } else {
      return this.http.get<BlogPost[]>(
        `${this.apiUrl}/api/posts?page=${page}&perPage=${perPage}`
      );
    }
  }

  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/categories`);
  }

  getTags(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiUrl}/api/tags`);
  }

  newPost(post: BlogPost): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/posts`, post);
  }

  updatePostById(id: string, post: BlogPost): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/posts/${id}`, post);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/posts/${id}`);
  }
}
