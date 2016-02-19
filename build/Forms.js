"use strict";

var Forms = function Forms(_ref) {
  var form = _ref.form;
  var formHandleSubmit = _ref.formHandleSubmit;

  return React.createElement(
    "div",
    { className: "formsEntry" },
    React.createElement(
      "form",
      { className: "scheduler" },
      React.createElement("input", { className: "dest", placeholder: "I want to go to..." }),
      React.createElement("input", { className: "timeDepart", placeholder: "I want to leave at..." }),
      React.createElement("input", { className: "timeReturn", placeholder: "I have to be back by..." }),
      React.createElement(
        "button",
        { className: "scheduleTrain" },
        "Schedule Train"
      )
    )
  );
};

window.Forms = Forms;