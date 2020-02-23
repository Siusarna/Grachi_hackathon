import {connect} from 'react-redux';
import {closeRequest} from '../redux/action'
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
  } from "mdbreact";
const createRequest = ({closeRequest, requests}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const elems = e.target;
        const data = [...elems.children[0].children].reduce((acc, curr) => {
          const [label, input] = curr.children;
          acc[label.attributes[0].value] = input.value;
          return acc;
        }, {});
        await fetch('/api/requests/createRequest',{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // тип данных в body должен соответвовать значению заголовка "Content-Type"
          }).then(resp => resp);
        closeRequest();
      };
      const handleClose = () => {
          closeRequest();
    }
  return (
    <MDBContainer>
      <MDBModal isOpen={requests.requestCreation} centered>
        <MDBModalHeader className="justify-content-center">
          Запит про допомогу
        </MDBModalHeader>
        <form onSubmit={handleSubmit}>
          <MDBModalBody>
            <div className="form-group">
              <label htmlFor="description">Опис проблеми:</label>
              <textarea id="description" className="form-control" required/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Скільки часу готові чекати(у хвилинах):</label>
              <input type='number' id="description" className="form-control" required/>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={handleClose} color="secondary">
              Закрити
            </MDBBtn>
            <MDBBtn type="submit" color="primary">
              Створити заявку
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </MDBContainer>
  );
};

const mapDispatchToProps = {
    closeRequest
}
const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createRequest);
