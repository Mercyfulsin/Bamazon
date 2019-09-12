DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DEC(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Bamazon Basics Type-C USB 5ft","Electronic Accessories",4.99,50),
("Bamazon Basics Gamer Chair","Home",45.99,25),
("OnePlus 7","Electronics",799.99,20),
("Painters Starter Kit w/ Pack of 20 Watercolors","Art",24.99,10),
("Kingston 2.5\" SSD 240GB","Electronics",29.99,100),
("Ice TV Stick 4K with Alex Voice Remote, streaming media player","Electronics",49.99,15),
("GoPro HERO 7 Black","Media",299.99,10),
("SanDisk 64GB Extreme microSDXC UHS-I Memory Card","Electronic Accessories",13.99,50),
("Under Armour Men's Charged Cotton 2.0 Crew Socks, 6-Pair","Clothing",17.99,30),
("Rolex Cosmograph Daytona Ice Blue Dial Platinum Mens Watch 116506IBLSO","Watches",69995.00,1);
SELECT * FROM products;
