"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context = React.createContext({
    applePayState: 'loading',
    googlePayState: 'loading',
    masterpassState: 'loading',
    formId: '',
    onCreateNonce: function (event) { },
});
exports.ContextProvider = Context.Provider;
exports.ContextConsumer = Context.Consumer;
//# sourceMappingURL=Context.js.map