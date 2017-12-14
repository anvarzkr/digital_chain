import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
// import Web3 from 'web3'
// var contractInfo = require('../blockchain/build/contracts/EmploymentContract.json')
// var contract = require("truffle-contract")
// let Empl = contract(contractInfo)
// if (typeof web3 !== 'undefined') {
// 	console.log('Metamask initialized123');
// 	window.web3 = new Web3(web3.currentProvider);
// } else {
// 	console.log('Metamask not initialized. Falling back to localhost:8545')
// 	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
// }
//
// Empl.setProvider(web3.currentProvider)
// window.emp = Empl.at("0x316963D6AB20255D1c49Da4bAB15EDFff67d2fEe")
//
// window.emplAddress = "0xdb57eE5294c235f68d43F536D119a365DDA261C2"
// window.compAddress = "0x943c526586938ea31529C0471714e4e29bA96Ed8"
//
// window.currentUser = undefined;
// window.authorized = false;
// window.user_type = 0;// 0 - employee, 1 - company
//
// window.fetchData = function(callback) {
// 	setTimeout(function() {
// 		console.log("Metamask address: ", window.web3.eth.accounts[0]);
// 		window.emp.employeeList(window.web3.eth.accounts[0]).then(function(data){
// 		  if (data[1] == ""){
// 		  	window.emp.companyList(window.web3.eth.accounts[0]).then(function(data){
// 		  		if (data[1] == ""){
// 		  			window.authorized = false;
// 						callback();
// 		  		}
// 		  		else{
// 		  			window.currentUser = {
// 							address: data[0],
// 							name: data[1],
// 							reg_number: data[2],
// 							user_type: 1
// 						};
// 		  			// window.compAddress = currentUser[0];
// 		  			// window.user_type = 1;
// 		  			window.authorized = true;
// 		  			console.log(window.currentUser);
// 		  		}
//
// 					callback();
// 		  	});
// 		  }
// 		  else{
// 		  	window.currentUser = {
// 					address: data[0],
// 					name: data[1] + ' ' + data[2],
// 					passport: data[3],
// 					user_type: 0
// 				};
// 		  	// window.emplAddress = currentUser[0];
// 		  	// window.user_type = 0;
// 		  	window.authorized = true;
// 		  	console.log(window.currentUser);
//
// 				callback();
// 		  }
// 	  });
// 	}, 300);
// }

render(
  <App/>,
  document.getElementById('app')
)
