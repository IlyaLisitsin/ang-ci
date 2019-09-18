import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Post } from '../../../shared/models/Post';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {
  @Input() posts: Array<Post>;
  @Input() isFromAccountDetails: boolean;
  @Input() postToScroll: string;

  @Output() switchAccountDetails = new EventEmitter<string>();
  @Output() goBackToAccountDetailsView = new EventEmitter();

  loggedUserId: string;

  constructor(
    private elRef: ElementRef,
    private homeService: HomeService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loggedUserId = this.homeService.logedUserId;
    this.posts && this.posts.map(post => {
      post.isLikedByLoggedUser = post.likedBy.includes(this.loggedUserId);
      return post;
    });
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.querySelector(`#_${this.postToScroll}`)
    && this.elRef.nativeElement.querySelector(`#_${this.postToScroll}`).scrollIntoView({ behavior: 'smooth' });
  }

  backClick() {
    this.goBackToAccountDetailsView.emit();
  }

  loginClick(userId: string) {
    this.switchAccountDetails.emit(userId);
  }

  likeButtonClickHandle(postId: string) {
    this.posts.find(post => post._id === postId).isLikedByLoggedUser = true;
    this.ref.detectChanges();
    this.homeService.likePost(postId).subscribe();
  }

  unlikeButtonClickHandle(postId: string) {
    this.posts.find(post => post._id === postId).isLikedByLoggedUser = false;
    this.ref.detectChanges();
    this.homeService.unlikePost(postId).subscribe();
  }

}
