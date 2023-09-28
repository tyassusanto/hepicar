const connection = require('../config/connection')

const searchName = ({ searchName, sort, order, limit, offset }) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM services';

        if (searchName) {
            query += ` WHERE name LIKE '%${searchName}%'`;
        }

        query += ` ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`;

        connection.query(query, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
}

const countServices = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS total FROM services'
        connection.query(query, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const addService = (insertDataService) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO services set ?'
        connection.query(query, insertDataService, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findService = (name) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM services WHERE name = ?`
        connection.query(query, name, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const deleteService = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM services WHERE id = ?';
        connection.query(query, id, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const updateService = (update, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE services SET ? WHERE id = ?'
      connection.query(query, [update, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  };

module.exports = {
    searchName,
    countServices,
    addService,
    findService,
    deleteService,
    updateService
}