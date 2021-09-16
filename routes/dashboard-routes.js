const routet = require('express').Router();
const sequelize = require('../config/connection');
const { Artist, Artwork, Profilepic } = require('../models').default;
const router = require('./api/artist-routes');

// get artist info & pics by ID
router.get('/:id', (req, res) => {
    Artist.findOne({
        attributes: { exclude: ['password'] },
        where: {
            artist_id: req.params.artist_id,
            username: req.params.username,
            email: req.params.email,
            password: req.params.password,
            location: req.params.location,
            artist_type: req.params.artist_type,
            website: req.params.website,
            description: req.params.description,
            work_samples: req.params.work_samples,
            profile_pic: req.params.profile_pic,
            opento_commission: req.params.opento_commission
        },
        include: [
            {
                model: Profilepic,
                attributes: ['artist_id', 'profile_pic']
            },
            {
                model: Artwork,
                attributes: ['artist_id', 'work_samples']
            }
        ]
    })
        .then(dbArtistData => {
            if (!dbArtistData) {
                res.status(404).json({ message: 'No artist found with this id.' });
                return;
            }
            res.json(dbArtistData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update artist info & pics
router.put('/:id', (req, res) => {
    Artist.update(req.body, {
        where: {
            artist_id: req.params.artist_id,
            username: req.params.username,
            email: req.params.email,
            password: req.params.password,
            location: req.params.location,
            artist_type: req.params.artist_type,
            website: req.params.website,
            description: req.params.description,
            work_samples: req.params.work_samples,
            profile_pic: req.params.profile_pic,
            opento_commission: req.params.opento_commission
        }
    })
        .then(dbArtistData => {
            if (!dbArtistData[0]) {
                res.status(404).json({ message: 'No artist found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

// delete account (DELETE /api/artists/id)
router.delete('/:id', (req, res) => {
    Artist.destroy({
        where: {
            artist_id: req.params.artist_id,
            username: req.params.username,
            email: req.params.email,
            password: req.params.password,
            location: req.params.location,
            artist_type: req.params.artist_type,
            website: req.params.website,
            description: req.params.description,
            work_samples: req.params.work_samples,
            profile_pic: req.params.profile_pic,
            opento_commission: req.params.opento_commission
        }
    })
        .then(dbArtistData => {
            if (!dbArtistData) {
                res.status(404).json({ message: 'No artist found with this id.' });
                return;
            }
            res.json(dbArtistData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;