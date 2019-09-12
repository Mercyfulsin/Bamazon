let mysql = require('mysql');
let pass = require('./pass');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: pass,
    database: "bamazon"
});


var db = function () {
    this.kill = function () { connection.end(); }
    this.listAll = function (func) {
        connection.query('SELECT * FROM products', (e, r) => {
            if (e) throw e;
            // console.log(r);
            r.map(c => console.log(`${c.item_id} || ${c.product_name} || ${c.price} || ${c.stock_quantity}`));
            func();
        });
    }
    this.selectItem = function (func) {
        inquirer.prompt({
            name: "choice",
            message: "What product would you like? (Use the numbers)",
            type: "input"
        }).then(reply => {
            connection.query('SELECT * FROM products WHERE item_id = ?', [reply.choice], (e, r) => {
                if (e) throw e;
                r.length === 0  || r[0].stock_quantity === 0 ? (console.log("Sorry that isn't an item or we are out of stock"), func()) : this.purchase(r[0], func);
            });
        });
    }
    this.purchase = function (obj, func) {
        console.log(`You have selected ${obj.product_name} which has ${obj.stock_quantity} in stock.`);
        inquirer.prompt({
            name: "amount",
            message: "How many would you like to buy?",
            type: "input"
        }).then(reply => {
            let amount = parseInt(reply.amount);
            amount && amount <= obj.stock_quantity ? (amount < 0 ? amount = 0 : (console.log(`Successfully purchased ${amount} ${obj.product_name}`), this.remove(obj.item_id, obj.stock_quantity - amount,func))) : (console.log("Sorry that isn't a valid input, try again!"), this.purchase(obj, func));
        });
    }
    this.remove = function (id,amount,func) {
        connection.query('UPDATE products SET stock_quantity= ? WHERE item_id = ?',[amount,id],(e)=>{
            if (e) throw e;
            console.log("Successfully updated!");
            func();
        });
    }
}

module.exports = db;