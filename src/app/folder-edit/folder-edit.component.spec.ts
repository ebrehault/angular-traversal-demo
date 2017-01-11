/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FolderEditComponent } from './folder-edit.component';

describe('FolderEditComponent', () => {
  let component: FolderEditComponent;
  let fixture: ComponentFixture<FolderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
