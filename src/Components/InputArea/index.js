import React from "react";

const InputArea = (props) => {
  return (
    <div className="col-md-2">
      <label className="col-md-12">{props.label}</label>
      <input
        className="col-md-12 kjga-input-box"
        type="number"
        autoComplete="off"
        value={props.amount}
        onChange={props.change}
      />
    </div>
  );
};

export default InputArea;
