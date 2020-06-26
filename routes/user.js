import {Router} from 'express';
import {publishToQueue} from "../services/rabbit-mq-service";
let router = Router();

router.post('/hello',async (req,res,next)=>{
    let uname = req.body.username;
    res.statusCode = 200;
    res.data = uname;
    next();
});

router.post('/msg',async(req, res, next)=>{
    let { queueName, payload } = req.body;
    for (const el of Array.from(Array(50).keys())) {
        await publishToQueue(queueName, "Bonjour " + el);
    }
    res.statusCode = 200;
    res.data = {"message-sent":true};
    next();
})

export default router;
