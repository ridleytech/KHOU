const serverless = require("serverless-http");
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
require("dotenv").config();

const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2" });
const storiesTable = process.env.STORIES_TABLE;

app.get("/getStories", (req, res, next) => {
  getStories(req, res);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

const getStories = async (req, res) => {
  const params = {
    TableName: storiesTable,
  };

  const scanResults = [];
  let items;
  do {
    items = await documentClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  scanResults.push({
    id: Math.floor(Math.random() * 1000),
    ad: "Placeholder ad",
  });

  res.send({
    stories: scanResults,
  });
};

module.exports.handler = serverless(app);
