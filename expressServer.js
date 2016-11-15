'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
var express = require('express');
var app = express();

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data){
    var pets = JSON.parse(data);
  res.send(pets);
  });
});

app.get('/pets/:index', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data){
    var pets = JSON.parse(data);
    var index = Number.parseInt(req.params.index);
    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      return res.sendStatus(404);
  }
  res.send(pets[index]);
  });
});

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data){
  var pets = JSON.parse(data);
  var pet = req.body;

  if (!pet) {
    return res.sendStatus(400);
  }

  pets.push(pet);

  res.send(pet);
  });
});

app.put('/pets/:index', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data){
  var pets = JSON.parse(data);
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  var pet = req.body;

  if (!pet) {
    return res.sendStatus(400);
  }

  pets[index] = pet;

  res.send(pet);
  });
});

app.delete('/pets/:index', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data){
  var pets = JSON.parse(data);
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  var pet = pets.splice(index, 1)[0];

  res.send(pet);
  });
});

// app.listen(app.get('port'), function() {
//   console.log('Listening on', app.get('port'));
// });

app.listen('8000', function() {
  console.log('Listening on port 8000');
});

module.exports = app;
