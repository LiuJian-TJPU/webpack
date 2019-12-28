import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import { connect } from 'react-redux';

const mapState = (state) => ({
  title: state.test.headerTitle
})

@connect(mapState)

class Home extends Component {
  state = {
    name: '刘健'
  }
  render() {
    return (
      <div>
        <Button>{this.props.title}</Button>
        <Button>{this.state.name}</Button>
        <DatePicker />
      </div>
    )
  }
}

export default Home;