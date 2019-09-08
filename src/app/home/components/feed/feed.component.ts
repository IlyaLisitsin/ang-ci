import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Post } from '../../../shared/models/Post';

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

  constructor(
    private elRef: ElementRef,
  ) { }

  ngOnInit() {
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

}
