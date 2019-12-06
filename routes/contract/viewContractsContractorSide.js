const connector = require('../../local.js');
const pool = connector.getPool();

const viewContractsContractorSide = (req, res) => {
    const { customerid } = req.body;

    pool.query('SELECT * FROM Contract WHERE CustomerID=$1 ORDER BY CustomerID ASC', [customerid], (error, results) => {
        if (error) {
            console.log(error);
        }
        // console.log(results.rows[0]);
        res.status(200).json(results.rows);
        res.end();
    });
};

module.exports = { viewContracts };