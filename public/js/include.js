const date = new Date();
const today = date.getDate();
const currentMonth = date.getMonth();

fetch("/html/header.html")
    .then((response) => response.text())
    .then((data) => document.querySelector("#header").innerHTML = data);