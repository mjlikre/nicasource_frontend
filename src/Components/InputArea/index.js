import React from "react";

const InputArea = (props) => {
  return (
    <div className="row">
      <label className="col-md-12">{props.label}</label>
      <input
        className="col-md-12 kjga-input-box"
        type={props.val_type}
        autoComplete="off"
        value={props.val}
        onChange={props.change}
      />
    </div>
  );
};

export default InputArea;
