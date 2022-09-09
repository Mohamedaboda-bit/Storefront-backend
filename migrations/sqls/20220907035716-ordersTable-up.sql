CREATE TABLE orders (id SERIAL PRIMARY KEY ,status  VARCHAR(65)  ,user_id  bigint REFERENCES Users(id));
