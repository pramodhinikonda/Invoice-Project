import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exception-handler',
  templateUrl: './exception-handler.component.html',
  styleUrls: ['./exception-handler.component.css']
})
export class ExceptionHandlerComponent implements OnInit {
  hasError = false;
  data;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.hasError = this.activatedRoute.snapshot.queryParams['hasError'];
    this.data = this.activatedRoute.snapshot.data;
  }
}
