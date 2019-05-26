const express = require('express');
const jwt     = require('jsonwebtoken');
const PORT = 5000;

const app = express();
app.get('/api',(req, res) => {
    res.json({ 
        message:"Welcome to the API !!"
    })
});

app.post('/api/post', verifyToken, (req, res) => { 
    // verify a token symmetric 
    jwt.verify(req.token, 'shhhhh', (err, authData) => {
        if(err){
            res.status(403).json({
                message: err
            });
        } else {
            res.json({
                message:'Post created',
                authData
            })
        }
    });
    res.json({ 
        message:"Post created succesfully!!"
    })
});

app.post('/api/login',(req, res) => {
    const user = {
        id:1,
        username:'shail',
        email:'shaile.martin@gmail.com'
    }
    jwt.sign({ user}, 'shhhhh', { expiresIn: '30s' }, (err, token) =>{
        res.json({
            token
        });
    });
});
//Token Format => Authorization : Bearer <accesstoken>
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function verifyToken(req, res, next){
   // Get Auth header value 
   const baseHeader = req.headers['authorization']; 
   if(typeof baseHeader !== 'undefined'){
        const bearer = baseHeader.split(" ");
        const bearertoken = bearer[1]; 
        req.token = bearertoken;
        return next();
   } else { 
       res.status(403).json({
            message: 'Unauthorized access!'
       });
   }

} 

app.listen(PORT, ()=> console.log(`Sever startted on port ${PORT}`))