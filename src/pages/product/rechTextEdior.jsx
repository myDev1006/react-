import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import _ from "lodash"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

 export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  componentWillMount(){
      let detail = this.props.detail;
      if (detail) {
        const contentBlock = htmlToDraft(detail);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState ({
          editorState
        });
      }
  }
  onEditorStateChange = _.debounce((editorState) => {
    this.setState({
      editorState,
    });
  },0)

f
  //将详细信息传给父组件
  getdetail = ()=>{
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  // getdetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))


uploadImageCallBack =(file)=> {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle = {{border:"1px solid #000",paddingLeft:"10px",height:200}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback:this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    );
  }
}