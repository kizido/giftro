"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRequest = exports.Region = exports.Host = exports.PartnerType = void 0;
var axios_1 = __importDefault(require("axios"));
var SignHelper_1 = require("../auth/SignHelper");
var types_1 = require("../http/types");
var PartnerType;
(function (PartnerType) {
    PartnerType["ASSOCIATES"] = "Associates";
})(PartnerType = exports.PartnerType || (exports.PartnerType = {}));
var Host;
(function (Host) {
    Host["AUSTRALIA"] = "webservices.amazon.com.au";
    Host["BRAZIL"] = "webservices.amazon.com.br";
    Host["CANADA"] = "webservices.amazon.ca";
    Host["FRANCE"] = "webservices.amazon.fr";
    Host["GERMANY"] = "webservices.amazon.de";
    Host["INDIA"] = "webservices.amazon.in";
    Host["ITALY"] = "webservices.amazon.it";
    Host["JAPAN"] = "webservices.amazon.co.jp";
    Host["MEXICO"] = "webservices.amazon.com.mx";
    Host["NETHERLANDS"] = "webservices.amazon.nl";
    Host["SINGAPORE"] = "webservices.amazon.sg";
    Host["SAUDI_ARABIA"] = "webservices.amazon.sa";
    Host["SPAIN"] = "webservices.amazon.es";
    Host["SWEDEN"] = "webservices.amazon.se";
    Host["TURKEY"] = "webservices.amazon.com.tr";
    Host["UNITED_ARAB_EMIRATES"] = "webservices.amazon.ae";
    Host["UNITED_KINGDOM"] = "webservices.amazon.co.uk";
    Host["UNITED_STATES"] = "webservices.amazon.com";
})(Host = exports.Host || (exports.Host = {}));
var Region;
(function (Region) {
    Region["AUSTRALIA"] = "us-west-2";
    Region["BRAZIL"] = "us-east-1";
    Region["CANADA"] = "us-east-1";
    Region["FRANCE"] = "eu-west-1";
    Region["GERMANY"] = "eu-west-1";
    Region["INDIA"] = "eu-west-1";
    Region["ITALY"] = "eu-west-1";
    Region["JAPAN"] = "us-west-2";
    Region["MEXICO"] = "us-east-1";
    Region["NETHERLANDS"] = "eu-west-1";
    Region["SINGAPORE"] = "us-west-2";
    Region["SAUDI_ARABIA"] = "eu-west-1";
    Region["SPAIN"] = "eu-west-1";
    Region["SWEDEN"] = "eu-west-1";
    Region["TURKEY"] = "eu-west-1";
    Region["UNITED_ARAB_EMIRATES"] = "eu-west-1";
    Region["UNITED_KINGDOM"] = "eu-west-1";
    Region["UNITED_STATES"] = "us-east-1";
})(Region = exports.Region || (exports.Region = {}));
var CommonRequest = /** @class */ (function () {
    function CommonRequest(partnerTag, partnerType, accessKey, secretKey, host, region) {
        this.partnerTag = partnerTag;
        this.partnerType = partnerType;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.host = host;
        this.region = region;
        this.service = 'ProductAdvertisingAPI';
        this.method = types_1.HttpMethod.GET;
        this.path = '/paapi5';
        this.target = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1';
        this._signHelper = new SignHelper_1.SignHelper(accessKey, secretKey);
    }
    CommonRequest.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, payload, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = Date.now();
                        payload = this._buildPayload();
                        return [4 /*yield*/, axios_1.default(this._buildUrl(), {
                                method: this.method,
                                headers: this._buildHeaders(timestamp, payload),
                                data: payload,
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    CommonRequest.prototype._buildUrl = function () {
        return "https://" + this.host + this.path;
    };
    CommonRequest.prototype._buildHeaders = function (timestamp, payload) {
        var commonHeaders = {
            'content-encoding': 'amz-1.0',
            'content-type': 'application/json; charset=utf-8',
            host: this.host,
            'x-amz-target': this.target,
            'x-amz-date': this._signHelper.toAmzDate(timestamp),
        };
        var authorization = this._signHelper.getAuthorizationHeader(this.path, this.method, payload, commonHeaders, this.region, this.service, timestamp);
        return __assign(__assign({}, commonHeaders), { authorization: authorization });
    };
    CommonRequest.prototype._buildPayload = function () {
        return {
            PartnerTag: this.partnerTag,
            PartnerType: this.partnerType,
        };
    };
    return CommonRequest;
}());
exports.CommonRequest = CommonRequest;
