const connector = require('../../../local.js');
const pool = connector.getPool();

const addGrain = (req, res) => {
  const { grainType, fieldID, storageID, grade, percentage, hasBad, hasBad2 } = req.body;
  let ID;

  pool.query('insert into product (Grade, FieldID) VALUES($1, $2) RETURNING productid', [grade, fieldID], (error, results) => {
    if (error) {
      console.log(error);
    }

    ID = results.rows[0].productid;

    pool.query('insert into grain (ProductID, BinID) VALUES($1, $2)', [ID, storageID], (error, results) => {
      if (error) {
        console.log(error);
      }

      if (grainType == 'wheat') {
        pool.query('insert into wheat (ProductID, ProteinPercentage, hasErgot) VALUES($1, $2, $3)', [ID, percentage, hasBad], (error, results) => {
          if (error) {
            console.log(error);
          }

          console.log('added wheat!');
          res.status(200);
          res.end();
        });
      } else if (grainType == 'canola') {
        pool.query('insert into canola (ProductID, GreensPercentage) VALUES($1, $2)', [ID, percentage, hasBad], (error, results) => {
          if (error) {
            console.log(error);
          }

          console.log('added canola!');
          res.status(200);
          res.end();
        });

      } else if (grainType == 'barley') {
        pool.query('insert into barley (ProductID, hasErgot, isHulled) VALUES($1, $2, $3)', [ID, hasBad, hasBad2], (error, results) => {
          if (error) {
            console.log(error);
          }

          console.log('added barley!');
          res.status(200);
          res.end();
        });
      } else {
        console.log('failed to add grain');
        res.status(500);
        res.end();
      }
    });
  });
};

module.exports = { addGrain };
