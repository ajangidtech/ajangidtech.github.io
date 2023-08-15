//
//  
// key: name of variable
//  - Can't start with numbers
//  - start with lowercase
//  - camel case: conventions
// value: values Value Types
//  - Numbers: integers or decimals
//  - char: single character
//  - Strings: text = "text"
//  - booleans: true or false values
//

// JSON Object
// Data Structure
//  - Way to organize information
//
// List of Key: Value pairs
// Nested
// 

//

const URL = "./projects/projects.json";

let content = [];

let index = 0;
let totalItems = content.length;



function main() {
  fetchProjects();
  setUpButtons();
}

function fetchProjects() {
  fetch(URL)            
  .then(response => response.json())
  .then(data => updateProjects(data))
  .catch(error => console.log(error));
}

function updateProjects(projects) {
  content = projects;
  totalItems = projects.length;
  generateCarousel();
  render();
}

function render() {
  let items = document.getElementsByClassName("carousel-item");

  let width = items[0].offsetWidth;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    item.style.left = (width * i) + "px";
  }

}

function setUpButtons() {
  let left = document.getElementsByClassName("scroll-left")[0];
  let right = document.getElementsByClassName("scroll-right")[0];

  left.addEventListener("click", scrollLeft);
  right.addEventListener("click", scrollRight);
}

function generateCarouselComponent(carI) {
  let item = document.createElement("div");

  item.id = "car-" + carI;
  item.classList.add("carousel-item");

  return item;
}

function generateImage(imageUrl) {
  let image = document.createElement("img");

  image.src = imageUrl;

  return image;
}

function generateCarousel() {
  let carousel = document.getElementById("carousel-body");

  for (let i = 0; i < content.length; i++) {
    let project = content[i];

    let element = generateCarouselComponent(i);
    let image = generateImage(project.image);

    element.appendChild(image);

    carousel.appendChild(element);
  }
}

function scrollLeft() {
  index -= 1;
  if (index < 0) {
    index = totalItems + index;
  }
  let element = document.getElementById("car-" + index);
  element.scrollIntoView();

  setProjectContents();
}

function scrollRight() {
  index += 1;
  if (index >= totalItems) {
    index = totalItems - index;
  }
  let element = document.getElementById("car-" + index);
  element.scrollIntoView();

  setProjectContents();
}

//index [0, length of our content list)
function setProjectContents() {
  let title = document.getElementById("project-title");
  let desc = document.getElementById("project-description");

  let project = content[index];

  title.innerText = project.title;
  desc.innerText = project.description;
}

window.addEventListener("load", main);
