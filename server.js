const express= require('express'); 
const bcrypt= require('bcrypt'); 
const cors= require('cors'); 
const saltRounds = 1;
const knex = require('knex');

const register= require('./controllers/register.js');
const signin= require('./controllers/signin.js');
const profile= require('./controllers/profile.js');
const image= require('./controllers/image.js');


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

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, databaseCon)}); 

app.put('/image', (req, res) => {image.handleImage(req, res, databaseCon)}); 
app.post('/imageurl', (req, res) => {image.handleapiCall(req, res)}); 

app.listen(3000, ()=>{
    console.log("Server is up!"); 
}); 