const express = require("express");
const router = express.Router();
const followerQueries = require("../queries/followers");

//retrieves all followers
router.get("/", async (req, res, next) => {
  const followed_id = req.body.followed_id;
  try {
    let followers = await followerQueries.getMyAllFollwers(followed_id);
    res.json({
      payload: followers,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      payload: null,
      message: "Error",
      error: error,
    });
  }
});

router.get("/following", async (req, res, next) => {
  const followed_id = req.body.followed_id;
  try {
    let followers = await followerQueries.getWhoImFollowing(followed_id);
    res.json({
      payload: followers,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      payload: null,
      message: "Error",
      error: error,
    });
  }
});

//add follower
router.post("/new", async (req, res, next) => {
  const followed_id = req.body.followed_id;
  const follower_id = req.body.follower_id;
  try {
    await followerQueries.follow(followed_id, follower_id);
    res.json({
      message: "Success, followed",
    });
  } catch (error) {
    res.json({
      payload: null,
      message: "Error",
      error: error,
    });
  }
});

//unfollow
router.delete("/", async (req, res, next) => {
  const followed_id = req.body.followed_id;
  const follower_id = req.body.follower_id;
  try {
    await followerQueries.unfollow(followed_id, follower_id);
    res.json({
      message: "Success, unfollowed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      payload: null,
      message: "Error",
      error: error,
    });
  }
});

module.exports = router;
