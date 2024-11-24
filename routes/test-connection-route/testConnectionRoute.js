const express = require('express');
const routes = express.Router();

const testDB = require('../../controller/test-db-connection/TestDbConnection');

routes.get('/db', testDB)

module.exports = routes;
