const mongoose = require('mongoose');
const express=require('express');
const app = express();
const joi=require('joi');

mongoose.connect('mongodb://localhost:27017/wednesday', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
const userSchema = new mongoose.Schema({
   id: Number,
  name: String,
  age: Number,
  uid: String,
});

const Userdetails =mongoose.model("Userdetails", userSchema);

 
app.use(express.json());


app.post('/newitem', async (req, res) => {
  try {
    const { id, name, age, uid } = req.body;

    console.log("Received data:", id, name, age, uid);
 
    const newUser = await Userdetails.create({ id, name, age, uid });
 
    res.status(200).json({ user: newUser, message: " created successfully" });
  } catch (error) {
   
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

 
app.get('/allitems', async (req, res) => {
  try {
    
    const allItems = await Userdetails.find();
    console.log(allItems);
    res.status(200).json({ data: allItems });
    console.log(allItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = 5500;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
