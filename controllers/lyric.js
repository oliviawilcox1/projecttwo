// Import Dependencies
const express = require('express')
const Lyric = require('../models/lyric')
const fetch = require('node-fetch')
// Create router
const router = express.Router()
// const 
// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

router.post('/search', (req, res) => {
	const { username, userId, loggedIn } = req.session
	const artist = req.body.artist
	const song = req.body.song
	console.log('req.query', req.query)
	
	console.log('req.body', req.body.artist)
	console.log('req.body', req.body.song)
	
    const requestURL = `https://api.lyrics.ovh/v1/${artist}/${song}`
     fetch(requestURL)
        .then(responseData => {
            return responseData.json()
        })
        .then(jsonData => {
            console.log(jsonData)
            res.render('lyrics/show', { lyricData: jsonData, loggedIn, username, userId, artist, song} )
        })
        .catch(error => {
            res.send(error)
        })
})


// index ALL
router.get('/', (req, res) => {
	Lyric.find({})
		.then(lyrics => {
			// const username = req.session.username
			// const loggedIn = req.session.loggedIn
			//console.log('this is the username of the session ', req.session.username)
			const { username, userId, loggedIn, lyricData } = req.session
			console.log('this is the lyrics', lyrics)
			res.render('lyrics/index', { lyrics, username, loggedIn, userId, lyricData })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn, lyricData } = req.session
	//console.log(req.session)

	Lyric.find({ owner: userId})
		.then(lyrics => {
			// console.log(lyrics[0].lyric)
			res.render('lyrics/mine', { lyrics, username, loggedIn, lyricData })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// create -> POST route that actually calls the db and makes a new document
router.post('/mine', (req, res) => {
// req.body.ready = req.body.ready === 'on' ? true : false
console.log(req.body)
console.log('req.session', req.session.userId)
const { username, userId, loggedIn, lyricData } = req.session
	req.body.owner = req.session.userId
	Lyric.create(req.body)

		.then(lyrics => {
			console.log('this was returned from create', lyrics)
			// res.render('lyrics/mine', { username, loggedIn, lyricData, userId })
			res.redirect('/lyrics/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('lyrics/new', { username, loggedIn, userId })
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const lyricId = req.params.id
	const { username, userId, loggedIn, lyricData } = req.session
		console.log('this is req.body', req.body)
	Lyric.findById(lyricId)
		.then(lyrics => {
			res.render('lyrics/edit', { lyrics, username, userId, loggedIn, lyricData })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})
 
// update route
router.put('/:id', (req, res) => {
	const lyricId = req.params.id
	// req.body.ready = req.body.ready === 'on' ? true : false
	// const { username, userId, loggedIn } = req.session
	console.log('this is req.body', req.body)
	const { username, userId, loggedIn, lyricData } = req.session
	Lyric.findByIdAndUpdate(lyricId, req.body, { new: true })
		.then((lyrics) => {
			console.log('updated lyrics', lyrics)
			res.redirect(`/lyrics/${lyricId}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const lyricId = req.params.id
	const { username, userId, loggedIn, lyricData } = req.session
	Lyric.findById(lyricId)
		.then(lyrics => {
            //const { username, userId, loggedIn, lyricData } = req.session
			res.render('lyrics/song', { lyrics, username, loggedIn, userId, lyricData })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const lyricId = req.params.id
	Lyric.findByIdAndRemove(lyricId)
		.then(lyrics => {
			res.redirect('/lyrics/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
