export const logRequest = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();
}

export const authenticate = (req, res, next)=>{
    const token = req.headers['authorization'];
    if(token){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}