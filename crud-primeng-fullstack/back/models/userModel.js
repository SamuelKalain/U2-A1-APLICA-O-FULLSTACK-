const db = require('../db/database')
const bcrypt = require('bcryptjs')

function findUserByUsername(username, callback){
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row)=>{
        callback(err,row)
    })
}

function createUser(username, hashedPassword, callback) {
    db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        function (err) {
            if (err) return callback(err);

            callback(null, {
                id: this.lastID,
                username
            });
        }
    );
}



module.exports = {findUserByUsername, createUser}