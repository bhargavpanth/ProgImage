var AWS = require('aws-sdk')

const region = 'us-east-1'
const endpoint = 'http://localhost:8000'
const tableName = 'ProgImage'
AWS.config.update({ 
  region,
  endpoint,
  accessKeyId: 'test',
  secretAccessKey: 'test'
})
var client = new AWS.DynamoDB()
const DynamoDB = new AWS.DynamoDB.DocumentClient({ endpoint: new AWS.Endpoint(endpoint) })

var params = {
  TableName: tableName,
  KeySchema: [
    { AttributeName: 'fileSHA', KeyType: 'HASH' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'fileSHA', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
}

/**
 * In case we would like to support redundant files with different names, include secondary key in the schema
 * KeySchema: [ ..., { AttributeName: 'fileName', KeyType: 'RANGE' } ]
 * AttributeDefinitions: [ ..., { AttributeName: 'fileName', AttributeType: 'S' } ]
*/

client.createTable(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Table Created', data);
  }
})

// Note: Uncomment this if you would like to delete a table
// client.deleteTable({
//   TableName: tableName
// }, (err, data) => {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('Table Deleted', data);
//   }
// })
