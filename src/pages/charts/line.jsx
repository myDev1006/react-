import React, { Component } from 'react'
import ReactEcharts from "echarts-for-react"
import {Button,Card} from "antd"

/**
 *  线性图
 */
export default class Line extends Component {
  state = {
    sales:[5,7,8,9,10],//销售
    stores:[10,9,23,15,30]//库存
  };
  getOption = (sales,stores)=>{
      return {
        title:{
          text:"销售和库存图"
        },
        tooltip:{},
        legend:{
          data:["销售","库存"]
        },
        xAxis:{
          data:["小米","华为","联想","魅族","三星"]
        },
        yAxis:{},
        series:[{
          name:"销售",
          type:"line",//这个是图表的类型
          data:sales
        },{
          name:"库存",
          type:"line",
          data:stores
        }]
      }
  }
  render() {
    let {sales,stores} = this.state;
    return (
      <div>
       <Card>
         <Button type ="primary">更新</Button>
       </Card>
       <Card title = "折线图">
        <ReactEcharts option = {this.getOption(sales,stores)}/>
       </Card>
      </div>
    )
  }
}
