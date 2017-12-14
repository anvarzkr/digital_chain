import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import Web3 from 'web3';
import { Link, browserHistory } from 'react-router';

var contractInfo = require('../blockchain/build/contracts/EmploymentContract.json');
var contract = require("truffle-contract");
let DC = contract(contractInfo);

let eventContractInfo = require('../blockchain/build/contracts/EventContract.json');
window.EC = contract(eventContractInfo);
EC.setProvider(web3.currentProvider)

if (typeof web3 !== 'undefined') {
	console.log('Metamask initialized');
	window.web3 = new Web3(web3.currentProvider);
  console.log(web3.eth.coinbase);
} else {
	console.log('Metamask not initialized. Falling back to localhost:8545')
	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

DC.setProvider(web3.currentProvider)
window.dcc = DC.at("0x574fe602a32f7fb2b4076e43a9a03a6de39db641");

window.getCookie = function(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.setCookie = function(name, value) {
	document.cookie = name + "=" + value;
}

window.deleteCookie = function(name) {
  setCookie(name, "", {
    expires: -1
  })
}

 window.timeConverter = function(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '.' + month + '.' + year;
  return time;
}

window.timeToUnix = function(time) { // YYYY.MM.DD
	return new Date(time).getTime() / 1000
}

window.currentUser = {
	signedIn: false
};

if (getCookie('login') && getCookie('password')) {
	window.dcc.login(getCookie('login'), getCookie('password'), {from: web3.eth.coinbase, gas: 1400000}).then(function(data) {
		console.log(data);
		if (data == true) {
			window.dcc.isExpert(window.web3.eth.coinbase).then(function(is_expert) {
				if (is_expert == true) {
					window.currentUser = {
						type: 1,
						signedIn: true
					};
					browserHistory.push('/expert');
				} else {
					window.currentUser = {
						type: 0,
						signedIn: true
					};
					browserHistory.push('/participant');
				}
			});

		} else {
			deleteCookie("login");
			deleteCookie("password");
		}
	});
}

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
