CREATE TABLE order_details(
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT
);