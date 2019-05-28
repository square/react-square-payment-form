"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var SquarePaymentForm = (function (_super) {
    __extends(SquarePaymentForm, _super);
    function SquarePaymentForm(props) {
        var _this = _super.call(this, props) || this;
        _this.loadSqPaymentFormLibrary = function (onSuccess, onError) {
            if (typeof SqPaymentForm === "function") {
                onSuccess && onSuccess();
                return;
            }
            var script = document.createElement('script');
            script.src = 'https://js.squareup.com/v2/paymentform';
            document.body.appendChild(script);
            script.onload = function () {
                onSuccess && onSuccess();
            };
            script.onerror = function () {
                onError && onError();
            };
        };
        _this.renderSqPaymentForm = function () {
            if (!_this.state.scriptLoaded || _this.paymentForm || (_this.state.errorMessage && _this.state.errorMessage.length)) {
                return;
            }
            try {
                _this.paymentForm = new SqPaymentForm(_this.buildSqPaymentFormConfiguration(__assign({ methodsSupported: _this.methodsSupported }, _this.props)));
                _this.paymentForm.build();
                _this.paymentForm.recalculateSize();
            }
            catch (error) {
                var errorMesasge = error.message || 'Unable to build Square payment form';
                _this.setState({ errorMessage: errorMesasge });
            }
        };
        _this.createNonce = function (event) {
            event.preventDefault();
            _this.paymentForm && _this.paymentForm.requestCardNonce();
        };
        _this.methodsSupported = function (methods) {
            var keys = Object.keys(methods);
            if (keys.indexOf('masterpass') > -1) {
                _this.setState({ masterpassState: methods.masterpass === true ? 'ready' : 'unavailable' });
            }
            if (keys.indexOf('applePay') > -1) {
                _this.setState({ applePayState: methods.applePay === true ? 'ready' : 'unavailable' });
            }
            if (keys.indexOf('googlePay') > -1) {
                _this.setState({ googlePayState: methods.googlePay === true ? 'ready' : 'unavailable' });
            }
        };
        _this.state = {
            applePayState: 'loading',
            googlePayState: 'loading',
            masterpassState: 'loading',
            errorMessage: undefined,
            scriptLoaded: false,
        };
        return _this;
    }
    SquarePaymentForm.prototype.componentDidUpdate = function () {
        this.renderSqPaymentForm();
    };
    SquarePaymentForm.prototype.componentDidMount = function () {
        var _this = this;
        this.loadSqPaymentFormLibrary(function () { return _this.setState({ scriptLoaded: true }); }, function () { return _this.setState({ errorMessage: 'Unable to load Square payment library' }); });
    };
    SquarePaymentForm.prototype.componentWillUnmount = function () {
        if (this.paymentForm) {
            this.paymentForm.destroy();
            this.paymentForm = undefined;
        }
    };
    SquarePaymentForm.prototype.buildSqPaymentFormConfiguration = function (props) {
        var config = {
            applicationId: props.applicationId,
            locationId: props.locationId,
            autoBuild: false,
            inputClass: 'sq-input',
            inputStyles: props.inputStyles,
            env: props.env,
            callbacks: {
                cardNonceResponseReceived: props.cardNonceResponseReceived,
                createPaymentRequest: props.createPaymentRequest,
                inputEventReceived: props.inputEventReceived,
                methodsSupported: props.methodsSupported,
                paymentFormLoaded: props.paymentFormLoaded,
                shippingContactChanged: props.shippingContactChanged,
                shippingOptionChanged: props.shippingOptionChanged,
                unsupportedBrowserDetected: props.unsupportedBrowserDetected,
            }
        };
        if (document.getElementById(props.formId + "-sq-apple-pay")) {
            config.applePay = { elementId: props.formId + "-sq-apple-pay" };
        }
        if (document.getElementById(props.formId + "-sq-google-pay")) {
            config.googlePay = { elementId: props.formId + "-sq-google-pay" };
        }
        if (document.getElementById(props.formId + "-sq-masterpass")) {
            config.masterpass = { elementId: props.formId + "-sq-masterpass" };
        }
        if (document.getElementById(props.formId + "-sq-card-number")) {
            config.cardNumber = { elementId: props.formId + "-sq-card-number", placeholder: '• • • •  • • • •  • • • •  • • • •' };
        }
        if (document.getElementById(props.formId + "-sq-cvv")) {
            config.cvv = { elementId: props.formId + "-sq-cvv", placeholder: 'CVV ' };
        }
        if (document.getElementById(props.formId + "-sq-postal-code")) {
            config.postalCode = { elementId: props.formId + "-sq-postal-code", placeholder: '12345' };
        }
        if (document.getElementById(props.formId + "-sq-expiration-date")) {
            config.expirationDate = { elementId: props.formId + "-sq-expiration-date", placeholder: 'MM/YY' };
        }
        return config;
    };
    SquarePaymentForm.prototype.render = function () {
        var _a = this.state, applePayState = _a.applePayState, googlePayState = _a.googlePayState, masterpassState = _a.masterpassState, errorMessage = _a.errorMessage;
        if (errorMessage) {
            return (React.createElement("div", { className: "sq-payment-form" },
                React.createElement("div", { className: "sq-error-message" }, errorMessage)));
        }
        var context = {
            applePayState: applePayState,
            googlePayState: googlePayState,
            masterpassState: masterpassState,
            formId: this.props.formId,
            onCreateNonce: this.createNonce
        };
        return (React.createElement(Context_1.ContextProvider, { value: context },
            React.createElement("div", { id: this.props.formId, className: "sq-payment-form" }, this.props.children)));
    };
    SquarePaymentForm.defaultProps = {
        formId: "sq-payment-form",
        inputStyles: [{
                fontSize: '16px',
                fontFamily: 'Helvetica Neue',
                padding: '16px',
                color: '#373F4A',
                backgroundColor: 'transparent',
                lineHeight: '24px',
                placeholderColor: '#CCC',
                _webkitFontSmoothing: 'antialiased',
                _mozOsxFontSmoothing: 'grayscale'
            }]
    };
    return SquarePaymentForm;
}(React.Component));
exports.default = SquarePaymentForm;
//# sourceMappingURL=SquarePaymentForm.js.map