DROP DATABASE IF EXISTS pantry_party;
CREATE DATABASE pantry_party;
\c pantry_party;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    firstname VARCHAR, 
    lastname VARCHAR, 
    email VARCHAR, 
    username VARCHAR, 
    password VARCHAR, 
    avatar VARCHAR, 
    bio VARCHAR, 
    history VARCHAR, 
    active BOOLEAN 
);

CREATE TABLE followers (
    id SERIAL PRIMARY KEY, 
    followed_id INT REFERENCES users(id),
    follower_id INT REFERENCES users(id)
);


CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id),
    recipe_name VARCHAR, 
    directions VARCHAR,
    recipe_img VARCHAR,
    recipe_active BOOLEAN DEFAULT TRUE,
    recipe_public BOOLEAN DEFAULT TRUE
);

CREATE TABLE hashtags (
    id SERIAL PRIMARY KEY,
    tag_body VARCHAR,
    recipe_id INT REFERENCES recipes(id)
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR,
    amount VARCHAR,
    measurement VARCHAR,
    recipe_id INT REFERENCES recipes(id)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id), 
    event_name VARCHAR, 
    event_date DATE, 
    event_description VARCHAR,
    recipe_info INT REFERENCES recipes(id),
    active BOOLEAN 
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id),
    event_id INT REFERENCES events(id), 
    recipe_id INT REFERENCES recipes(id),
    follower_id INT REFERENCES followers(id),
    status VARCHAR
);

-- SEED DATA

INSERT INTO users (firstname, lastname, email, password)
    VALUES ('Suzette', 'Islam', 'suzette@gmail.com', '123ok'), 
            ('Maliq', 'Taylor', 'maliq@gmail.com', 'ok123'),
            ('Douglas', 'MacKrell', 'douglas@gmail.com', 'ok123');

INSERT INTO events (event_name, event_date, event_description, recipe_info)
    VALUES ('hey', '2020-04-04', 'cooking with friends', null), 
        ('why', '2020-03-04', 'cooking with friends', null),
        ('omg', '2020-01-04', 'cooking with parents', null),
        ('no', '2020-03-04', 'cooking with friends', null), 
        ('hey', '2020-02-04', 'cooking with friends', null);

INSERT INTO followers (followed_id, follower_id)
    VALUES( 1,2),
        (1,3),
        (2,1),
        (2,3),
        (3,1),
        (3,2);

