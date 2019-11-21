const express = require('express');
const bodyParser = require("body-parser");
const port = 4209;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a scheme for items in the store
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  url: String,
});

// Create a model for items in the store
const Item = mongoose.model('Item', itemSchema);

// Get a list of all of the items in the store
app.get('/api/items', async(req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// // Upload a photo. Uses the multer middleware for the upload and then returns
// // the path where the photo is stored in the file system.
// app.post('/api/photos', upload.single('photo'), async(req, res) => {
//   // Just a safety check
//   if (!req.file) {
//     return res.sendStatus(400);
//   }
//   res.send({
//     path: "/images/" + req.file.filename,
//   });
// });

// Create a new item in the store
app.post('/api/items', async(req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    url: req.body.url,
  });
  try {
    await item.save();
    res.send(item);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// PUT edit an item to increase the quantity
app.put('/api/items/:id', async(req, res) => {
  try {
    let editItem = {
      _id: req.params.id,
    };
    let newQuantity = req.body.quantity;
    // let newTitle = req.body.title;
    // let newDesc = req.body.description;

    console.log("Editing item with id:");
    console.log(editItem);

    let newItem = await Item.findOne(editItem);
    newItem.quantity = newQuantity;
    newItem.save();
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// DELETE a museum item
app.delete('/api/items/:id', async(req, res) => {
  try {
    let item = {
      _id: req.params.id,
    };

    // let fakeItem = {
    //   _id: '5dcf147ebb141f6c795bc1e1',
    // };
    // console.log(fakeItem._id); // deleting worked, so I just need to get the param

    console.log("Deleting item with id:");
    console.log(item._id);
    await Item.deleteOne(item);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log('Server listening on port ' + port + '!'));
