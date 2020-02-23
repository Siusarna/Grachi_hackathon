import NavBar from '../components/navbar'
import React, { Component, useEffect } from 'react'
import {connect} from 'react-redux'
import CreateRequest from '../components/createRequest'

const showRequests = ({requests}) => {
    return (<>
    <NavBar></NavBar>
        {requests.requestCreation ? <CreateRequest /> : null}
    </>)
}

const mapStateToProps = state => {
    return {
      requests: state.requests
    };
  };
export default connect(mapStateToProps)(showRequests);
