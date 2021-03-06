const handleRegister = async (req, res, db, bcryptjs) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect')
    }
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
}
module.exports = {
    handleRegister: handleRegister
}