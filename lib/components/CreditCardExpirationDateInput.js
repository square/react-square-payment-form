"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var ExpirationDateInput = function (_a) {
    var label = _a.label;
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("div", null,
            label && React.createElement("span", { className: "sq-label" }, label),
            React.createElement("div", { id: context.formId + "-sq-expiration-date" }));
    });
};
ExpirationDateInput.defaultProps = {
    label: 'Expiration'
};
exports.default = ExpirationDateInput;
//# sourceMappingURL=CreditCardExpirationDateInput.js.map