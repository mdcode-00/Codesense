import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  repo: String,
  prNumber: Number,
  bugs: [String],
  security: [String],
  suggestions: [String]
},{
  timestamps: true
})

 const Review = mongoose.model("Review" , reviewSchema)
 export default Review;