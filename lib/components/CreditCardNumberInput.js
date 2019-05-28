"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var CreditCardNumberInput = function (_a) {
    var label = _a.label;
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("div", null,
            label && React.createElement("span", { className: "sq-label" }, label),
            React.createElement("div", { id: context.formId + "-sq-card-number" }));
    });
};
CreditCardNumberInput.defaultProps = {
    label: 'Credit Card'
};
exports.default = CreditCardNumberInput;
//# sourceMappingURL=CreditCardNumberInput.js.map