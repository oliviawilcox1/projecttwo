//Import Dependencies

const express = require('express')
const mongoose = require('mongoose')



const Lyric = require('../models/lyric')

const router = express.Router()


///ROUTES

//only need two
//POST to create a comment
router.post('/:lyricId', (req,res) => {
    const lyricId = req.params.lyricId
    console.log('first comment body', req.body)
    //req.body.note gets string

    req.body.author = req.session.userId
    //we'll findn the lyric with lyricid
    Lyric.findById(lyricId)
    //then we'll adjust req.body to include an author
        .then(lyric => {
            console.log(lyric.comments)
            lyric.comments.push(req.body)
            return lyric.save()
        })
        .then(lyric => {
            res.redirect(`/lyrics/${lyric.id}`)
        })
    //authors id will be logged in user's id
    // then we'll send req.body to the comments array
    //save the lyric
    //redirect
    .catch(error => {
        console.log(error)
        res.send(error)
    })
    //or show error
})


//Delete to destroy one
//we'll use two params to make our life easier 
//first id of lyric
//then id of the comment sinnce we want to delete it
router.delete('/delete/:lyricId/:commId', (req,res)=> {
    //first we want to parse out our ids 
    const lyricId = req.params.lyricId
    const commId = req.params.commId
    //then well find the lyric
    Lyric.findById(lyricId) 
        .then(lyric => {
            const theComment = lyric.comments.id(commId)
            //only delete comment in if user is comment author 
            if(theComment.author == req.session.userId) {
            //then we'll delete comment
                theComment.remove()
            //save 
            return lyric.save()
        } else {
            return
        }
        })

        .then(lyric => {
            res.redirect(`/lyrics/${lyricId}`)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})




module.exports = router