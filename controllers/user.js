import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../service/auth.js';
const handleUserSignUp = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.create({name,email,password});
       
        res.render('index');
    }
    catch(err){
        console.log(err)
    }
}

const handleUserLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User .findOne({email});
        if(user && (await user.matchPassword(password))){
            const token = uuidv4();
            setUser(token,user);
            res.cookie('token',token);
            res.render('index');
        }
        else{
            res.status(401).json({message:'Invalid email or password'});
        }
    }
    catch(err){
        console.log(err)
    }
}


export {handleUserSignUp,handleUserLogin};