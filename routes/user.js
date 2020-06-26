import {Router} from 'express';
let router = Router();

router.post('/hello',async (req,res,next)=>{
    let uname = req.body.username;
    res.statusCode = 200;
    res.data = uname;
    next();
});

export default router;
