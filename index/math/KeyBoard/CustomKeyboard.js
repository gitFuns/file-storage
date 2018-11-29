import classnames from 'classnames';
import React from 'react';
import KeyboardItem from './KeyboardItem';
import { Grid, Flex } from 'antd-mobile';
import Keys from '../Input/keys';
import Input from '../Input';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Bk</div>
);

class CustomKeyboard extends React.Component {

  static defaultProps = { prefixCls: 'am-number-keyboard' };
  linkedInput
  antmKeyboard
  onKeyboardClick = ( e, value ) => {
    e.nativeEvent.stopImmediatePropagation();

    if (value === 'KEYBOARD_HIDE') {
      let hideKbEvent = new Event('mathinput.hide')

      this.props.onToggleKb && this.props.onToggleKb()

      window.dispatchEvent(hideKbEvent)
    } else if (value === 'KEYBOARD_ALPHABET') {
      this.setState({
        isNumberKeyBoard: false
      })
    } else if(value === 'KEYBOARD_BACK_NUMBER'){
      this.setState({
        isNumberKeyBoard: true
      })
    } else if(value === 'UPPERCASE_LOCKED'){
      this.setState({isUpper:!this.state.isUpper})
    }else if (this.linkedInput) {
      this.linkedInput.onKeyboardClick(value);
    }
  }

  state = {
    isNumberKeyBoard: true,
    isUpper:false,
  }

  renderLatex = () => {
    let data = []

    const type = this.props.type

    // 小学学段
    if (!type || type === 'primary') {
      data = [
        { cls: 'keyboard_square_root', value: Keys.SQRT },
        { cls: 'keyboard_nth_root', value: Keys.RADICAL },
        { cls: 'keyboard_squared', value: Keys.EXP_2 },
        { cls: 'keyboard_nth_power', value: Keys.EXP },
        { cls: 'keyboard_absolute_value', value: Keys.ABS },
        { cls: 'keyboard_fraction', value: Keys.FRAC_EXCLUSIVE },
        { cls: 'keyboard_pi', value: Keys.PI },
        { cls: 'keyboard_or', value: Keys.OR }
      ];
    }

    // 初中学段
    if (type === 'junior') {
      data = [
        { cls: 'keyboard_square_root', value: Keys.SQRT },
        { cls: 'keyboard_nth_root', value: Keys.RADICAL },
        { cls: 'keyboard_sin', value: Keys.EXP_2 },
        { cls: 'keyboard_cos', value: Keys.EXP },
        { cls: 'keyboard_tan', value: Keys.ABS },
        { cls: 'keyboard_ln', value: Keys.FRAC_EXCLUSIVE },
        { cls: 'keyboard_log', value: Keys.PI },
        { cls: 'keyboard_infinite', value: Keys.OR }
      ];
    }

    return <div className='latex-grid'>
      {data.map((ele, index) => {
        return <KeyboardItem
          key={index}
          onClick={this.onKeyboardClick}
          className={`grey-back ${ele.cls}`}
          value={ele.value}
        >{ele.text}</KeyboardItem>;
      })}
    </div>
  }

  renderComparation = () => {
    let data = [{ cls: 'keyboard_less', value: Keys.LT },
    { cls: 'keyboard_greater', value: Keys.GT },
    { cls: 'keyboard_less_or_equal', value: Keys.LEQ },
    { cls: 'keyboard_more_or_equal', value: Keys.GEQ }];
    return <div className='comparation-grid'>
      {data.map((ele, index) => {
        return <KeyboardItem
          key={index}
          onClick={this.onKeyboardClick}
          className={`grey-back ${ele.cls}`}
          value={ele.value}
        ></KeyboardItem>;
      })}
    </div>
  }

