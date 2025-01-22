"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.SearchItemsRequest = void 0;
var types_1 = require("../http/types");
var CommonRequest_1 = require("./CommonRequest");
var SearchItemsRequest = /** @class */ (function (_super) {
    __extends(SearchItemsRequest, _super);
    function SearchItemsRequest(payload) {
        var commonRequestParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            commonRequestParams[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, commonRequestParams) || this;
        _this.payload = payload;
        _this.method = types_1.HttpMethod.POST;
        _this.path = '/paapi5/searchitems';
        _this.target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems';
        return _this;
    }
    SearchItemsRequest.prototype._buildPayload = function () {
        return __assign(__assign({}, _super.prototype._buildPayload.call(this)), this.payload);
    };
    return SearchItemsRequest;
}(CommonRequest_1.CommonRequest));
exports.SearchItemsRequest = SearchItemsRequest;
