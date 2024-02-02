/*
const express=require('express');
const app=express();
const  email="aryalong5@gmail.com";
const password="Arya@3559"; 
app.get('/:username/:title',function(req,res){
res.send(`hello there ${req.params.username} ${req.params.title}`);
});

app.get('/:user/:title',function(req,res){
    res.send(`hello there ${req.params.user} ${req.params.title}`);
    });
app.post('/data',function(req,res){
    res.send("this is sensitive data");   
});

app.get('/create', function(req,res){
    res.send("just showing data");
})
app.post('/profile/:password',function(req,res){
   res.send(`password of the user is : ${password}`)
});

app.post('/registration/',function(req,res){
    res.send("this is the user's pwrd");
});

app.get("/profile",function(req,res){
    res.send("this is the profile");
next();
});

app.get("/profile/:email",function(req,res){
    res.send(`${username} email_id : ${email}`);
});
app.listen(8000);
*/


const express = require('express');
const cors=require('cors');
const app = express();
const port = 4000;

app.use(express.json()); // Middleware to parse JSON requests
 
const Joi=require('joi');  

const corsOptions = {
  origin: 'http://example.com', // specify the allowed origin (or use a function for dynamic origins)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // respond with a 204 No Content status for preflight requests
  allowedHeaders: 'Content-Type,Authorization', // specify the allowed headers
  exposedHeaders: 'Content-Range,X-Content-Range', // specify the headers exposed to the client
};

app.use(cors(corsOptions));

// Your API routes go here
app.get('/', (req, res) => {
  res.json({ message: 'Hello, CORS is enabled!' });
});


const validateRequest = (schema) => {
    return (req, res, next) => {
      const dataToValidate = req.body;
  
      const result = schema.validate(dataToValidate, { abortEarly: false });
      if (result.error) {
        // Check if result.error.details is defined before mapping
        const errorDetails = result.error.details || [];
        const errorMessage = errorDetails.map(detail => detail.message).join(',');
  
        res.status(400).json({ error: errorMessage });
      } else {
        next();
      }
    };
  };
  
  const itemSchema = Joi.object({
    name: Joi.string().min(7).max(14).required(),
    phone_number: Joi.number().integer().min(1000000000).max(9999999999).error((errors) => {
      return new Error('Phone number must be a 10-digit number');
    }).required()
  });
  

 //app.use('/item', validateRequest(itemSchema));


 let  data=[
     
      { "name": "Arya_Biswas", "phone_number": 6297411185 },
      { "name": "Souvik_Biswas", "phone_number": 8172039044 },
      { "name": "Tapan_Biswas", "phone_number": 9153432308 },
      { "name": "Avik_Das", "phone_number": 898987890 }
    
 ];
app.get('/item',(req,res)=>{
    res.send(data);
//console.log(data);
})

 
 
 
app.post('/new_user', validateRequest(itemSchema), (req, res) => {
    const newItem = req.body;
  
    if (!newItem.phone_number || newItem.phone_number.toString().length !== 10) {
      return res.status(400).json({ error: 'Phone number must be a 10-digit number' });

    }
  
    data.push(newItem);
    res.status(201).json(newItem);
  });
 
app.delete('/item/:id',(req,res)=>{
const item_id=(req.params.id);
// res.send("ok")

data=data.filter((item)=> item.id!==item_id||(item.length===0 && item.constructor===Object));
console.log(data)
res.send({message:'item deleted successfully'})
})

 
  

app.put('/item/:id', (req, res) => {
    const itemId =req.params.id;
    const updatedItem = req.body;
    const index = data.find((item) => item.name === itemId);
  console.log(index);
    if (index === -1) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      data[index] = { ...data[index], ...updatedItem };
      res.json(data[index]);
    }
  });
 

app.delete('/items/removeDuplicates', (req, res) => {
    // Remove duplicate objects based on the 'id' property
    data = removeDuplicates(data, 'id');
  
    console.log(data);
    res.send({ message: 'Duplicate objects removed successfully' });
  });
  
 
  //  function to remove duplicates based on a property
  function removeDuplicates(arr, property) {
    const seen = new Set();
    return arr.filter((item) => {
      const value = item[property];
      if (seen.has(value)) {
        // Duplicate found, exclude from result
        return false;
      }
      seen.add(value);
      // Include the first occurrence of the property value
      return true;
    });
  }
  app.delete('/items/:id', (req, res) => {
    const item_id = parseInt(req.params.id);
  
    // Filter out the item with the specified ID
    data = data.filter((item) => item.id !== item_id);
  
    // Filter out empty objects from the data array
    data = data.filter((item) => !isEmptyObject(item));
  
    console.log(data);
    res.send({ message: 'item deleted successfully' });
  });
  
  // Helper function to check if an object is empty
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  //create jwt json web token 
  //jwt has header, payload, signature as a part of it 
  //head contains which security algo using for authentication purpose like sha256
  //payload contains user details as per requirement like name, id, phn 
  //lastly signature 
  //remember secretkey is the most important part of jwt  
  const jwt=require('jsonwebtoken');

  const secretKey = 'yoursecretkey';
  const payload ={
    sub:'123456789',
    name:'Arya Biswas',
    iat:Math.floor(Date.now()/1000),
  };

  const header={
    alg:'HS256',
    type:'JWT',
  }
  const token=jwt.sign(payload,secretKey,{header}); 
  console.log('Generated JWT:',token);
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});

 