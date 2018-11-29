import React from 'react';
import { Carousel } from 'antd-mobile';
import {data,analysis} from './data'
import {StudentHeader,StudentQues,StudentAns,StudentRes} from './studentQues'

import "../less/studentExam.less"




export default class StudentExam extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: data,
            currIndex:0
        }
    }


    onSelectAns = (ans,index) =>{
        let {data} = this.state;
        data[index].studentAnswer = ans.key;
        this.setState({data})
    }

    onAfterChange = (index) =>{
        this.setState({
            currIndex:index
        })
        console.log(index)
    }

    onResultPage = () =>{
        this.setState({
            currIndex:this.state.data.length-1
        })
    }

    onResToPage = (index) =>{
        this.setState({
            currIndex:index
        })
    }


    render() {
        const Height = document.documentElement.clientHeight;
        const len = this.state.data.length;
        console.log('=======================登录授权页');
        return (
            <div className="studentExam">
                <StudentHeader currIndex={this.state.currIndex} len={len} onResultPage={this.onResultPage}/>
                <Carousel
                    dots={false}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={this.onAfterChange}
                    selectedIndex={this.state.currIndex}
                    >
                        {this.state.data.map((value,index) => (
                            <div key={index} className="exam-content" style={{height:Height}}>
                                {index != this.state.data.length-1?<div className="exam-body">
                                    <StudentQues 
                                    value={value} 
                                    index={index} 
                                    len={this.state.data.length-1}
                                    onSelectAns={this.onSelectAns}
                                    />
                                {value.studentAnswer?<StudentAns value={value}/>:null}
                                </div>:<StudentRes data={this.state.data} analysis={analysis} onResToPage={this.onResToPage}/> }
                            </div>
                        ))}
                </Carousel>
            </div>
        );
    }

}

