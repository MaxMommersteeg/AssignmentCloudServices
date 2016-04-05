var express = require('express');
var router = express.Router();
var Show;
var _ = require('underscore');
var handleError;
var async = require('async');

function getAllShows(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Show.find({}, '-episodes', function(err, shows) {
        res.status(200).send(shows);
    });
}

function getShowsPaginate(req, res) {
      res.setHeader('Content-Type', 'application/json');
      Show.find({}, '-episodes', function(err, shows) {
          if(!shows) {
              res.status(404).send({ msg: "Could not find shows based on paginate"} );
          }
          res.status(200).send(shows);
        }).sort( { title: 1 } ).skip((req.params.page - 1)*req.params.items).limit(req.params.items)
}

function getShow(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Show.findOne({ _id : req.params.imdbId }, '-episodes', function(err, show) {
        if(err) {
            return res.status(500).send({ error: err });
        }
        if(!show) {
            return res.status(404).send({ msg: 'imdbId does not exist'});
        }

        res.status(200).send(show);
    });
}

function getEpisodesOfShow(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Show.findOne({ _id : req.params.imdbId }, 'episodes', function(err, show) {
        if(err) {
            return res.status(500).send({ error: err });
        }

        if(!show) {
            return res.status(404).send({ msg: 'imdbId does not exist'});
        }
        res.status(200).send(show);

    });
}

function getParticularEpisode(req, res) {
    Show.findOne({_id: req.params.imdbId}, 'episodes', function (err, show) {
        if (err) {
            return res.status(500).send({error: err});
        }

        if (!show) {
            return res.status(404).send({msg: 'imdbId does not exist'});
        }
        var episode = {};
        var seasonNumber = parseInt(req.query.season);
        var episodeNumber = parseInt(req.query.episode);
        var episodeExists = false;
        show.episodes.forEach(function (t) {
            if (t.season == seasonNumber && t.episode == episodeNumber) {
                episodeExists = true;
                episode = t;
                return res.status(200).send(episode);
            }
        });

        if (!episodeExists) {
            return res.status(404).send({msg: 'Episode does not exist'});
        }

    });
}


function addShow(req, res) {
    res.setHeader('Content-Type', 'application/html');
    var newShow = new Show(req.body);
    newShow.save(function(err, show) {
        if (err) {
            return res.status(500).render('500.jade', {title:'500: Internal Server Error', error: err});
        }

        return res.status(200).render('200.jade', {title:'Success', msg: 'Successful created new show: ' + show.title });

    });
}

function updateShow(req, res) {
    res.setHeader('Content-Type', 'application/html');
    var query = { _id: req.params.imdbId };
    Show.findOneAndUpdate(query, {$set:{year:req.body.year, num_seasons:req.body.num_seasons, network:req.body.network, synopsis:req.body.synopsis}}, function(err, show) {
        if(err) {
            //TODO: Send err page
            return res.status(500).render('500.jade', {title:'500: Internal Server Error', error: err});
        }
        if(!show) {
            return res.status(404).render('404.jade', {title:'404: Not found', msg: 'Could not find show'});
        }

        return res.status(200).render('200.jade', {title:'Success', msg: 'Successfully saved show: ' + show.title});
    });
}

function deleteShow(req, res) {
    res.setHeader('Content-Type', 'application/html');
    Show.findByIdAndRemove(req.params.imdbId, function(err, show) {
        if(err) {
            return res.status(500).render('500.jade', {title:'500: Internal Server Error', error: err});
        }

        if(!show) {
            return res.status(404).render('404.jade', {title:'404: Not found', msg: 'Could not find show'});
        }

        return res.status(200).render('200.jade', {title:'Success', msg: 'Successfully deleted show: ' + show.title});

    });
}

// routings
router.route('/')
    .get(getAllShows);

router.route('/paginate/:items/:page')
    .get(getShowsPaginate);

router.route('/:imdbId')
    .get(getShow);

router.route('/:imdbId/episodes')
    .get(getEpisodesOfShow);

router.route('/:imdbId/episode')
    .get(getParticularEpisode);

router.route('/')
    .post(addShow);

router.route('/:imdbId')
    .put(updateShow);

router.route('/:imdbId')
    .delete(deleteShow);

module.exports = function (mongoose) {
  console.log('Initializing shows routing module');
    Show = mongoose.model('Show');
  return router;
};
