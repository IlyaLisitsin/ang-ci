import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-post-caption',
  templateUrl: './add-post-caption.component.html',
  styleUrls: ['./add-post-caption.component.scss']
})
export class AddPostCaptionComponent implements OnInit {
  @Output() postTextFormControlChange = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  inputChangeHandler(event) {
    this.postTextFormControlChange.emit(event.srcElement.value)
  }

}
