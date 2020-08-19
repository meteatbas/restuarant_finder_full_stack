CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restuarant_id  BIGINT NOT NULL REFERENCES restuarants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);