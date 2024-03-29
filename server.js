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
      connectionString: process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false},
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});