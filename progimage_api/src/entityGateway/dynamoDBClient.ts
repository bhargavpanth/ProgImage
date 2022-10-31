import AWS from 'aws-sdk'

AWS.config.update({ region: process.env.AWS_DEFAULT_REGION })

const DynamoDB = new AWS.DynamoDB.DocumentClient()

export const DynamoDBClient = (tableName: string) => {
    return ({
        create: (model) => {
            return DynamoDB.put({
                TableName: tableName,
                Item: model
            }).promise()
        },
        read: (primaryKey) => {
            return DynamoDB.get({
                TableName: tableName,
                Key: {
                    primaryKey: primaryKey
                }
            }).promise()
        }
    })
}
