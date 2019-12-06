const connector = require('../../local.js');
const pool = connector.getPool();

const viewContractsContractorSide = (req, res) => {
    const { customerid } = req.body;

    pool.query('SELECT * FROM Contract as c WHERE c.CustomerID=$1 ORDER BY c.ContractID ASC', [customerid], (error, results) => {
        if (error) {
            console.log(error);
        }
        // console.log(results.rows[0]);
        res.status(200).json(results.rows);
        res.end();
    });
};

module.exports = { viewContractsContractorSide };