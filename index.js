require("@babel/register");
require("@babel/polyfill");
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app.js');
