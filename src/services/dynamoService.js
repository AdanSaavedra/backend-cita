const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = process.env.TABLE_NAME;

const saveUser = async (user) => {
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };

  await dynamoDB.put(params).promise();
};

const getUserByEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "email-index", // Asegúrate de tener un índice secundario en "email"
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  const result = await dynamoDB.query(params).promise();
  return result.Items[0];
};

module.exports = { saveUser, getUserByEmail };
