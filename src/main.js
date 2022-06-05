// Imports
import {
  fetchFromServer,
  BASE_URL,
  getHistory,
} from "./modules/fetchFromServer.js";
import runError, { renderResults, sortResults } from "./modules/render.js";
import fibonacci from "./modules/fibonacci.js";
import Loader from "./modules/loader.js";

// Script initiation
const xElement = document.querySelector("#x");
const yElement = document.querySelector("#y");
const xInput = document.querySelector("#x-input");
const clcBtn = document.querySelector("#submit-btn");
const saveResultsCheckbox = document.querySelector("#save-results");
const limitInput = document.querySelector("#limit-results");
const sortInput = document.querySelector("#sort-type");
const loader = new Loader();

// Event handler and events
async function fibonacciEvent(e) {
  const LIMIT = 1350;
  e.preventDefault();
  const n = parseInt(xInput.value);
  if (n > LIMIT) {
    runError(`You can't pass a number higher than ${LIMIT}!`);
    return;
  } else if (n < 0) {
    runError("You must enter a positive integer!");
    return;
  }

  if (!saveResultsCheckbox.checked) {
    clientFibonaciEvent(n);
  } else {
    serverFibonaciEvent(n);
  }
}

function clientFibonaciEvent(n) {
  const result = fibonacci(n);
  xElement.textContent = `${n}`;
  yElement.textContent = `${result}`;
}

async function serverFibonaciEvent(n) {
  try {
    loader.activateLoader();
    const response = await fetchFromServer(`${BASE_URL}/${n}`);
    if (response.msg) {
      runError(response.msg);
      return;
    }
    const { result } = response;
    xElement.textContent = `${n}`;
    yElement.textContent = `${result}`;
  } catch (err) {
    runError(err);
  } finally {
    loadAndRenderHistory();
    loader.deactivateLoader();
  }
}

async function loadAndRenderHistory() {
  let limit = 5;
  if (limitInput.value) {
    limit = parseInt(limitInput.value);
  }
  try {
    loader.activateLoader();
    const results = await getHistory(limit);
    const sortedResults = sortResults(results, sortInput.value);
    renderResults(sortedResults);
  } catch (err) {
    runError(err);
  } finally {
    loader.deactivateLoader();
  }
}

function init() {
  clcBtn.addEventListener("click", fibonacciEvent);
  sortInput.addEventListener("change", loadAndRenderHistory);
  limitInput.addEventListener("change", loadAndRenderHistory);
  const x = 1;
  const y = 1;
  xElement.textContent = `${x}`;
  yElement.textContent = `${y}`;

  loadAndRenderHistory();
}

init();
