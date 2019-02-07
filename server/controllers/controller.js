const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log('register endpoint hit', req.body)
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log({hash})
        let newUser = await db.user.register({username: username, password: hash})
        newUser = newUser[0];
        console.log({ newUser });
        console.log({ session });
        session.user = {...newUser};
        console.log({ session })
    },
    login: (req, res) => {
        console.log('login endpoint hit', req.body)
        const { username, password } = req.body
    }
}