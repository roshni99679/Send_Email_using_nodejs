
// require("dotenv").config();
// const sgMail=require("@sendgrid/mail")
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg={
//     to:"roshnigupta85910@gmail.com",
//     from:"roshnigupta053@gmail.com",
//     subject:"Testing  Node Email Service",
//     text:"This is an email sent from node app"
// }

// sgMail.send(msg,function(err,info){
//     if(err){
//         console.log("Email not sent")
//     }else{
//         console.log("Email sent successfully")
//     }
// })

const express=require("express")
const path=require('path')
const app=express()

const sendEmail=require('./utils/sendEmail')


app.use(express.urlencoded({extended:false}));
app.use('/public',express.static(path.join(__dirname,'public')))
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.render('contact')
})
app.get('/sent',(req,res)=>{
    res.render('sent')
})
app.post('/sendemail',(req,res)=>{
    const {name,surname,email}=req.body;

    
    const to="roshnigupta85910@gmail.com"
    const from="roshnigupta053@gmail.com"
    const subject="New Contact Request"
    const output=`
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${name}</li>
        <li>Surname: ${surname}</li>
        <li>Email: ${email}</li>
        </ul>
    `

    sendEmail(to,from,subject,output)
    res.redirect('/sent')
})
const PORT=process.env.PORT||7000
app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`)
})