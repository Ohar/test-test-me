'use strict';

const moduleForTest = require('./module-for-test');

moduleForTest()
  .then(result => console.log('Index.js', result))
  .catch(error => console.error('Index.js', error));
