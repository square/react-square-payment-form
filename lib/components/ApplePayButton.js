"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var ApplePayButton = function (props) {
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("div", null,
            React.createElement("button", { id: context.formId + "-sq-apple-pay", className: "sq-apple-pay", style: { display: context.applePayState === 'ready' ? 'block' : 'none' } }),
            context.applePayState === 'loading' && props.loadingView,
            context.applePayState === 'unavailable' && props.unavailableView);
    });
};
exports.default = ApplePayButton;
//# sourceMappingURL=ApplePayButton.js.map