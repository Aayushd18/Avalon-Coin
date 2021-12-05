import express from 'express';
import cors from 'cors'
import { print_cipher } from './register.mjs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = '0.0.0.0';
const port = 3001;
let registeredUsers = [];

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/:userId',async (request, response) => {
  let user_id = request.params.userId;
  let encrypt = await print_cipher(user_id)
  registeredUsers.map((user, index) =>  {
    let code = (user === encrypt)
    if(code) {
      let value = code;
      code = undefined;
      console.log(value);
      response.json({code: value}); 
    } 
  })
  
})


app.get('/register/:userId', async (request, response) => {
  let user_id = request.params.userId;
  let encrypt = await print_cipher(user_id);
  registeredUsers.push(encrypt);
  console.log(registeredUsers);
  return response.send({code: true});
})

app.listen(port, hostname, function() {
  console.log(`Nodejs server running at http://localhost:${port}/`);
})