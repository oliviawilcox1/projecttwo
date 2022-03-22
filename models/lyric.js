// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const commentSchema = require('./comment')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const lyricSchema = new Schema(
	{
		lyric: { type: String, required: true },
		song: { type: String, required: true },
		artist: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectId,

			ref: 'User',
		},
		comments: [commentSchema]
	},
	{ timestamps: true }
)

const Lyric = model('Lyric', lyricSchema)


/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Lyric
