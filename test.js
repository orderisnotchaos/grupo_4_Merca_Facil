const User = require('./database/models/User');
const db = require('./database/models/index');

db.User.sync();
async function sinc (db){

    let ret = await db.User.sync({force : true});

    return ret;
}

sinc(db);