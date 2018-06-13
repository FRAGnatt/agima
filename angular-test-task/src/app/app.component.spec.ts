import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';


describe('AppComponent', () => {
  let component: AppComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // This is full integration test, that checks all of the app functionality in general
  it('should change the number after button press', () => {
    const defaultInputValue = 0;
    const defaultInputChangeValue = 10;

    expect(component.number).toBe(defaultInputValue);
    expect(component.actualNumber).toBe(defaultInputValue);

    const inputElement = debugElement.query(By.css('input')).nativeElement;
    inputElement.value = defaultInputChangeValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.number).toBe(defaultInputChangeValue);
    expect(component.actualNumber).toBe(defaultInputValue);

    const buttonElement = debugElement.query(By.css('button')).nativeElement;
    buttonElement.dispatchEvent(new Event('click'));

    expect(component.number).toBe(defaultInputChangeValue);
    expect(component.actualNumber).toBe(defaultInputChangeValue);
  })
});
