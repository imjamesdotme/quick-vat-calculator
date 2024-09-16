function getValues() {
  return {
    initial: document.getElementById("initial-value").value,
    vat: document.getElementById("vat-percentage").value,
  };
}

function setResult(processedInitial, vatDiff, withVAT) {
  document.getElementById("total-value").textContent =
    processedInitial.toFixed(2);
  document.getElementById("vat-value").textContent = vatDiff.toFixed(2);
  document.getElementById("vat-type").textContent = withVAT ? "Inc" : "Ex";
}

function addVAT() {
  var values = getValues();
  var add = values.initial * (1 + values.vat / 100);
  var vatDiff = add - values.initial;
  setResult(add, vatDiff, true);
}

function removeVAT() {
  var values = getValues();
  var remove = values.initial / (1 + values.vat / 100);
  var vatDiff = remove - values.initial;
  setResult(remove, vatDiff, false);
}

function keyEventHandler(e) {
  var keyCode = e.keyCode;

  if (keyCode === 13) {
    // Enter key
    addVAT();
  } else if (keyCode === 16) {
    // Shift key
    removeVAT();
  } else if (keyCode === 40) {
    // Down arrow key
    removeVAT();
  }
}

function openOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
}

function initialiseOptions() {
  chrome.storage.sync.get("options", function (storage) {
    document.getElementById("vat-percentage").value =
      storage.options.vatPercentage;
    document.getElementById("currency").innerHTML = storage.options.currency;
  });
}

function setDefaultOptions() {
  var defaultOptions = {
    options: {
      vatPercentage: 20,
      currency: "&pound;",
    },
  };

  chrome.storage.sync.set(defaultOptions, initialiseOptions);
}

function handleInitialseOptions() {
  chrome.storage.sync.get("options", function (options) {
    if (!options.hasOwnProperty("options")) {
      setDefaultOptions();
      return;
    }

    initialiseOptions();
  });
}

function initialise() {
  // Focus on initial value input.
  document.getElementById("initial-value").focus();
  // Handle add/remove events.
  document.getElementById("add").addEventListener("click", addVAT);
  document.getElementById("remove").addEventListener("click", removeVAT);
  // Handle opening options.
  document.getElementById("options").addEventListener("click", openOptions);
  // Handle keydown events.
  document.addEventListener("keydown", keyEventHandler, false);
}

document.addEventListener("DOMContentLoaded", function () {
  handleInitialseOptions();
  initialise();
});
