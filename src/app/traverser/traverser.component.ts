import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    private location: Location,
  ) { }

  ngOnInit() {
    this.traverser.path.subscribe(location => this.render(location));
    this.traverser.traverse(this.location.path());
  }

  render(location) {
    let context = location.context;
    this.path = location.path;
    this.view = location.view;
    console.log(location.component);
    let className = 'view-' + this.view;
    if(context.type) {
      className += ' type-' + context.type;
    }
    this.className = className;
  }
}
