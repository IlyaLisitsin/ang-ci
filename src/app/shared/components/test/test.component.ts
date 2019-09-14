import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() kek: string;
  @Output() postTextFormControlChange = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  inputChangeHandler(event) {
    this.postTextFormControlChange.emit(event.srcElement.value)
  }

}
