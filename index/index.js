import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
import Math from './math'

import Latex from 'Component/latex';
import './index.less'
import './less/studentExam.less'

/** 暂不支持PC端 **/

class CommonIndex extends Component { 

  constructor(props) {
    super(props)

    this.defaultOffset = 3
    this.handleClick = this.handleClick.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleToggleKb = this.handleToggleKb.bind(this)
    this._handleInputBlur = this._handleInputBlur.bind(this)
  }

  handleClick(evt) {
    const target = evt.target.tagName === 'INPUT' 
      ? evt.target.parentNode
      : evt.target

    Array.from(document.querySelectorAll('.input-answer'))
      .forEach(inputEle => {
        inputEle.classList.remove('active')
      })

    target.classList.add('active')

    this.currentInputEle = target 
    this.mathRef.setInputContent(target.latexTxt || '')

    window.dispatchEvent(new Event('mathinput.pop'))
  }

  handleToggleKb() {
    const width = this.mathRef.getLatexTextWidth()
    let inputEle = document.createElement('INPUT')

    inputEle.addEventListener('blur', this._handleInputBlur, false)
    inputEle.classList.add('inner-input')
    this.currentInputEle.appendChild(inputEle)

    inputEle.style.left = width + this.defaultOffset + 'px'

    inputEle.focus()
  }

  handleOnChange({ canvas, latex }) {    
    this.currentInputEle.innerHTML = ''
    this.currentInputEle.latexTxt = this.mathRef.getInputContent()
    this.currentInputEle.appendChild(canvas)
  }

  _handleInputBlur(evt) {
    let target = event.target

    target.setAttribute('readonly', 'true')

    let content = `${this.currentInputEle.latexTxt}${target.value}`

    this.currentInputEle.latexTxt = content
  }

  render() {
    return (<div className="AppContainer">
        <div tabIndex="-1" className="input-answer" onClick={this.handleClick} />

        <br />

        <div tabIndex="-1" className="input-answer" onClick={this.handleClick}></div>

        <Math 
          type="primary"
          ref={ ref => this.mathRef = ref } 
          onToggleKb={this.handleToggleKb} 
          onChange={this.handleOnChange} />
      </div>
    )}
}

export default hot(module)(CommonIndex)
