import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import ModalRegister from '../components/register.js'
const Home = () => {
  const endpoints = [
    { name: "Приєднатися", endpoint: "/api/auth/register", modal: 'login' },
    { name: "Увійти", endpoint: "/api/auth/login", modal: 'register'},
    { name: "Поглянути, як працює", endpoint: "/showRequests", link: true }
  ];
  const [modal, setModal] = useState('none')

  const toggleModel = (name) => {
    setModal(name);
  }
    return (
    <div>
      <Head>
        <title>PeerLance</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-blue text-white">
        <MDBContainer className="d-flex half-wrap content-to-center flex-column container-fluid ">
          <MDBRow className="d-flex text-center">
            <MDBCol className="mt-5">
              <h1 className="h1-repsonsive">PeerLance</h1>
            </MDBCol>
          </MDBRow>
          <MDBRow className="d-flex text-center">
            <MDBCol className="mt-5">
              <h4 className="h1-repsonsive">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor{" "}
              </h4>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
        <MDBRow className="mt-5 mx-0">
          {endpoints.map((elem, i) => {
            return (
              <MDBCol className="d-flex justify-content-center" lg={4} key={i}>
                {elem.link ? (
                  <Link href={elem.endpoint}>
                    <MDBBtn className="fixed-btn" color="primary">
                      <h6 className="mb-0">{elem.name}</h6>
                    </MDBBtn>
                  </Link>
                ) : (
                  <MDBBtn className="fixed-btn" color="primary" onClick={() => toggleModel(elem.name)} >
                    <h6 className="mb-0">{elem.name}</h6>
                  </MDBBtn>
                )}
              </MDBCol>
            );
          })}
        </MDBRow>
        <ModalRegister></ModalRegister>
    </div>
  );
};

export default Home;
