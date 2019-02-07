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
        console.log({ session });
        res.status(201).send(session.user);
    },
    login: async (req, res) => {
        console.log('login endpoint hit', req.body);
        const { username, password } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        let user = await db.user.login({username: username});
        if(!user){
            return res.sendStatus(418);
        }
        user = user[0];
        console.log({user});
        const foundUser = bcrypt.compareSync(password, user.password);
        console.log(foundUser);
        if(foundUser){
            delete user.password;
            console.log(user)
            session.user = user;
            res.status(200).send(session.user);
        } else {
            res.sendStatus(401)
        }
    }
}