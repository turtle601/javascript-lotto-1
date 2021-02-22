export const $ = (selector) => document.querySelector(selector);
export const $all = (selector) => [...document.querySelectorAll(selector)];

export const createElement = (tagName, className, text) => {
  const $element = document.createElement(tagName);
  $element.className = className;
  $element.append(text);
  return $element;
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isUniqueArray = (array) => {
  return array.length === new Set(array).size;
};

export const showElement = ($element) => {
  $element.classList.remove('hidden');
};

export const hideElement = ($element) => {
  $element.classList.add('hidden');
};

export const enableElement = ($element) => {
  $element.disabled = false;
};

export const disableElement = ($element) => {
  $element.disabled = true;
};

export const getMatchedValueCount = (array1, array2) => {
  const set = new Set([...array1, ...array2]);
  return array1.length + array2.length - set.size;
};
