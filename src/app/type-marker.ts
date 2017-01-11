import { Injectable } from '@angular/core';
import { Marker } from './traverser/marker';

@Injectable()
export class TypeMarker extends Marker {
  mark(context: any): string {
      return context['@type']
  }
}