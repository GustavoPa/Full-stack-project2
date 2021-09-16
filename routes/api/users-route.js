const router = require('express').Router();
const { Artwork, Profilepic } = require('../../models').default;
var Artist = require('../../models/artist');

// find all artists (GET api/artists)
router.get('/', (req, res) => {
    // access the Artist model and run findAll() method
    Artist.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbArtistData => res.json(dbArtistData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

// find artist by ID (GET api/artists/:id)
router.get('/:id', (req, res) => {
    Artist.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Profilepic,
                attributes: ['artist_id', '']
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

// create new artist (POST /api/artists)
router.post('/', (req, res) => {
    Artist.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        artist_type: req.body.artist_type,
        website: req.body.website,
        description: req.body.description,
        work_samples: req.body.work_samples,
        profile_pic: req.body.profile_pic,
        opento_commission: req.body.opento_commission
    })
        .then(dbArtistData => res.status(200).json(dbArtistData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login route (POST api/artists/login)
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbArtistData => {
        if (!dbArtistData) {
            res.status(400).json({ message: "No artist found with that email address." });
            return;
        }

        const validPassword = dbArtistData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password." });
            return;
        }

        res.json({ artist: dbArtistData, message: "You are now logged in." });
    });
});

// update artist info & pics (PUT api/artists/:id)
router.put('/:id', (req, res) => {
    Artist.update(req.body, {
        individualHooks: true,
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
});


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