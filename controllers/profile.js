

const handleProfileGet= (req, res, databaseCon) => {
    const {id}= req.params; 
    databaseCon.select('*').from('users').where({
        id: id
    }).then(user =>{
        if(user.length != 0){
            res.json(user[0]);
        } else{
            res.status(400).json('Not Found');
        }
    })


}

module.exports={
    handleProfileGet: handleProfileGet,
}