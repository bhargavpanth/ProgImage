import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const dynamodbClient = new DynamoDBClient({
    region: process.env.REGION
})

const marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: false
}

const unmarshallOptions = {
    wrapNumbers: false
}

const translateConfig = { marshallOptions, unmarshallOptions }

const docClient = DynamoDBDocumentClient.from(dynamodbClient, translateConfig)

const params = {
    TableName: "ProgImage",
    Key: {
        primaryKey: "fileSHA",
        sortKey: "fileName"
    }
}


