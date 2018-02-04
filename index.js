//require express module
var express = require('express');
//require web3 module
var Web3 = require('web3');
//creates an express application
var app = express()
var bodyparser = require('body-parser');
//importing jquery because its jquery 
var $ = require('jquery');
var path = require('path');
//set port to run application on
var port = 8000;
var gladus;
var moneyTransacted;

//setup web3 
if (typeof web3 !== 'undefined')
    {
        web3 = new Web3();
        web3 = new Web3(web3.currentProvider);
    }
else 
    {
        web3 = new Web3();
        web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));       
    }

    //using a web3 default account
    web3.eth.defaultAccount = web3.eth.accounts[0];

    

    //setting contract address
    
    gladus = new web3.eth.Contract([
        {
            "constant": true,
            "inputs": [],
            "name": "getGeneralDetails",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getDetails",
            "outputs": [
                {
                    "name": "myNumber",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "balance_of",
                    "type": "address"
                }
            ],
            "name": "getBalance",
            "outputs": [
                {
                    "name": "bal",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "reciever",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to_address",
                    "type": "address"
                },
                {
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "sendGladus",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ], '0xb63d61a0893e13008b1ca3cced43d5f635ad7bbf');
    // console.log(gladus);
   
   
app.get('/', (req,res) => {
    res.send("Welcome to Gladus Web API You can make calls to respective urls to get any data you require.");
});

//api function to send data
app.get('/totalvalue', (req, res) => {
    gladus.methods.getDetails().call().then((resu) => {
        res.send("Total transaction value till date: " + resu);
    });  
});

//method to get balance of particular address
app.get('/balance/:id', (req, res) => {
    var id = req.params.id;
    gladus.methods.getBalance(id).call().then((resu) => {
        res.send("Balance in wallet :" + resu);
    });  
    
});

//get general details like name value etc
app.get('/general-details', (req, res) => {
    gladus.methods.getGeneralDetails().call().then((resu) => {
        res.send("Token Name : "+ resu[0] + " Token Symbol => [" + resu[1] + "] Total In Circulation: " + resu[2]);
    });
});


app.listen(port, "localhost", () => {
    console.log("application listening on " + port);
});
