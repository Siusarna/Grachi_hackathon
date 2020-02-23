import React, {Component, useState} from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import '../stylesheets/intro.css';
import RegisterForms from './registerForms';
import PhoneApprove from './phoneApprove';
import {connect} from 'react-redux';
import {userInformationAdded} from '../redux/action';

const ModalRegister = ({signup, userInformationAdded}) => {
  const [phoneComp, setPhoneComp] = useState(false);
  const [modal, setModal] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const elems = e.target;
    const data = [...elems.children[0].children].reduce((acc, curr) => {
      const [label, input] = curr.children;
      acc[label.attributes[0].value] = input.value;
      return acc;
    }, {});
    if (!phoneComp) {
      userInformationAdded(data);
      setPhoneComp(true);
      await fetch("/api/auth/register", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // тип данных в body должен соответвовать значению заголовка "Content-Type"
      }).then(resp => console.log(resp));
      await fetch('/api/auth/verifyPhoneFirstStep', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phones: data.phones}), // тип данных в body должен соответвовать значению заголовка "Content-Type"
      }).then(resp => resp);
    } else {
      console.log(signup);
      const phoneData = {phones: signup.data.phones, secretKey: data.code};
      console.log(phoneData);
      await fetch('api/auth/verifyPhoneSecondStep', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(phoneData), // тип данных в body должен соответвовать значению заголовка "Content-Type"
      }).then(resp => resp);
    }
  };
  const handleClose = () => {
    setPhoneComp(false);
    setModal(!modal);
  };
  return (
    <MDBContainer>
      <MDBModal isOpen={modal} centered>
        <MDBModalHeader className="justify-content-center">
          Реєстрація
        </MDBModalHeader>
        <form onSubmit={handleSubmit}>
          <MDBModalBody>
            {!
              phoneComp ? <RegisterForms></RegisterForms> : <PhoneApprove/>}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={handleClose} color="secondary">
              Закрити
            </MDBBtn>
            <MDBBtn type="submit" color="primary">
              Підтвердити телефон
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </MDBContainer>
  );
};

const mapStateToProps = state => {
  return {
    signup: state.signup,
  };
};

const mapDispatchToProps = {
  userInformationAdded,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister);
