import "../scss/style.scss";

// Generates a random number between two values (int or float)
function randomBetween(min, max, asInteger = false) {
  const value = Math.random() * (max - min) + min;
  return asInteger ? Math.floor(value) : value;
}

class RecursiveComposition {
  globalIndex = 1;

  constructor(el, config = {}) {
    this.wrapper = el;
    if (!this.wrapper) return;

    this.maxDepth = config.maxDepth ?? 20;
    this.complexity = config.complexity ?? 1;
    this.init();
  }

  init = () => {
    const result = this.randomDepthStructure();
    this.wrapper.innerHTML = result.html;
    this.globalIndex = 1;
  };

  // Generates divs structures.
  besideStructure = (child1, child2) => {
    return {
      html: `<div class="beside"><p>${this.globalIndex++}</p>${child1.html}${
        child2.html
      }</div>`,
    };
  };

  endStructure = () => {
    return {
      html: `<div class="base"><p>${this
        .globalIndex++}</p><div class="ellipsis"></div></div>`,
    };
  };

  withinStructure = (child) => {
    return {
      html: `<div class="within"><p>${this.globalIndex++}</p>${
        child.html
      }</div>`,
    };
  };

  onStructure = (child1, child2) => {
    return {
      html: `<div class="on"><p>${this.globalIndex++}</p>${child1.html}${
        child2.html
      }</div>`,
    };
  };

  // The "randomDepthStructure" function generates nested div elements with a maximum nesting
  // depth, controlled by the MAX_DEPTH constant, using recursion. It ceases execution when the nesting level
  // reaches 10 or a random number between 0 and 1 exceeds 0.7. On execution, it generates a random integer between
  // 0 and 2, deciding the HTML structure to return and increments the currentDepth variable to track the nesting level.

  randomDepthStructure = (currentDepth = 0) => {
    // "complexity" controls how dense/deep the structure tends to be.
    // Higher = more complex, deeper recursion. Range: 0.5 (simpler) → 2 (very complex)
    const complexity = this.complexity ?? 1;

    // Adjust the stop chance curve based on complexity
    const stopChance = Math.pow(currentDepth / this.maxDepth, complexity);
    if (currentDepth >= this.maxDepth || Math.random() < stopChance) {
      return this.endStructure();
    } else {
      switch (randomBetween(0, 2, true)) {
        case 0:
          return this.besideStructure(
            this.randomDepthStructure(currentDepth + 1),
            this.randomDepthStructure(currentDepth + 1),
          );
        case 1:
          return this.onStructure(
            this.randomDepthStructure(currentDepth + 1),
            this.randomDepthStructure(currentDepth + 1),
          );
        case 2:
          return this.withinStructure(
            this.randomDepthStructure(currentDepth + 1),
          );
        default:
          return this.endStructure();
      }
    }
  };
}

const canvas = document.querySelector("#compositionArea");

const createComposition = () => {
  new RecursiveComposition(canvas, {
    maxDepth: 20,
    complexity: 0.8,
  });
};

createComposition();
window.addEventListener("resize", createComposition);
