import React,{Component} from 'react';
import {Form,Input} from "antd"
let Itme = Form.Item;

//添加和更新功能的form组件
 class UpdataAddForm extends Component{

    componentWillMount(){
        //通过父组件的函数传递给子组件，子组件将form对象传给父组件
        this.props.setForm(this.props.form)
    }
render(){
    let {getFieldDecorator}  = this.props.form;
    let {categoryName} = this.props;
return(
<Form>
<Itme>
{
    getFieldDecorator("categoryName",{
        initialValue:categoryName || "",
        rules:[
            {required:true,message:"此为必填项"}
        ]
    })(
        <Input type="text" placeholder="请输入分类名称"></Input>
    )
}
</Itme>
</Form>
);
}
}

export default Form.create()(UpdataAddForm);