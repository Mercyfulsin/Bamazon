let inquirer = require('inquirer');
let DB = require('./db');
let db = new DB();


function menu() {
    inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["List Items", "Purchase Items", "Quit"]
    }]).then(reply => {
        switch (reply.choice) {
            case 'List Items':
                db.listAll(menu);
                break;
            case 'Purchase Items':
                db.selectItem(menu);
                break;
            case 'Quit':
                db.kill();
                break;
            default:
                console.log("This isn't a choice! Goodbye!");
                break;
        }
    });
}



menu();