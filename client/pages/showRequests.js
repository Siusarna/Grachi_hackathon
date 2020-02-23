import NavBar from "../components/navbar";
import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import CreateRequest from "../components/createRequest";
import ReadRequests from "../components/readRequests";
import {MDBContainer} from "mdbreact"
const showRequests = ({ requests }) => {
  return (
    <>
      <NavBar></NavBar>
      <MDBContainer>
        <ReadRequests></ReadRequests>
      </MDBContainer>
      {requests.requestCreation ? <CreateRequest /> : null}
    </>
  );
};

const mapStateToProps = state => {
  return {
    requests: state.requests
  };
};
export default connect(mapStateToProps)(showRequests);
