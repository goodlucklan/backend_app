const handleSignIn = (db, bcryptjs) => async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(async data => {
            const isValid = await bcryptjs.compare(password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable'))
            }
        }).catch(err => console.log(err));
}
module.exports = {
    handleSignIn: handleSignIn
};