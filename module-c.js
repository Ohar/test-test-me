'use strict';

function moduleC (resultA, resultB) {
  return new Promise(
    resolve => {
      setTimeout(
        () => {
          
          let resultC = [];

          resultA.forEach(eA => {
            let eB = resultB.find(eB => eA.id === eB.id);

            if (eB) {
              let checkingProps = [
                    'foo',
                    'bar',
                  ],
                  changedProps = checkingProps.filter(prop => eA[prop] !== eB[prop]);

              if (changedProps.length) {
                let changes = {
                  eA: {},
                  eB: {},
                };

                changedProps.forEach(prop => {
                  changes.eA[prop] = eA[prop];
                  changes.eB[prop] = eB[prop];
                });

                resultC.push(changes);
              }

            }
            
          });
          
          console.log('moduleC', resultC);
          
          resolve(resultC);
        },
        3000
      )
    }
  );

}

module.exports = moduleC;
