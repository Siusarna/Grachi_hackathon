import React, { Component } from "react";

const registerForms = () => {
    const forms = [
        { labelType: "firstName", type: "text", actualName: "Ім'я" },
        { labelType: "lastName", type: "text", actualName: "Прізвище" },
        { labelType: "fatherName", type: "text", actualName: "По-батькові" },
        { labelType: "phones", type: "text", actualName: "Ваш телефон" },
        { labelType: "password", type: "password", actualName: "Пароль" }
      ];
   return (<>
    {forms.map(({ actualName, type, labelType }) => (
        <div className="form-group">
          <label htmlFor={labelType}>{actualName}</label>
          <input type={type} id={labelType} className="form-control" />
        </div>
      ))}
      </>)
}

export default registerForms;