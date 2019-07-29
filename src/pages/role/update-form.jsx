import React,{Component} from 'react';
import {Form,Input,Tree} from "antd"
import menuList from "../../config/menuConfig"
let {TreeNode}  = Tree
let Item = Form.Item
export default class UpdateForm extends Component{
    state ={
        checkedKeys:[]
    }
    roleRef = React.createRef()

getTreeNode = (menuList)=>{//根据菜单配置生成treenode数组
    return menuList.reduce((pre,item)=>{
        pre.push(
            <TreeNode title = {item.title} key = {item.key}>
                {item.children?this.getTreeNode(item.children):null}
            </TreeNode>
        )
        console.log(pre)
        return pre;
    },[])
}

getMenu = ()=>this.state.checkedKeys

//点击选中时的方法，更新状态
clickCheck = (checkedKeys)=>{
    this.setState({checkedKeys})
}
componentWillMount(){
    this.TreeNode = this.getTreeNode(menuList)
    let menus = this.props.role.menus;
    console.log(menus)
    this.setState({checkedKeys:menus})
    
}

componentWillReceiveProps(newvalue){
let menus = newvalue.role.menus
this.setState({checkedKeys:menus})
}
render(){
    let {checkedKeys} = this.state
    let{role} = this.props
    let formItemLayout = {
        labelCol: { span: 4 },  
        wrapperCol: { span: 15 },
    }
        
    
return(
<div>
<Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>

        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.clickCheck}
        >
          <TreeNode title="平台权限" key="all">
            {
              this.TreeNode
            }
          </TreeNode>
        </Tree>
</div>
);
}
}