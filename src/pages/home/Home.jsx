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
        <DatePicker />
      </div>
    )
  }
}

export default Home;