const { When, Then, Given } = require('cucumber');
const config = require('../../../config.js');
const selenium = require('../../../app/selenium');
const page = require('../../master-page.js');
const expect = require('chai').expect;
const _ = require('lodash');
