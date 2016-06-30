'use strict';

function moduleA () {
  return new Promise(
    resolve => {
      setTimeout(
        () => {
          const result = [
            {
              foo: 100,
              bar: 100,
              id : 1,
            },
            {
              foo: 125,
              bar: 42,
              id : 2,
            },
          ];

          console.log('moduleA', result);

          resolve(result);
        },
        3000
      )
    }
  );

}

module.exports = moduleA;
