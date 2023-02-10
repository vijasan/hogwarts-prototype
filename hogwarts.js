"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const Student = {
  firstname: "",
  lastname: "",
  middlename: "",
  nickname: "",
  house: 0,
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    //"harry James POTTER"

    const student = Object.create(Student);
    const text = jsonObject.fullname.split(" ");
    student.house = jsonObject.house;
    student.firstname = text[0];
    student.lastname = text[text.length - 1];

    if (text.length > 2) {
      student.middlename = text[1];
    }

    if (jsonObject.nickname) {
      student.nickname = jsonObject.nickname;
    }

    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=firstname]").textContent = student.firstname;
  clone.querySelector("[data-field=lastname]").textContent = student.lastname;
  clone.querySelector("[data-field=middlename]").textContent =
    student.middlename;

  clone.querySelector("[data-field=nickname]").textContent =
    student.nickname || "";
  clone.querySelector("[data-field=house]").textContent = student.house;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
