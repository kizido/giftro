"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignHelper = void 0;
/* eslint-disable import/prefer-default-export */
var crypto_1 = __importDefault(require("crypto"));
var SignHelper = /** @class */ (function () {
    function SignHelper(accessKey, secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }
    SignHelper.prototype.getAuthorizationHeader = function (path, method, payload, headers, region, service, timestamp) {
        var signedHeaders = this._createSignedHeaders(headers);
        var canonicalRequest = this._createCanonicalRequest(path, method, payload, headers);
        var stringToSign = this._createStringToSign(timestamp, region, service, canonicalRequest);
        var signature = this._createSignature(this.secretKey, timestamp, region, service, stringToSign);
        var authorizationHeader = this._createAuthorizationHeaders(timestamp, this.accessKey, region, service, signedHeaders, signature);
        return authorizationHeader;
    };
    SignHelper.prototype.toAmzDate = function (timestamp) {
        return new Date(timestamp).toISOString().replace(/[:-]|\.\d{3}/g, '');
    };
    SignHelper.prototype._toTime = function (timestamp) {
        return new Date(timestamp).toISOString().replace(/[:-]|\.\d{3}/g, '');
    };
    SignHelper.prototype._toDate = function (timestamp) {
        return this._toTime(timestamp).substring(0, 8);
    };
    SignHelper.prototype._createAuthorizationHeaders = function (timestamp, accessKey, region, service, signedHeaders, signature) {
        var credentialScope = this._createCredentialScope(timestamp, region, service);
        return "AWS4-HMAC-SHA256 Credential=" + accessKey + "/" + credentialScope + ", SignedHeaders=" + signedHeaders + ", Signature=" + signature;
    };
    SignHelper.prototype._createSignedHeaders = function (headers) {
        return Object.keys(headers)
            .sort()
            .map(function (name) { return name.toLowerCase().trim(); })
            .join(';');
    };
    SignHelper.prototype._createCanonicalRequest = function (path, method, payload, headers) {
        var jsonPayload = JSON.stringify(payload);
        return [
            method.toUpperCase(),
            path,
            '',
            this._createCanonicalHeaders(headers),
            this._createSignedHeaders(headers),
            crypto_1.default.createHash('sha256').update(jsonPayload, 'utf8').digest('hex'),
        ].join('\n');
    };
    SignHelper.prototype._createCanonicalHeaders = function (headers) {
        return Object.keys(headers)
            .sort()
            .map(function (key) { return key.toLowerCase().trim() + ":" + headers[key].toString().trim() + "\n"; })
            .join('');
    };
    SignHelper.prototype._createStringToSign = function (timestamp, region, service, request) {
        return [
            'AWS4-HMAC-SHA256',
            this._toTime(timestamp),
            this._createCredentialScope(timestamp, region, service),
            crypto_1.default.createHash('sha256').update(request, 'utf8').digest('hex'),
        ].join('\n');
    };
    SignHelper.prototype._createCredentialScope = function (timestamp, region, service) {
        return [this._toDate(timestamp), region, service, 'aws4_request'].join('/');
    };
    SignHelper.prototype._createSignature = function (secret, timestamp, region, service, stringToSign) {
        var signature = crypto_1.default
            .createHmac('sha256', Buffer.from("AWS4" + secret, 'utf-8'))
            .update(this._toDate(timestamp));
        signature = crypto_1.default.createHmac('sha256', signature.digest()).update(region);
        signature = crypto_1.default.createHmac('sha256', signature.digest()).update(service);
        signature = crypto_1.default.createHmac('sha256', signature.digest()).update('aws4_request');
        signature = crypto_1.default.createHmac('sha256', signature.digest()).update(stringToSign);
        return signature.digest('hex');
    };
    return SignHelper;
}());
exports.SignHelper = SignHelper;
