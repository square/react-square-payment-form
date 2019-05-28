"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var PostalCodeInput = function (_a) {
    var label = _a.label;
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("div", null,
            label && React.createElement("span", { className: "sq-label" }, label),
            React.createElement("div", { id: context.formId + "-sq-postal-code" }));
    });
};
PostalCodeInput.defaultProps = {
    label: 'Postal'
};
exports.default = PostalCodeInput;
//# sourceMappingURL=CreditCardPostalCodeInput.js.map