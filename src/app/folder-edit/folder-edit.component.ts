import { Component, OnInit } from '@angular/core';
import { Traverser } from '../traverser/traverser';

@Component({
  selector: 'app-folder-edit',
  templateUrl: './folder-edit.component.html',
  styleUrls: ['./folder-edit.component.css']
})
export class FolderEditComponent implements OnInit {

  private context: any;

  constructor(private traverser: Traverser) { }

  ngOnInit() {
    this.traverser.target.subscribe(target => {
      this.context = target.context;
    });
  }

}
