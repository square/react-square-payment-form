"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var MasterpassButton = function (props) {
    return React.createElement(Context_1.ContextConsumer, null, function (context) {
        return React.createElement("div", null,
            React.createElement("button", { id: context.formId + "-sq-masterpass", className: "sq-masterpass", style: { display: context.masterpassState === 'ready' ? 'block' : 'none' } }),
            context.masterpassState === 'loading' && props.loadingView,
            context.masterpassState === 'unavailable' && props.unavailableView);
    });
};
exports.default = MasterpassButton;
//# sourceMappingURL=MasterpassButton.js.map