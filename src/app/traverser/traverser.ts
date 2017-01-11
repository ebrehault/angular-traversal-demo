import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from "rxjs/Rx";
import { Resolver } from './resolver';

@Injectable()
export class Traverser {

  public target: BehaviorSubject<any>;
  private views = {};

  constructor(
    private location: Location,
    private resolver: Resolver,
  ) {
    this.target = new BehaviorSubject({
      context: {},
      path: '',
      view: 'view',
      component: null,
    });
  }

  traverse(path: string) {
    let contextPath:string = path;
    let view:string = 'view';
    if(path.indexOf('@@') > -1) {
      contextPath = path.split('/@@')[0];
      view = path.split('/@@')[1];
    }
    this.location.go(path);
    if(this.views[view]) {
      this.resolver.resolve(contextPath).subscribe(context => {
        let targetContext = {
          context: context,
          path: path,
          view: view,
          component: this.views[view]['*'],
        };
        this.target.next(targetContext);
      });
    }
  }

  addView(name: string, target: string, component: any) {
    if(!this.views[name]) {
      this.views[name] = {};
    }
    this.views[name][target] = component;
  }
}