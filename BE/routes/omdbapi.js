var express = require('express');
var router = express.Router();
var Show;
var _ = require('underscore');
var handleError;
var async = require('async');

function putOMDBAPIObjectToShow(req, res) {
    var query = { _id: req.params.imdbId };
    Show.update(query, { $set: { OMDBAPIObject:req.body }}, function(err, show) {
        if(err) {
            return res.status(500).render('500.jade', {title:'500: Internal Server Error', error: err});
        }

        return res.status(200).render('200.jade', {title:'Success', msg: 'Successful synct with OMDBAPI'});

    });
}

router.route('/:imdbId')
    .put(putOMDBAPIObjectToShow);

module.exports = function (mongoose) {
    console.log('Initializing omdbapi.js routing module');
    Show = mongoose.model('Show');
    return router;
};
