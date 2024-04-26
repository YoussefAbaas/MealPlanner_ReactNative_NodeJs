const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const cors = require('cors');
const Menu = require('./models/menu');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect('mongodb+srv://youssef:youssef@cluster0.1aw2jkc.mongodb.net/')
  .then(() => {
    console.log('connected to db');
  })
  .catch(err => {
    console.log('error in db connection ', err);
  });

app.listen(port, () => {
  console.log('listen at port', port);
});

app.post('/menu/addDish', async (req, res) => {
  try {
    const {date, name, type, mealType} = req.body;
    let menuItem = await Menu.findOne({date});
    if (!menuItem) {
      menuItem = new Menu({date});
    }
    menuItem.items.push({name, type, mealType});
    await menuItem.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.get('/menu/all', async (req, res) => {
  try {
    const allMenuData = await Menu.find();
    if (!allMenuData || allMenuData.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(allMenuData);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.post('/copyItems', async (req, res) => {
  try {
    const {prevDate, nextDate} = req.body;
    const prevMenu = await Menu.findOne({date: prevDate});
    if (!prevMenu) {
      return res.status(500).json({message: 'previous date not found'});
    }
    let nextMenu = await Menu.findOne({date: nextDate});
    if (!nextMenu) {
      nextMenu = new Menu({date: nextDate, items: prevMenu.items});
    } else {
      nextMenu.items = prevMenu.items;
    }
    await nextMenu.save();
    res.status(200).json({message: 'items copied'});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.delete('/deleteItems/:date', async (req, res) => {
  const dateToDelete = req.params.date;
  try {
    const deletedItem = await Menu.findOneAndDelete({date: dateToDelete});
    if (deletedItem) {
      res.status(200).json({message: 'Item has been deleted'});
    } else {
      res.status(404).json({message: 'error deleting the item'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Internal server error'});
  }
});
