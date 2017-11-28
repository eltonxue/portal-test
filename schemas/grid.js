var express = require('express');
var mongoose = require('mongoose');

var gridSchema = mongoose.Schema({
  key: String,
  grid: { type: Array } // 2D Array of color codes
});

var GridModel = mongoose.model('grid', gridSchema);

module.exports = GridModel;
