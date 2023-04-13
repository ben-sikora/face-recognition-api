const handleSignin= (req, res, databaseCon, bcrypt) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission');
    }
    databaseCon.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid= bcrypt.compareSync(password, data[0].hash)
            if(isValid){
                return databaseCon.select('*').from('users').where('email', '=', email).then(user =>{
                    res.json(user[0])
                }).catch(err => {res.status(400).json('unable to get user')});
            } else{
                res.status(400).json('wrong credtionals')
            }
        })
        .catch(err => {res.status(400).json('wrong credtionals')});
    
}

module.exports ={
    handleSignin: handleSignin,
}