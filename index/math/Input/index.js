import React from 'react';
import MathWrapper from './mathquillHelper';
import Keys from './keys';
import './index.less';

export default class Input extends React.Component{
    static defaultProps = {
        onKeyboardClick: () => {},
        onInputComplete: () => {}
    }

    state={  isEmpty:true } //用于控制，确定按钮，左，右键是否启用

    componentDidMount(){
        this.math = new MathWrapper(this.input);
    }

    onKeyboardClick = (value )=> {
        this.math.pressKey(value);
        
        let isEmpty = this.math.getContent() === ''
        
        if(isEmpty !== this.state.isEmpty){
            this.setState({ isEmpty })
        }
        
        this.props.onChange && this.props.onChange(this.math.getContent());
    }

    onInputComplete() {
        let event = new Event('mathinput.hide')
        window.dispatchEvent(event)

        this.math.blur()

        this.props.onChange && this.props.onChange()
    }

    blur() {
        this.math.blur()

        this.props.onChange && this.props.onChange()
    }

    render(){
        const {isEmpty,sysContent} = this.state;
        return <div className='hybrid-math-input-wrapper'>
            <span className='hybrid-math-input' ref={(dom)=>{this.input = dom;}}></span>
            
            <span 
                className={`keyboard_move_backward ${isEmpty?'disabled':''}`} 
                onClick={()=>this.onKeyboardClick(Keys.LEFT)}
            />

            <span 
                className={`keyboard_move_forward ${isEmpty?'disabled':''}`}
                onClick={()=>this.onKeyboardClick(Keys.RIGHT)}
            />

            <span 
                className={`keyboard_yes ${isEmpty?'disabled':''}`} 
                onClick={() => this.onInputComplete()}
            >
                确定
            </span>
            </div>
    }
}