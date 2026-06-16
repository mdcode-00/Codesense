import express from 'express'
import getPRDDiff from '../services/githupService.js'
import reviewCode from '../services/cloudeService.js'
import Review from '../Model/Review.js'

const route = express.Router();

route.post('/', async(req,res)=> {
  const {repo , prNumber , token} = req.body;

  if(!repo || !prNumber || !token) return res.status(400).json({ error: "repo, prNumber and token are required"});

  try {
    // step 1: get the diff from GitHub 
    const diffText = await getPRDDiff(token, repo , prNumber);

    // Step 2: sent diff to cloud, get review 
    const review = await reviewCode(diffText);

    // console.log(JSON.stringify(review, null, 2));

// save in db
await Review.create({
repo,
prNumber,
bugs: review.bugs,
security: review.security,
suggestions: review.suggestions
})

    // step 4: send review back to frontend
    res.json(review);

  } catch (err) {
    console.error(err.message);
     console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
    res.status(500).json({error: "Something went worng during review"})
  }

})

route.get('/' , async(req,res) => {
 try {
   const reviwes =  await Review.find().sort({ createAt: -1}).limit(20);
  res.json(reviwes)
 } catch (err) {
  res.status(500).json({error: "Cloud not fetch history"})
 }
});

export default route;