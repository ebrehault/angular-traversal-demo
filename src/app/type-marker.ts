import { Injectable } from '@angular/core';
import { Marker } from 'angular-traversal';

@Injectable()
export class TypeMarker extends Marker {
  mark(context: any): string {
      return context['@type']
  }
}