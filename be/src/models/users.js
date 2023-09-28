const connection = require('../config/connection')

const addUser = (insertDataUser) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users set ?", insertDataUser, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const findEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`
        connection.query(query, email, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

module.exports ={
    addUser,
    findEmail
}