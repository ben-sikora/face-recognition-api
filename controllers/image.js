const handleImage= (req, res, databaseCon) =>{
    const{id} = req.body; 
    databaseCon('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries').then(entries =>{
        res.json(entries[0].entries);
    }).catch(err =>{
        res.status(400).json('unable to get count');
    })
    /*
    let found= false; 
    database.users.forEach((user) => {
        if(req.body.id == user.id){
            found=true; 
            user.entries++; 
            return res.json(user.entries); 
        }
    }); 

    if(!found){
        res.status(404).json('user not found');
    }*/
}

module.exports={
    handleImage: handleImage,
}