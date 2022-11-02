import AWS from 'aws-sdk'

AWS.config.update({ region: process.env.AWS_DEFAULT_REGION })

const dynamoEndpoint = `${process.env.DB_IP}:${process.env.DB_PORT}`

const DynamoDB = new AWS.DynamoDB.DocumentClient({ endpoint: new AWS.Endpoint(dynamoEndpoint) })

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
