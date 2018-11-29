import React from 'react';
import {NavBar,Icon} from 'antd-mobile';
import "../less/studentExam.less"




export const StudentHeader = (props) =>{
    const {currIndex,len,onResultPage} = props;
   
    return <div className="header-content">
        <NavBar 
                    mode="light"
                    icon={<Icon type="left" size="lg" color="#7F7E8D"/>}
                    leftContent={<div className="header-back">返回</div>}
                    rightContent={
                        len-1 == currIndex?null:<div className="header-sheet" onClick={onResultPage}>
                            <img src="/image/answerSheet.png" />
                            答题卡
                            </div>
                    }
                    style={{width:"100%"}}
            ><div className="header-title">练习</div></NavBar>
    </div>
    
}


export const StudentQues = (props) =>{
    const {value,index,len,onSelectAns} = props;
    return <div className="ques-content">
                <div className="ques-header">{index+1}/{len}单选题</div>
                                <div className="ques-que">{value.Ques}</div>
                                <div>
                                    <div className="ques-ans">
                                        {value.ans.map((item,i)=>(
                                            <div key={i} className={`ques-ans-item ${value.studentAnswer==item.key?"quse-ans-stu":""}`} 
                                            onClick={value.studentAnswer?null:()=>onSelectAns(item,index)}
                                            >
                                            <div className="ques-ans-symbol">{item.key}</div>{item.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div></div>
                </div>
            </div>   
}

export const StudentAns = (props) =>{
    const {value} = props;
    console.log(11)
    console.log(value.studentAnswer)

    console.log(22)
    console.log(value.questionAnswer)
    
    return <div className="ans-content">
                <div className="ans-header">题目解析</div>
                <div className="ans-body">
                    <div className="ans-iTrue">
                        <div className='ans-infor-title'>
                            <img src="/image/badge.png" />
                        </div>
                        {value.studentAnswer == value.questionAnswer?"答对了！":"答错了！"}
                    </div>
                    <div className="ans-infor">
                        <div className="ans-infor-title">详情</div>
                        <div className="ans-infor-content">
                            <div className="ans-correct">正确答案是：{value.questionAnswer}</div>
                            <div className="ans-error">你的答案是：{value.studentAnswer}</div>  
                        </div>                   
                    </div>
                    <div className="ans-infor">
                        <div className="ans-infor-title">解析</div>
                        <div className="ans-infor-content">快速减肥科技开发建设科技付款</div>
                    </div>
                </div>
            </div>
}

export const StudentRes = (props) =>{
    const {data,onResToPage} = props;
    let flag = true;
    for(let i=0;i<data.length-1;i++){
        if(!data[i].studentAnswer){
            flag = false;
            break;
        }
    }

    const returnColor = (item) =>{
        let color
        if(!item.studentAnswer){
            color = "res-undone"
        }else{
            if(item.studentAnswer == item.questionAnswer){
                color="res-correct"
            }else{
                color="res-error"
            }
        }
        return color
        
    }

    const rank = [
        {text:"排名",value:"rank"},
        {text:"班级平均分",value:"avgAccuracy"},
        {text:"已击败同学",value:"defeatRate"},
        
    ]

    return <div className="res-content">
        <div className="res-header">{flag?<div className="img-content">
                <div className="img"><img src="/image/correct.png"/></div>
                <div className="tip">
                    {rank.map((item,index)=>(
                        <div className="res-rank" key={index}>
                            <div className="res-rank-content">{props.analysis[item.value]}</div>
                            <div className="res-rank-title">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>:
            <div className="img-content">
                <div className="img"><img src="/image/undone.png"/></div>
                <div className="tip">还未完成所欲的题目哦，无法给出分析哦！</div>
            </div>
            }</div>
        <div className="res-body">
            <div className="res-name">一、单选题</div>
            <div className="res-ansBox">{data.map((item,index)=>{
                return index != data.length-1?
                <div className={`res-ans ${returnColor(item)}`} 
                    key={index}
                    onClick={()=>onResToPage(index)}
                    >{index+1}</div>:null
                } 
            )}</div>
        </div>
    </div>
}

