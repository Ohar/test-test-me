'use strict';

function moduleB () {
  return new Promise(
    resolve => {
      setTimeout(
        () => {
          const result = [
            {
              foo: 50,
              bar: 100,
              id : 1,
            },
            {
              foo: 123,
              bar: 50,
              id : 2,
            },
          ];

          console.log('moduleB', result);

          resolve(result);
        },
        3000
      )
    }
  );

}

module.exports = moduleB;
