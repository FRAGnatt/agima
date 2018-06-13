import React, { Component } from 'react'
// Используются компоненты material-ui, так как они отлично подходят для прототипирования
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// В реальных проектах я предпочитаю использовать css modules,
// однако стандартный шаблон create-react-app не предусматривает их использование,
// поэтому в данном случае будет использоваться нотация БЭМ
import './App.css'

import AnimatedNumber from './AnimatedNumber'


class App extends Component {
  constructor(props) {
    super(props)

    // Тут можно было бы использовать Redux, но для подобного приложения эта библиотека не раскрывает свои преимущества
    this.state = {
      number: 0,
      actualNumber: 0,
    }
  }

  render() {
    const {
      number,
      actualNumber,
    } = this.state

    return (
      <div className="app">
        <TextField {...{
          label: 'Число',
          type: 'number',
          value: number,
          onChange: e => {
            this.setState({
              number: +e.target.value,
            })
          },
          style: {
            width: 300,
            marginRight: 30,
          },
        }} />
        <Button {...{
          variant: 'contained',
          color: 'primary',
          onClick: () => {
            this.setState({
              actualNumber: number,
            })
          }
        }}>
          Применить
        </Button>
        <AnimatedNumber {...{
          className: 'app__animated-number',
          value: actualNumber,
        }} />
      </div>
    )
  }
}

export default App
