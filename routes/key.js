var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var GridModel = require('../schemas/grid');

/* GET home page. */
router.get('/:key', function(req, res, next) {
  let defaultGrid = [];
  let rows = 10;
  let columns = 10;

  GridModel.findOne({ key: req.params.key }, function(err, grid) {
    if (err) {
      return res.send(err);
    }

    if (!grid) {
      for (let r = 0; r < rows; ++r) {
        let row = [];
        for (let c = 0; c < columns; ++c) {
          row.push('#fff');
        }
        defaultGrid.push(row);
      }

      var newGrid = new GridModel({
        key: req.params.key,
        grid: defaultGrid
      });

      newGrid.save(function(err, newGrid) {
        if (err) {
          return res.send(err);
        }
        console.log(newGrid);
        res.render('grid', { grid: newGrid });
      });
    } else {
      res.render('grid', { grid });
    }
  });
});

module.exports = router;
