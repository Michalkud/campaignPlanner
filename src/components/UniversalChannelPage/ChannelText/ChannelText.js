import React, { Component } from 'react';
import { Col, Row, Button, DatePicker } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import moment from 'moment';

const { RangePicker } = DatePicker;

class ChannelText extends Component {

  constructor(props) {
    super(props);
    const html = props.text;

    const contentBlock = htmlToDraft(html || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        id: props.id,
        editorState,
        startDate: props.startDate,
        endDate: props.endDate
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  handleSave = () => {
    this.props.mutate({
      variables : {
        id: this.state.id,
        text: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    });
  }


  render() {
    const { name } = this.props;
    return (<Col className="gutter-row" md={24} lg={12}>
      <div className="card gutter-box">
        <Row className="channelDetail">
        <Col md={12}>
          { name }
        </Col>
        <Col>
        <RangePicker
          value={[moment(this.state.startDate), moment(this.state.endDate)]}
          onChange={(neco, dates) => this.setState({ startDate: dates[0], endDate: dates[1] })}
        />
        </Col>
        </Row>
        <Row>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        </Row>
        <Row>
        <Button onClick={this.handleSave} >Save</Button>
    </Row></div></Col>);
  }
}



export default ChannelText;
