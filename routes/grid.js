var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var GridModel = require('../schemas/grid');

router.patch('/clear', function(req, res, next) {
  var data = req.body;
  var { key } = data;

  GridModel.findOne({ key }, function(err, grid) {
    if (err) {
      return res.send(err);
    }

    let newGrid = grid.grid;

    for (let r = 0; r < newGrid.length; ++r) {
      let row = [];
      for (let c = 0; c < newGrid[r].length; ++c) {
        newGrid[r][c] = '#fff';
      }
    }

    GridModel.findOneAndUpdate(
      { key },
      { grid: newGrid },
      { new: true },
      function(err, updatedGrid) {
        if (err) {
          return res.send(err);
        }
        res.json(updatedGrid);
      }
    );
  });
});

// PATCH SPECIFIED GRID (with given key)
router.patch('/:key', function(req, res, next) {
  var data = req.body;
  var { key, row, column, color } = data;

  GridModel.findOne({ key }, function(err, grid) {
    if (err) {
      return res.send(err);
    }
    let newGrid = grid.grid;
    newGrid[row][column] = color;

    GridModel.findOneAndUpdate(
      { key },
      { grid: newGrid },
      { new: true },
      function(err, updatedGrid) {
        if (err) {
          return res.send(err);
        }
        res.json(updatedGrid);
      }
    );
  });
});

module.exports = router;
