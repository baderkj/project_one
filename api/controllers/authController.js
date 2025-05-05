const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt-nodejs');

module.exports={
    async singnIn(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }  
        const {email,password}=req.body;
         
        db.select('email','password_hash').from('users')
        .where('email','=',email)
        .then(data=>{
          
            const isValid=bcrypt.compareSync(password,data[0].password_hash);
    
            if(isValid)
            {
                return db.select('*').from('users')
                .where('email','=',email)
                .then(user=>{
                    
                    const token = jwt.sign({ userId: user[0].id}, process.env.JWT_SECRET, { expiresIn: '1h' });
                    
                    res.json({user:user[0],token:token});
                })
                .catch(err=>res.status(400).json('unable to get user',err));
            }
            else{
                res.status(400).json('Wrong Credentials')
            }
        }).catch(err=>res.status(400).json('Wrong Credentials'));
    
    }

};