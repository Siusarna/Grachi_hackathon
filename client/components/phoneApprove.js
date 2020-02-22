import React, { Component, useEffect } from "react";

const phoneApprove = () => {

   return (
        <div className="form-group">
          <label htmlFor='code'>Введіть код, що скоро прийде на ваш номер телефону:</label>
          <input type='number' id="code" className="form-control" />
        </div>
        )
}

export default phoneApprove;