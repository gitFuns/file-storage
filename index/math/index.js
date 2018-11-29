import React from 'react';
import KeyBoard from './KeyBoard';

import Latex from 'Component/latex';

import html2canvas from 'html2canvas'

export default class MathDemo extends React.Component{
  constructor(props) {
    super(props)

    this.handleKbChange = this.handleKbChange.bind(this)
    this.getInputContent = this.getInputContent.bind(this)
  } 

  componentDidMount() {
    this.inputEle = document.querySelector('.mq-root-block')
  }

  getInputContent() {
    return this.kbRef.getInputContent()
  }

  setInputContent(value) {
    this.kbRef.setInputContent(value)

    value && this.handleKbChange(value)
  }

  getLatexTextWidth() {
    const cursorEle = this.inputEle.querySelector('.mq-cursor')

    return cursorEle.offsetLeft
  }

  handleKbChange(value) {
    const cursorEle = this.inputEle.querySelector('.mq-cursor')
    
    let latex, innerHTML 

    if (value) { latex = `$${value}$` }

    Promise.resolve()
      .then(() => {
        cursorEle && (cursorEle.style.opacity = 0)
      })
      .then(() => {
        return html2canvas(this.inputEle, { logging: false, width: 150 })
      })
      .then(canvas => {
        this.props.onChange && this.props.onChange({ canvas, latex})
      })
      .finally(() => {
        cursorEle && (cursorEle.style.opacity = 1)
      })
  }

  render() {
    return <div>
        <KeyBoard 
          ref={ref => this.kbRef = ref } 
          type={this.props.type}
          onToggleKb={this.props.onToggleKb}
          onChange={this.handleKbChange} />
    </div>
  }
}