INSERT INTO recipes (user_id, recipe_name, directions, recipe_img, recipe_active, recipe_public)
    VALUES (1, 'Suzette''s World Famous Tomato Sauce', 'STEP 1: Add Olive Oil to large soup pot and heat to shimmering\nSTEP 2: Add garlic, oregano, and red pepper flakes and cook for one minute\nSTEP 3: Add the diced onion to the pot, and cook for 5 minutes or until soft and translucent\nSTEP 4: Add the tomato paste and cook for 3 - 5 minutes more, making sure not to burn the paste by adding a little more olive oil if needed\nSTEP 5: Add in the cans of whole and crushed tomatoes, taking time to break up the whole tomatoes with a potato masher or fork\nSTEP 6: Bring to a boil, then drop the heat to low and cover. Cook for 1 hour (or longer for a deeper taste) stirring occationally\nSTEP 7: Remove from the heat, and add the butter. Stir the sauce until the butter melts', 'https://www.simplyrecipes.com/wp-content/uploads/2007/01/basic-tomato-sauce-horiz-a-1200.jpg', true, true),
        (2, 'Maliq''s Chili Mac N'' Cheese', 'STEP 1: Heat olive oil in a large skillet over medium heat. Add onion, bell pepper, and garlic and cook until softened. Add chili powder, cumin, and cayenne until fragrant, 1 minute. Add ground beef and cook until browned.\nSTEP 2: Transfer beef mixture to slow cooker along with tomatoes, kidney beans and beef broth, and season generously with salt and pepper. Cover and cook on high for 4 to 6 hours or low for 8 to 10 hours.\nSTEP 3: When ready, stir in dry pasta and cook on high for 15 minutes more. When pasta is tender stir in cheeses until evenly distributed and melted. Garnish with scallions and serve.', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/28/2/YW0812H_chili-mac_s4x3.jpg.rend.hgtvcom.826.620.suffix/1479258280675.jpeg', true, true),
        (3, 'Doug''s Five Alarm Buffalo Chicken Stuffed Peppers', 'STEP 1: Preheat oven to 400°. Place bell peppers cut side up on a large baking sheet and drizzle all over with olive oil, then season with salt and pepper.\nSTEP 2: In a large skillet over medium heat, melt butter. Add onion and cook until tender, about 5 minutes. Add garlic and cook until fragrant, 1 minute more.\nSTEP 3: Add shredded chicken and hot sauce and toss until combined. Cook until the mixture comes to a simmer, then remove from heat.\nSTEP 4: Divide chicken mixture between pepper halves. Top with Gouda and bake until cheese is melted and peppers are crisp-tender, 20 to 25 minutes.\nSTEP 5: Drizzle each stuffed pepper with ranch dressing and sprinkle with chives.', 'https://hips.hearstapps.com/del.h-cdn.co/assets/17/12/480x719/gallery-1490387803-delish-buffalo-chicken-stuffed-peppers-pin3.jpg?resize=768:*', true, true);

INSERT INTO hashtags (tag_body, recipe_id)
    VALUES ('Tomato', 1),
        ('Tomato Sauce', 1),
        ('Italy', 1),
        ('Mac N Cheese', 2),
        ('Macaroni And Cheese', 2),
        ('Comfort Food', 2),
        ('Spicy', 3),
        ('Chicken', 3),
        ('Fast Meals', 3);

INSERT INTO ingredients (ingredient_name, amount, measurement, recipe_id)
    VALUES ('Crushed Tomatoes', '2', '48oz Cans', 1),
        ('Whole San Marzano Tomatoes', '1', '48oz Can', 1),
        ('Diced Yellow Onion', '1', 'Large', 1),
        ('Oregano', '2', 'Tablespoons', 1),
        ('Red Pepper Flakes', '2', 'Tablespoons', 1),
        ('Unsalted Butter', '1/2', 'Stick', 1),
        ('Tomato Paste', '1', '4oz Can', 1),
        ('Minced Garlic', '3', 'Cloves or Tablespoons', 1),
        ('olive oil', '1', 'tbsp', 2),
        ('onion, diced', '1', 'medium', 2),
        ('red bell pepper, diced', '1', 'large', 2),
        ('garlic, minced', '3', 'cloves', 2),
        ('chili powder', '2', 'tsp', 2),
        ('ground cumin', '1', 'tbsp', 2),
        ('cayenne', '1', 'tbsp', 2),
        ('ground beef', '2', 'lbs', 2),
        ('crushed tomatoes', '2', '28oz Cans', 2),
        ('kidney beans, drained', '1', '15oz can', 2),
        ('beef broth', '2', 'cups', 2),
        ('salt', '2-3', 'pinches', 2),
        ('black pepper', '2-3', 'pinches', 2),
        ('pasta', '8', 'oz', 2),
        ('cheddar, shredded', '1 1/2', 'cups', 2),
        ('monterey jack cheese shredded', '1 1/2', 'cups', 2),
        ('scallions', '1/4', 'cup', 2),
        ('Bell Peppers', '4', 'Large', 3),
        ('Olive Oil', '1', 'tbsp', 3),
        ('Salt', '1-2', 'shakes', 3),
        ('Black Pepper', '3-4', 'grinds', 3),
        ('Butter', '3', 'tbsp', 3),
        ('Onion', '1/2', 'Large', 3),
        ('Garlic', '2', 'cloves', 3),
        ('Rotisserie Chicken', '3', 'Cups', 3),
        ('Frank''s Red Hot', '1/2', 'Cup', 3),
        ('Gouda', '1/2', 'cup', 3),
        ('Ranch Dressing', '3', 'tbsp', 3),
        ('Chives', '2', 'tbsp', 3);

-- TESTS

SELECT * FROM users;
SELECT * FROM events;
SELECT * FROM followers;
SELECT * FROM recipes;
SELECT * FROM hashtags;
SELECT * FROM ingredients;