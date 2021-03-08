import React from "react";

const InputArea = (props) => {
  return (
    <div className="row">
      <label className="col-md-12">{props.label}</label>
      <input
        className="col-md-12 kjga-input-box"
        type="number"
        autoComplete="off"
        value={props.val}
        onChange={(e) => {props.change(e)}}
      />
    </div>
  );
};

export default InputArea;
