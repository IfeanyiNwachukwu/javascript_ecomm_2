const exp = require('constants');
const express = require('express');

const app = express();
app.use(express.urlencoded({extended:true}));  //Global Middleware

app.get('/',(req,res) => {
    res.send(` <div>
    <form action="" method="POST">
        <input  type="email" name="email" id="" placeholder="email">
        <input type="password" name="password" id="" placeholder="password">
        <input type="password" name="passwordConfirmation" id="" placeholder="Confirm password">
        <button>Register</button>
    </form>
</div>`);
})
// ParseData = (req,res,next) => {

//     if(req.method === 'POST'){
//         req.on('data', data => {
//             const raw = data.toString('utf8');
//             const parsed = raw.split('&');
//             console.log(parsed);
//             const formData = {};
//             for (let parse of parsed) {
//                 [key, value] = parse.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         });
//     }
//     else{
//         next();
//     }
    
// }
app.post('/', (req,res) => {
    console.log(req.body);
    res.send('Account created');
})






app.listen(3003,()=>{
    console.log('Server is listening');
})


