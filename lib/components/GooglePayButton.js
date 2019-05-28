"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var GooglePayButton = function (props) {
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("div", null,
            React.createElement("button", { id: context.formId + "-sq-google-pay", className: "sq-google-pay", style: { display: context.googlePayState === 'ready' ? 'block' : 'none' } }),
            context.googlePayState === 'loading' && props.loadingView,
            context.googlePayState === 'unavailable' && props.unavailableView);
    });
};
exports.default = GooglePayButton;
//# sourceMappingURL=GooglePayButton.js.map