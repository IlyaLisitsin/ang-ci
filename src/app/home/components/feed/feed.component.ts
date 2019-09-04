import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Post } from '../../../shared/models/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {
  @Input() posts: Array<Post>;
  @Input() postToScroll: string;

  @Output() goBackToFeed = new EventEmitter();

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
    this.goBackToFeed.emit();
  }

}
