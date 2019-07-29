import React,{Component} from 'react';
import {Card,List,Icon, message} from "antd"
import {Redirect} from "react-router-dom"
import {reqCategory,req_product} from "../../api/index"
import momoryUtil from "../../utils/momory"
import {BASE_IMG} from "../../utils/constants"
let Item = List.Item;//必须放到最后
export default class Detail extends Component{

    state = {
        categoryName:"",
        product:momoryUtil.product//默认状态为内存中存的product
    }
    //请求获取分类信息
    getCategory = async(categoryId)=>{
        let result = await reqCategory(categoryId);
        console.log(result);
        if(result.status == 0){
            // console.log(result)
           let categoryName = result.data.name;
           this.setState({categoryName});
        }
    }
    async componentDidMount(){
       let product = this.state.product;//从内存中取到当前商品对象
       if(product._id){
        this.getCategory(product.categoryId);
       // console.log(product.categoryId)//请求的分类信息的id
       }else{
           //如果product没有数据，根据id获取商品
           let id = this.props.match.params.id
           let result = await req_product(id)
           if(result.state ==0){
            product = result.data
            console.log(product)
            this.setState({product})
           }
           this.getCategory(product.categoryId)
       }
        
    }
render(){
    let product = this.state.product;
    // console.log(product)
    let{categoryName} = this.state;
    // console.log(categoryName)
    if(!product||!product._id){
        return <Redirect to = "/product"></Redirect>
    }

    let title = (
        <span>
            <Icon className = "icon" type ="arrow-left" onClick = {()=>{this.props.history.goBack()}}/>
            商品详情
        </span>
    )
return(
<div>
<Card title ={title} >
      <List>
          <Item >
             <span className = "list-left">商品名称：</span> 
             <span>{product.name}</span> 
          </Item>
          <Item>
             <span className = "list-left">商品描述：</span> 
             <span>{product.desc}</span> 
          </Item>
          <Item>
             <span className = "list-left">商品价格：</span> 
             <span>{product.price}</span> 
          </Item>
          <Item>
             <span className = "list-left">所属分类：</span> 
             <span>{categoryName}</span> 
          </Item>
          <Item>
             <span className = "list-left">商品图片：</span> 
             <span>
                 {
                     product.imgs.map(item =><img style = {{width:150}} key = {item} src = {BASE_IMG+item} alt = "img"></img>)
                    // product.imgs.map(img => <img className="detail-img" key={img} src={BASE_IMG + img} alt="img" />)
                 }
                 </span> 
          </Item>
          <Item>
             <span className = "list-left">商品详情：</span> 
             <div dangerouslySetInnerHTML={{ __html: product.detail}}></div> 
          </Item>
          </List>  
</Card>
</div>
);
}
}