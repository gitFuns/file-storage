import React from 'react';
import ReactDOM from 'react-dom';
import CustomKeyBoard from './CustomKeyboard';
import './index.less';
const keyboardPrefixCls = 'hybrid-keyboard';

export default class KeyBoard extends React.Component {
    container
    state={
        visible:false,
    }

    getContaner(){
        if (!this.container) {
            const container = document.createElement('div');
            container.setAttribute('class', `${keyboardPrefixCls}-container`);
            document.body.appendChild(container);
            this.container = container;
        }

        return this.container;
    }

    componentDidMount(){
        window.addEventListener('mathinput.pop', this.show, false);
        window.addEventListener('mathinput.hide', this.hide, false);
    }

    show= (evt) => {
        this.kbRef.linkedInput.math.focus()
        this.setState({ visible:true })
    }

    hide= () => {
        this.setState({ visible:false })
    }

    getInputContent = () => {
        return this.kbRef.linkedInput.math.getContent()
    }

    setInputContent = (value) => {
        return this.kbRef.linkedInput.math.setContent(value)
    }

    componentWillUnmount(){
        window.removeEventListener('mathinput.pop',this.show);
        window.removeEventListener('mathinput.hide',this.hide);
    }

    renderBoard=()=>{
        const {visible} = this.state;
        
        return <CustomKeyBoard ref={ ref => this.kbRef = ref} 
            {...this.props} 
            className={visible?'show':''} />;
    }

    render(){
        return ReactDOM.createPortal(this.renderBoard(),this.getContaner());
    }
}