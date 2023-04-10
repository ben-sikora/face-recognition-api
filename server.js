const express= require('express'); 
const bcrypt= require('bcrypt'); 
const cors= require('cors'); 
const saltRounds = 1;
const knex = require('knex');

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
        res.json(database.users[0]); 
    } else{
        res.status(400).json('ERROR'); }
    
}); 

app.post('/register', (req, res) =>{
    const {name, email, password} = req.body;
    const saltRounds= 10; 
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    databaseCon.transaction(trx => {
        trx.insert({
            hash: hash, 
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users').returning('*').insert({
                email: loginEmail[0].email, 
                name: name, 
                joined: new Date()
    
            }).then(user =>{
                res.json(user[0]);
            })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(error =>{
        res.status(400).json('unable to register');
    });
}); 

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