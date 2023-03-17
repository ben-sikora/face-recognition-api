const express= require('express'); 
const bcrypt= require('bcrypt'); 
const cors= require('cors'); 
const saltRounds = 1;



const database= {
    users:[
        {id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date(), 
        }, 
        {id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'apples',
        entries: 0,
        joined: new Date(), 
        }, 
    ]
}
const app= express(); 

app.use(express.json());
app.use(cors()); 

app.get('/', (req, res) =>{
    res.json(database.users); 
}); 

app.post('/signin', (req, res) =>{
    /*
    let found= false; 
    database.users.forEach((user) => {
        if(bcrypt.compareSync(req.body.password, user.password)){
            found=true; 
            return res.json('Success');
        }
    }); 
    
    if(!found){
        console.log('HELLdddOOO'); 
        res.status(404).json('user not found22');
    }*/
    
    if(req.body.email=== database.users[0].email &&
        req.body.password=== database.users[0].password){
        res.json('success!'); 
    } else{
        res.status(400).json('ERROR'); }
    
}); 

app.post('/register', (req, res) =>{
    const {name, email, password} = req.body; 
    bcrypt.hash(password, saltRounds, function(err, hash) {
        database.users.push({
            id: '125',
            name: name,
            email: email,
            password: hash,
            entries: 0,
            joined: new Date(), 
        })
        res.json(database.users[database.users.length-1]); 
    });
}); 

app.get('/profile/:id', (req, res) => {
    let found= false; 
    database.users.forEach((user) => {
        if(req.params.id == user.id){
            found=true; 
            return res.json(user); 
        }
    }); 

    if(!found){
        res.status(404).json('user not found');
    }

}); 

app.put('/image', (req, res) =>{
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
    }
}); 

app.listen(3000, ()=>{
    console.log("Server is up!"); 
}); 