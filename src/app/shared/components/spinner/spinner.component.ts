import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isShow: boolean;

  constructor(
    private spinnerService: SpinnerService,
  ) {
    spinnerService.spinnerSubject.subscribe((value: boolean) => this.isShow = value);
  }

  ngOnInit() {
  }

}
