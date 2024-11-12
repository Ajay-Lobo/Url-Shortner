
import { getUser } from "../service/auth.js";
const restrictToLoggedinUserOnly= async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.redirect('/login');     
    }
    const user = getUser(token);
    if(!user){
        return res.redirect('/login');
    }
    req.user = user;

    next();
}

const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    
    const user = getUser(token);
    
    req.user = user;

    next();
}
export { restrictToLoggedinUserOnly,checkAuth };