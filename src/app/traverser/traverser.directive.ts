import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  OnInit,
  ReflectiveInjector,
  ViewContainerRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { Traverser } from './traverser';

@Directive({
  selector: 'traverser-outlet',
})
export class TraverserOutlet implements OnInit {
  private ref: ComponentRef<any>;
  private viewInstance:any;

  constructor(
    private traverser: Traverser,
    private location: Location,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.traverser.path.subscribe(location => this.render(location));
    this.traverser.traverse(this.location.path());
  }

  ngOnDestroy() {
    if(this.viewInstance) {
      this.viewInstance.destroy();
    }
  }

  render(location) {
    if(this.viewInstance) {
      this.viewInstance.destroy();
    }
    if(location.component) {
      let componentFactory = this.resolver.resolveComponentFactory(
        location.component);
      this.viewInstance = this.container.createComponent(componentFactory);
    }
  }
}
