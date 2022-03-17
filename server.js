import express from "express";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

const app = express()
const port = 8000

var verificationCode;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/receivecode', async(req, res)=>{
    const tuyaContext = new TuyaContext({
        baseUrl: 'https://openapi-ueaz.tuyaus.com',
        accessKey: '458qcavnbdhzh4ct574m',
        secretKey: '69a50ba912ed4154ae490046aee8c572',
      });

    verificationCode = Math.floor(Math.random() * 10000)
    if(verificationCode<1000){
        verificationCode=verificationCode+1000
    } 
    
    const  data  = await tuya.request({
    method: 'POST',
    path: '/v1.0/iot-03/messages/mails/actions/push',
    body: {
        "to_address": req.body.emailaddress,
        "reply_to_address": "test@example.com",
        "template_id": "MAIL_1624531323",
        "template_param": `{\"verificationCode\":\"${verificationCode}\"}`
        },
    })


})

app.post('/confirm', async(req, res)=>{
    if(req.body.verificationCode == verificationCode){
        res.send({
            confirm:true
        })    
    }
    else{
        res.send({
            confirm:false
        })  
    }
})


app.listen(port, () => {
    console.log(`Our App listening at http://localhost:${port}`)
})