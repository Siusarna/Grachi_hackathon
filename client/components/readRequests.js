import React, { Component, useEffect, useState} from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import GoogleMapReact from 'google-map-react';
import { set } from 'mongoose';

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

const readRequests =  () => {
    const [data, setData] = useState([])
    useEffect(async() => { 
      const geo = navigator.geolocation.getCurrentPosition(async ({latitude, longitude}) => { 
        await fetch("/api/auth/register", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({latitude, longitude}) // тип данных в body должен соответвовать значению заголовка "Content-Type"
      }).then(resp =>  {
                if(resp.ok)  {
                    const realData = resp.json();
                    const geolocation = JSON.parse(realData.geolocation);
                    return setData({...realData, geolocation: {lat: geolocation.latitude, lng: geolocation.longitude} })
                }
            })});

        })

        const defaultProps = {
          center: {lat: 10, lng: 10},
          zoom: 14
        };
        return (
        <>{data ? [...data].map(elem => {
          console.log(elem)
          return (<MDBRow className='mt-3'>
  <MDBCard className="w-100 height-card-fix mb-4 text-center">
    <MDBCardBody>
      <MDBCardTitle>{`${elem.user.firstName} ${elem.user.lastName}`}</MDBCardTitle>
      <MDBCardText>
        {`${elem.description ? elem.description : null}`}
      </MDBCardText>
      <MDBBtn color="primary">Допомогти</MDBBtn>
    </MDBCardBody>
  </MDBCard>
        </MDBRow>)}) : null}</>
        )
}

export default readRequests;