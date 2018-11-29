import React from "react";
import utils from 'Utils';

class BlankIn extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			blanksEles: [],//当前需填空元素集合
			index: 0, //当前输入框索引
			answers:[]
		}
	}
	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve)
		})
	}
	async UNSAFE_componentWillMount() {
		let {question, answers = [], isDetail = false} = this.props.itemObj
		let content = isDetail ? question.content : question.content.replace(/<div class='quizPutTag' >&nbsp;<\/div>/g,`<input class='quizPutTag' size='1' maxlength='16'></input>`).replace(/&nbsp;/g,'')
		await this.setStateAsync({
			content,
			answers,
			isDetail,
			className: `blank_${new Date().getTime()}`
		})
	}
	componentDidMount(){
		let blanks = [...document.querySelectorAll(`.${this.state.className} .quizPutTag`)]
		if(!this.state.isDetail){
			window.nextInput = this.nextInput
			this.nextInput = this.nextInput.bind(this)
			//目前业务逻辑为必须全部填完才能提交 故answers要么为空，要么数组元素个数完全匹配要填空的个数
			let answers = this.state.answers.length ? this.state.answers : new Array(blanks.length).fill('')
			this.setState({
				blanksEles: blanks,
				answers:  answers
			})
			this.handleBlankElements(blanks)
		}else{
			this.handleBlankElements(blanks, true)
		}

		window.addEventListener('resize',(e)=>{
			if(!/phone/g.test(navigator.userAgent.toLocaleLowerCase())){
				if(document.activeElement.tagName.toUpperCase()==='INPUT'){
					document.activeElement.scrollIntoViewIfNeeded();
				}
			}
		})
	}
	handleFocus = (index) => {
		this.state.blanksEles[index].classList.remove("edit-icon")
		this.setState({
			index: index
		})
	}
	async handleBlur(item, index){
		let curBlankEle = this.state.blanksEles[index]
		curBlankEle.innerText = utils.trimStr(curBlankEle.innerText)
		!curBlankEle.innerText && curBlankEle.classList.add("edit-icon")
		await this.setStateAsync((preState)=>{
			preState.answers[index] = item.innerText
			return {
				answers : preState.answers
			}
		})
		// 如果全部填完，则回调答案
		this.state.answers.every(item => !!item) && this.props.itemAnswer(this.props.itemObj,undefined,this.state.answers)
	}
	handleBlankElements = (blanks = [], isDetail)=>{
		if(isDetail){
			const answerMap = { //单空作答情况对应图标
				1 : require('AFSImage/question_icon_correct.png'),
				2 : require('AFSImage/question_icon_half.png'),
				3 : require('AFSImage/question_icon_error.png')
			}
			// let url = require.context('AFSImage', false, /^\.png$/)
			blanks.forEach( (item, index) => {
				item.innerHTML = this.state.answers[index] +' '+ `<img src=${answerMap[this.props.itemObj.answersResult[index]]}>`
			})
		}else{
			blanks.forEach( (item, index) => {
				item.value = this.state.answers[index] || ''
				!this.state.answers[index] && (item.className += ' edit-icon')
				item.onfocus = this.handleFocus.bind(this,index)
				item.onblur = this.handleBlur.bind(this,item,index)
			})
		}
	}
	async nextInput (){
		let outIndex = this.state.index
		if(++outIndex > this.state.blanksEles.length - 1){
			outIndex = 0
		}
		await this.setStateAsync({
			index: outIndex
		})
		this.state.blanksEles[this.state.index].focus()
	}
	render() {
		return <div className={this.state.className}>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			{utils.latex(this.state.content)}
			
			<br />
			<button onClick={this.nextInput}>下一空</button>	
		</div>
	}
}
export default BlankIn
