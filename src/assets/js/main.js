import "../scss/style.scss";

const MAX_DEPTH = 20;
let globalIndex = 1;

// Generates a random integer.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates divs structures.
function besideStructure(child1, child2) {
  return {
    html: `<div class="beside"><p>${globalIndex++}</p>${child1.html}${
      child2.html
    }</div>`,
  };
}

function endStructure() {
  return {
    html: `<div class="base"><p>${globalIndex++}</p><div class="ellipsis"></div></div>`,
  };
}

function withinStructure(child) {
  return {
    html: `<div class="within"><p>${globalIndex++}</p>${child.html}</div>`,
  };
}

function onStructure(child1, child2) {
  return {
    html: `<div class="on"><p>${globalIndex++}</p>${child1.html}${
      child2.html
    }</div>`,
  };
}

// The "randomDepthStructure" function generates nested div elements with a maximum nesting
// depth, controlled by the MAX_DEPTH constant, using recursion. It ceases execution when the nesting level
// reaches 10 or a random number between 0 and 1 exceeds 0.7. On execution, it generates a random integer between
// 0 and 2, deciding the HTML structure to return and increments the currentDepth variable to track the nesting level.

function randomDepthStructure(currentDepth = 0) {
  if (currentDepth >= MAX_DEPTH || Math.random() > 0.7) {
    return endStructure();
  } else {
    switch (getRandomInt(0, 2)) {
      case 0:
        return besideStructure(
          randomDepthStructure(currentDepth + 1),
          randomDepthStructure(currentDepth + 1)
        );
      case 1:
        return onStructure(
          randomDepthStructure(currentDepth + 1),
          randomDepthStructure(currentDepth + 1)
        );
      case 2:
        return withinStructure(randomDepthStructure(currentDepth + 1));
      default:
        return endStructure();
    }
  }
}

// The "generateArtwork" function retrieves the output of the "randomDepthStructure" function into a variable named "result".
// The HTML content is injected into the div element with the id "compositionArea".

function generateArtwork() {
  const result = randomDepthStructure();
  document.getElementById("compositionArea").innerHTML = result.html;
  globalIndex = 1;
}

generateArtwork(); // Init
window.addEventListener("click", generateArtwork); // Reboot

console.log("Design and code by Maxime Benoit. Inspired by Damon Zucconi.");