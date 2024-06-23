import './assets/sass/styles.scss';
import 'normalize.css/normalize.css';

// var student= require("./studentsname")
// var student1 = student("ya5z", "KLCHE_GAMER")

// From Copilot

var studentsname = require("./studentsname");
var student1 = studentsname.student("ya5z", "KLCHE_GAMER");

console.table([{a: 1, b: "Y"}, {a: "Z", b:2}])

// setTimeout(function() {alert("Hello")}, 3000); // big code

// small code
setTimeout( () => {alert("Hello")}, 3000);