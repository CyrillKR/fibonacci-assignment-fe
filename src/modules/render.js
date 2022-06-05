import { formatISOToRegular } from "./time.js";
const errorP = document.querySelector(".error");
const historyList = document.querySelector(".history-list");

function renderError(error) {
  errorP.textContent = error;
}

function clearError() {
  errorP.textContent = "";
}

export default function runError(error) {
  renderError(error);
  setTimeout(clearError, 3000);
}

export function renderResults(results) {
  const nodes = [];

  results.forEach((resultJSON) => {
    const { result, time, valuePassed } = resultJSON;
    const li = document.createElement("li");
    li.classList.add("result-li");
    li.textContent = `For the value ${valuePassed}, the result is ${result}. Calculated on ${formatISOToRegular(
      time
    )}`;
    nodes.push(li);
  });

  while (historyList.lastChild) {
    historyList.removeChild(historyList.lastChild);
  }

  nodes.forEach((node) => {
    historyList.appendChild(node);
  });
}

export function sortResults(results, type) {
  switch (type) {
    case "date-desc":
      return results;
    case "date-asc":
      return results.reverse();
    case "result-desc":
      return sortByValue(results, type);
    case "result-asc":
      return sortByValue(results, type);
    default:
      console.warn("No type passed");
      return results;
  }
}

function sortByValue(results, type) {
  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results.length - i - 1; j++) {
      if (type === "result-desc") {
        if (results[j].result < results[j + 1].result) {
          let temp = results[j];

          results[j] = results[j + 1];
          results[j + 1] = temp;
        }
      } else if (type === "result-asc") {
        if (results[j].result > results[j + 1].result) {
          let temp = results[j];

          results[j] = results[j + 1];
          results[j + 1] = temp;
        }
      } else {
        return "Type of sort required";
      }
    }
  }

  return results;
}
