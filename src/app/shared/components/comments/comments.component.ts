import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Comment} from "../../../core/models/comment.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201,157,242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  listItemAnimationState: 'default' | 'active' = 'default';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter() {
    this.listItemAnimationState = 'active';
  }

  onListItemMouseLeave() {
    this.listItemAnimationState = 'default';
  }
}
