const clarifai= require('clarifai');


const app = new clarifai.App({
    apiKey: '208d9f9bcdcb488db579bd94cb05e194'
   })

const handleapiCall= (req, res) =>{
    app.models.predict({
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, req.body.input)
      .then(data=> {res.json(data)})
      .catch(err=>res.status(400).json('unable to connect to api'))

}

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
    handleapiCall
}