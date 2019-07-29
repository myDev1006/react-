import { Upload, Icon, Modal, message } from 'antd';
import React ,{Component} from "react"
import {reqdeleteImg} from "../../api/index"
import {BASE_IMG} from "../../utils/constants"
import propTypes from "prop-types"
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

 export default class PicturesWall extends Component {
     //声明类型
     static propTypes = {
         imgs:propTypes.array
     }
  state = {
    previewVisible: false,//是否显示大图
    previewImage: '',//大图地址
    fileList: [//上传的图片信息
      {
        uid: '-1',//图片标识
        name: 'xxx.png',//图片名字
        status: 'done',//状态
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };
  componentWillMount(){
      let imgs = this.props.imgs;
      if(imgs){
        let fileList = imgs.map((img,index)=>({
            uid:-index,
            name: img,
            status: "done",
            url:BASE_IMG+img
        }))
        this.setState({fileList})
      }
      
  }
//获取上传完成的图片名字数组
getImgs = ()=>{
     return this.state.fileList.map(item =>item.name);

}

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {//file是当前操作的图片
    if (!file.url && !file.preview) {//判断没有值才进行转码
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({file, fileList }) =>{
    //   console.log(file.status,file);flie == filelist[filelist.length-1]false,虽然文件相同，但不是同一个对象
      if(file.status == "done"){
        let {name,url} = file.response.data;
        // console.log(file == fileList[fileList.length-1])

        file = fileList[fileList.length-1]
        // console.log(file == fileList[fileList.length-1])
        file.name =name;
        file.url = url;
      console.log(file);
      }else if(file.status == "removed"){
        //如果状态为移出的话调用删除接口
        let result = await reqdeleteImg(file.name)
        result.status == 0?message.success("删除成功"):message.error("删除失败")
      }
    this.setState({ fileList })//更新状态，要不页面不显示
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"//上传图片的地址
          name = "image"//图片的参数名
          listType="picture-card"//风格样式
          fileList={fileList}//已上传的图片数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

