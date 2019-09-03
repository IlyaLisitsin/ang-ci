import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from "../../../shared/models/Post";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {
  @Input() posts: Array<Post>;
  @Input() postToScroll: number;

  @Output() goBackToFeed = new EventEmitter();
  @ViewChild('kek')
  public kek: ElementRef;

  constructor(
    private elRef: ElementRef,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('postToScroll', this.postToScroll)
    this.elRef.nativeElement.querySelector(`#_${this.postToScroll}`).scrollIntoView({ behavior: 'smooth' });
  }

  backClick() {
    this.goBackToFeed.emit();
  }

}
