import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.route.data.pipe(
      map(data => data['posts'])
    );
  }

  onPosCommented(postCommented: {comment: string, postId: number}) {
    this.postsService.addNewComment(postCommented);
  }
}
