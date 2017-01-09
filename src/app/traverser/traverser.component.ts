import { Component, OnInit } from '@angular/core';
import { Traverser } from './traverser';

@Component({
  selector: 'ng-traverser',
  template: `<div [ngClass]="className">path={{path}} view={{view}}</div>`
})
export class TraverserComponent implements OnInit {

  path: string;
  view: string;
  className: string;

  constructor(
    private traverser: Traverser,
  ) { }

  ngOnInit() {
    this.traverser.path.subscribe(location => this.render(location));
  }

  render(location) {
    let context = location.context;
    let path = location.path;
    if(path.indexOf('!!') > -1) {
      this.path = path.split('/!!')[0];
      this.view = path.split('/!!')[1];
    } else {
      this.path = path;
      this.view = 'view';
    }
    let className = 'view-' + this.view;
    if(context.type) {
      className += ' type-' + context.type;
    }
    this.className = className;
  }
}
