const express= require('express'); 
const bcrypt= require('bcrypt'); 
const cors= require('cors'); 
const saltRounds = 1;
const knex = require('knex');

const register= require('./controllers/register.js');
const signin= require('./controllers/signin.js');

const databaseCon= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'bensikora',
      password : '',
      database : 'smart-brain'
    }
  });

databaseCon.select('*').from('users').then(data =>{
    console.log(data);
});



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

app.post('/signin', (req, res) => {signin.handleSignin(req, res, databaseCon, bcrypt)}); 

app.post('/register', (req, res) => {register.handleRegister(req, res, databaseCon, bcrypt)}); 

app.get('/profile/:id', (req, res) => {
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


}); 

app.put('/image', (req, res) =>{
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
}); 

app.listen(3000, ()=>{
    console.log("Server is up!"); 
}); 