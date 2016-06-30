'use strict';

const moduleA = require('./module-a'),
      moduleB = require('./module-b'),
      moduleC = require('./module-c');

function moduleForTest () {
  let promises = [],
      results   = {
        resultA: [],
        resultB: [],
      };

  promises.push(
    moduleA()
      .then(resultA => results.resultA = resultA),
    moduleB()
      .then(resultB => results.resultB = resultB)
  );

  return Promise
    .all(promises)
    .then(() => moduleC(results.resultA, results.resultB));
}

module.exports = moduleForTest;
