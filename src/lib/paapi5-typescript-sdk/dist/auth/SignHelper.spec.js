"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../http/types");
var CommonRequest_1 = require("../requests/CommonRequest");
var SignHelper_1 = require("./SignHelper");
describe('SignHelper', function () {
    var timestamp = 1609426121130;
    var path = '/paapi5/getbrowsenodes';
    var method = types_1.HttpMethod.POST;
    var service = 'ProductAdvertisingAPI';
    var accessKey = 'accessKey';
    var secretKey = 'secretKey';
    var signHelper = new SignHelper_1.SignHelper(accessKey, secretKey);
    var headers = {
        host: 'webservices.amazon.it',
        'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetBrowseNodes',
        'x-amz-date': signHelper.toAmzDate(timestamp),
        'content-encoding': 'amz-1.0',
        'content-type': 'application/json; charset=utf-8',
    };
    it('should create a valid authorization header', function () {
        var expectedHeader = 'AWS4-HMAC-SHA256 Credential=accessKey/20201231/eu-west-1/ProductAdvertisingAPI/aws4_request, SignedHeaders=content-encoding;content-type;host;x-amz-date;x-amz-target, Signature=ba741bfb87f9bf3b9b343d72e4f76dc9f169f2e86a047423d783a2169f03c595';
        var header = signHelper.getAuthorizationHeader(path, method, {}, headers, CommonRequest_1.Region.ITALY, service, timestamp);
        expect(header).toEqual(expectedHeader);
    });
});
