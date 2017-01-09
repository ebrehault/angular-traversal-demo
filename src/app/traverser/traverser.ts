import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class Traverser {

  public path: BehaviorSubject<any>;

  constructor(private location: Location) {
    this.path =  new BehaviorSubject({
      context: {},
      path: this.location.path()
    });
  }

  traverse(path: string) {
      this.location.go(path);
      this.path.next({context: {type: 'balou'}, path: path});
  }
}