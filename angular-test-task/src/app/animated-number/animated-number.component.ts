import {
  Component,
  SimpleChanges,
  OnInit,
  Input,
} from '@angular/core';
import * as raf from 'raf'

import {
  EASING_FUNCTIONS,
  DEFAULT_ANIMATION_TIME,
  toNumber,
} from './constants'


@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  styleUrls: ['./animated-number.component.css']
})
export class AnimatedNumberComponent implements OnInit {
  @Input() value: number;
  @Input() duration: number = DEFAULT_ANIMATION_TIME; // In milliseconds
  @Input() easingFunc: (number) => number = EASING_FUNCTIONS.easeOutQuint;
  @Input() formatFunc: (number) => string = toNumber;

  actualNumber: number = 0;
  prevNumber: number = 0;
  initialized: boolean = false;
  startTime: number = undefined;
  rafHandle: number = undefined;

  get actualNumberFormatted() {
    return this.formatFunc(this.actualNumber)
  }

  constructor() {}

  ngOnInit() {
    this.actualNumber = this.value;
    this.prevNumber = this.value;
    // Не уверен, что это лучшее решение, но не нашел в ангуляре 100%ной альтернативы componentDidUpdate
    this.initialized = true;

    this.animateNext = this.animateNext.bind(this)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && changes.value.currentValue !== changes.value.previousValue) {
      raf.cancel(this.rafHandle);
      this.prevNumber = this.actualNumber;
      this.rafHandle = raf((timestamp) => {
        this.startTime = timestamp
        this.animateNext(timestamp)
      })
    }
  }

  animateNext(timestamp) {
    const {
      value,
      duration,
      easingFunc,
    } = this

    // Get completion percentage of the animation
    let currentCoef = (timestamp - this.startTime) / duration;
    if (currentCoef > 1) {
      currentCoef = 1;
    }
    // Check, if animation is already done
    if (currentCoef === 1) {
      this.prevNumber = value;
      this.actualNumber = value;
      raf.cancel(this.rafHandle);
    } else {
      this.actualNumber = this.prevNumber + (value - this.prevNumber) * easingFunc(currentCoef);
      this.rafHandle = raf(this.animateNext);
    }
  }
}
