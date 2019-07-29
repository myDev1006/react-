import React,{Component} from 'react';
import {Card,Table,Input,Select,Button, Icon, message} from "antd"
import LinkButton from "../../components/link-button/linkButton"
import {reqProduct,reqUpdataState,reqSeacthProduch} from "../../api/index"
import {PAGE_SIZE} from "../../utils/constants"
import momoryUtil from "../../utils/momory"

let Option = Select.Option;
export default class Home extends Component{
  state = {
    loading:false,
    products:[],//商品列表
    total:0,//商品总数
    searchType:"按名称搜索",//搜索类型默认为按名字搜索
    searchName:""//搜索关键字默认为空
  }
  //初始化数据
    initData = ()=>{
      this.columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          // render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          render:(price)=>{return "￥"+price}
        },
        {
          title:"状态",
          // dataIndex:"status",
          
          render:({_id,status})=>{
            let btnText = "下架"
            let text = "在售"
            if(status == 2){
              btnText = "上架"
              text = "已下架"
            }
            return(
              <div>
                <Button type = "primary" onClick = {()=>{this.UpdataState(_id,status)}}>{btnText}</Button>&nbsp;
                <span>{text}</span>
              </div>
            )
          }
        },
        {
          title:"操作",
          render:(product)=>{
           return(
            <div>
            <LinkButton onClick = {()=>{
              momoryUtil.product = product //保存当前商品对象到内存 
              this.props.history.push("/product/detail")
              
              }}>详情</LinkButton>
            <LinkButton onClick = {()=>{
              momoryUtil.product = product //保存当前商品对象到内存              
              this.props.history.push("/product/updata")
              }}>修改</LinkButton>
          </div>
           )
          }
           
          
        }
      ];
      
    }
  //发请求获取商品列表或搜索列表
    getData = async(pageNum)=>{
      this.pageNum = pageNum;
      let {searchName,searchType} = this.state;
        this.setState({loading:true});
        let result;
        if(!searchName){//判断发获取商品列表的请求还是搜索的请求
          result = await reqProduct(pageNum,PAGE_SIZE);
        }else{
          result = await reqSeacthProduch({pageNum,pageSize:PAGE_SIZE,searchName,searchType});
        }
     
     this.setState({loading:false});
    //  console.log(result)
     if(result.status == 0){
      let {total,list} = result.data;
      // console.log(list)
      this.setState({products:list,total});//更新商品列表和商品个数
     }
      
    }

    UpdataState = async (productId,status)=>{
      console.log(11111)
      status = status == 1?2:1;
        let result = await reqUpdataState(productId,status);
        console.log(result);
        if(result.status == 0){
          message.success("状态更新成功");
          this.getData(this.pageNum);
        }else{
          message.error("状态更新失败");
        }
    }
    componentWillMount(){
      this.initData();
    }
    componentDidMount(){
      this.getData(1);
    }
    render() {
      let {loading,total,products,searchName,searchType} = this.state;
      let title = (
        <div>
          <Select 
          style = {{width:"150px"}} 
          //获取下拉框值更新到状态
          value ={searchType}
          onChange = {(value)=>{this.setState({searchType:value})}}
          >
            <Option value = "productName">按名称搜索</Option>
            <Option value = "productDesc">按描述搜索</Option>
          </Select>
          <Input 
          type = "text"
           style = {{width:200, margin:"0 10px"}} 
           placeholder = "键入关键字搜索"
           //获取input框值更新到状态
           onChange = {(e)=>{this.setState({searchName:e.target.value})}}
           ></Input>
          <Button type = "primary" onClick = {()=>{this.getData(1)}}>搜索</Button>
        </div>
      )
      let extra = (
        <Button type ="primary" onClick = {()=>{
          momoryUtil.product = {}
          this.props.history.push("/product/updata")
          
          }}>
          <Icon type = "plus"></Icon>
        添加商品</Button>
      )
      return (
        <Card title = {title} extra = {extra}>
          
          <Table
            rowKey = "_id"
             columns={this.columns}
             dataSource={products}
             bordered = {true}
            loading = {loading}
           
            pagination = {{//分页器
              total,
              defaultPageSize:PAGE_SIZE,//默认的每页条数
              showQuickJumper:true,
              onChange:this.getData//页码改变时更新商品列表
            }}
          />
  
          
        </Card>
      )
    }
}