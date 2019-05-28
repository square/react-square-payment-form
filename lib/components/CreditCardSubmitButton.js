"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var CreditCardSubmitButton = function (props) {
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("button", { className: "sq-creditcard", onClick: context.onCreateNonce }, props.children ? props.children : 'Pay');
    });
};
exports.default = CreditCardSubmitButton;
//# sourceMappingURL=CreditCardSubmitButton.js.map