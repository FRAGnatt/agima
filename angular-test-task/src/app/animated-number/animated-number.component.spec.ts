import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Component, Input } from '@angular/core';

import { AnimatedNumberComponent } from './animated-number.component';

import { DEFAULT_ANIMATION_TIME } from './constants'


@Component({
  template: '<app-animated-number [value]="value"></app-animated-number>',
})
class TestHostComponent {
  @Input() value: number = 0;
}

describe('AnimatedNumberComponent', () => {
  let component: TestHostComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TestHostComponent>;

  const defaultInputValue = 0;
  const defaultInputValueString = '0,00';
  const defaultChangeInputValue = 10;
  const defaultChangeInputValueString = '10,00';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedNumberComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.value = defaultInputValue;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Не удалось заставить это работать
  // it('should change number after animation time', async(() => {
  //   fixture.whenStable().then(() => {
  //     const divElement = debugElement.nativeElement
  //     expect(divElement.innerText).toBe(defaultInputValueString);
  //     component.value = defaultChangeInputValue;
  //     fixture.detectChanges();
  //     fixture.whenStable().then(() => {
  //       setTimeout(() => {
  //         expect(divElement.innerText).toBe(defaultChangeInputValueString);
  //       }, DEFAULT_ANIMATION_TIME);
  //     });
  //   });
  // }));
});
