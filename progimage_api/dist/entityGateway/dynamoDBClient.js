"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBClient = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: process.env.AWS_DEFAULT_REGION });
const DynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
const DynamoDBClient = (tableName) => {
    return ({
        create: (model) => {
            return DynamoDB.put({
                TableName: tableName,
                Item: model
            }).promise();
        },
        read: (primaryKey) => {
            return DynamoDB.get({
                TableName: tableName,
                Key: {
                    primaryKey: primaryKey
                }
            }).promise();
        }
    });
};
exports.DynamoDBClient = DynamoDBClient;
