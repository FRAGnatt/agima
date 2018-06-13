import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import raf from 'raf'

import './index.css'

import {
  EASING_FUNCTIONS,
  DEFAULT_ANIMATION_TIME,
  toNumber,
} from './constants'


class AnimatedNumber extends PureComponent {
  static propTypes = {
    className: PropTypes.string,

    duration: PropTypes.number, // In milliseconds
    easingFunc: PropTypes.func,
    formatFunc: PropTypes.func,

    value: PropTypes.number,
  }

  static defaultProps = {
    className: '',

    duration: DEFAULT_ANIMATION_TIME,
    easingFunc: EASING_FUNCTIONS.easeOutQuint,
    formatFunc: toNumber,
  }

  constructor(props) {
    super(props)

    // В данном случае стейт используется по назначению, чтобы инкапсулировать внутреннюю логику компонента
    this.state = {
      actualNumber: this.props.value,
    }

    // В реальном проекте для анимации, скорей всего, я бы использовал react-motion,
    // однако в данном случае используется самостоятельная реализация,
    // чтобы не опираться исключительно на сторонние бииблиотеки
    this.rafHandle = undefined
    this.startTime = undefined
    this.prevNumber = this.props.value

    this.animateNext = this.animateNext.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      raf.cancel(this.rafHandle);
      this.prevNumber = this.state.actualNumber;
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
    } = this.props

    // Get completion percentage of the animation
    let currentCoef = (timestamp - this.startTime) / duration
    if (currentCoef > 1) {
      currentCoef = 1
    }
    let actualNumber
    // Check, if animation is already done
    if (currentCoef === 1) {
      this.prevNumber = value
      actualNumber = value
      raf.cancel(this.rafHandle)
    } else {
      actualNumber = this.prevNumber + (value - this.prevNumber) * easingFunc(currentCoef)
      this.rafHandle = raf(this.animateNext)
    }

    this.setState({
      actualNumber,
    })

  }

  render() {
    const {
      className,
      formatFunc,
    } = this.props

    const {
      actualNumber,
    } = this.state

    return (
      <div className={classNames('animated-number', className)}>
        {formatFunc(actualNumber)}
      </div>
    )
  }
}

export { EASING_FUNCTIONS } from './constants'

export default AnimatedNumber