  renderOperation = () => {
    let data = [{ cls: 'keyboard_plus', value: Keys.PLUS },
    { cls: 'keyboard_minus', value: Keys.MINUS },
    { cls: 'keyboard_plus_or_minus', value: Keys.PM }];
    return <div className='opration-grid'>
      {data.map((ele, index) => {
        return <KeyboardItem
          key={index}
          onClick={this.onKeyboardClick}
          className={`grey-back ${ele.cls}`}
          value={ele.value}
        >{ele.text}</KeyboardItem>;
      })}
    </div>
  }

  render() {
    const { prefixCls, wrapProps, className, } = this.props;
    const { isNumberKeyBoard,isUpper } = this.state;

    return (
      <div className={`${prefixCls}-wrapper ${className}`} ref={el => (this.antmKeyboard = el)} {...wrapProps} onTouchStart={(e)=>{e.preventDefault();}}>
        <Input ref={(node) => { this.linkedInput = node; }}  onChange={this.props.onChange}/>
        {isNumberKeyBoard ? <div>
          <div className='keyboard-grid'>
            <div className='expression'>
              {this.renderLatex()}
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((ele, index) => (<div key={index} className={`number-${ele}`}>
              <KeyboardItem
                onClick={this.onKeyboardClick}
                value={'NUM_' + ele}
              >{ele}</KeyboardItem></div>))}
            <div className='close'>
              <KeyboardItem
                className='grey-back keyboard_backspace'
                value={Keys.BACKSPACE}
                onClick={this.onKeyboardClick}
              >
              </KeyboardItem></div>
            <div className='opration'>
              {
                this.renderOperation()
              }
            </div>
            <div className='apha'><KeyboardItem
              className='grey-back keyboard_alphabet'
              value='KEYBOARD_ALPHABET'
              onClick={this.onKeyboardClick}
            >
            </KeyboardItem></div>
            <div className='func'><KeyboardItem
              className='grey-back keyboard_hide'
              value='KEYBOARD_HIDE'
              onClick={this.onKeyboardClick}
            >
            </KeyboardItem></div>
            <div className='comparation'>{
              this.renderComparation()
            }</div>
          </div>
        </div>
          : <div>
            <div className='apha-flex'>
              {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((ele, index) => <KeyboardItem
                className='apha-item'
                value={isUpper?ele.toUpperCase():ele}
                onClick={this.onKeyboardClick}
                key={index}
              >
                {isUpper?ele.toUpperCase():ele}
              </KeyboardItem>)}
            </div>
            <div className='apha-flex'>
              {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((ele, index) => <KeyboardItem
                className='apha-item'
                value={isUpper?ele.toUpperCase():ele}
                onClick={this.onKeyboardClick}
                key={index}
              >
                {isUpper?ele.toUpperCase():ele}
              </KeyboardItem>)}
            </div>
            <div className='apha-flex'>
              <KeyboardItem
                className={`grey-back ${isUpper?'keyboard_uppercase_locked':'keyboard_uppercase_lock'}`}
                value={'UPPERCASE_LOCKED'}
                onClick={this.onKeyboardClick}
                key={'UPPERCASE_LOCKED'}
              >
              </KeyboardItem>
              {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((ele, index) => <KeyboardItem
                className='apha-item'
                value={isUpper?ele.toUpperCase():ele}
                onClick={this.onKeyboardClick}
                key={index}
              >
                {isUpper?ele.toUpperCase():ele}
              </KeyboardItem>)}
              <KeyboardItem
                className='grey-back keyboard_backspace'
                value={Keys.BACKSPACE}
                onClick={this.onKeyboardClick}
              >
              </KeyboardItem>
            </div>

            <div className='apha-flex'>
              <KeyboardItem
                className='grey-back footer-item keyboard_back'
                value='KEYBOARD_BACK_NUMBER'
                onClick={this.onKeyboardClick}
              >
              </KeyboardItem>
              <KeyboardItem
                className='grey-back footer-item keyboard_hide'
                value='KEYBOARD_HIDE'
                onClick={this.onKeyboardClick}
              >
              </KeyboardItem>
              {this.renderOperation()}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default CustomKeyboard;