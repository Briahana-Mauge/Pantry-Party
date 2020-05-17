const db = require("../database/db");

const getMyAllFollwers = async (followed_id) => {
  return await db.any(
    `
    SELECT * FROM followers
    INNER JOIN users 
    ON followers.follower_id = users.id
    WHERE followed_id = $1
    `,
    followed_id
  );
};

const getWhoImFollowing = async (followed_id) => {
  return await db.any(
    `
    SELECT * FROM followers
    INNER JOIN users 
    ON followers.followed_id = users.id
    WHERE follower_id = $1
    `,
    followed_id
  );
};

const follow = async (followed_id, follower_id) => {
  const insertQuery = `
    INSERT INTO followers(followed_id, follower_id) 
    VALUES ($1, $2) 
    `;
  return await db.none(insertQuery, [followed_id, follower_id]);
};

const unfollow = async (followed_id, follower_id) => {
  return await db.none(`
    DELETE FROM followers 
    WHERE followed_id = ${followed_id} AND follower_id = ${follower_id}`);
};

module.exports = {
  getMyAllFollwers,
  getWhoImFollowing,
  follow,
  unfollow,
};
