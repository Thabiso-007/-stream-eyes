const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const testConnectionRoute = require('./routes/test-connection-route/testConnectionRoute');
const authRoute = require('./routes/auth-route/authRoute');

const app = express();
dotenv.config();

app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true}));

app.use(cookieParser()); 
app.use(cors());
app.use(morgan('tiny'));

app.use('/api/v1/', testConnectionRoute);
app.use('/api/v1/', authRoute);

const PORT = process.env.PORT || 8145

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})