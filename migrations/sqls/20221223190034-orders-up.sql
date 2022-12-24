CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10),
    user_id INT REFERENCES users(id)
);