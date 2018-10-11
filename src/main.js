function getValues() {
  return {
    inital: document.getElementById('inital-value').value,
    vat: document.getElementById('vat-percentage').value
  };
}

function setResult(processedInital, vatDiff, withVAT) {
  document.getElementById('total-value').textContent = processedInital.toFixed(
    2
  );
  document.getElementById('vat-value').textContent = vatDiff.toFixed(2);
  document.getElementById('vat-type').textContent = withVAT ? 'Inc' : 'Ex';
}

function addVAT() {
  var values = getValues();
  var add = values.inital * (1 + values.vat / 100);
  var vatDiff = add - values.inital;
  setResult(add, vatDiff, true);
}

function removeVAT() {
  var values = getValues();
  var remove = values.inital / (1 + values.vat / 100);
  var vatDiff = remove - values.inital;
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
    window.open(chrome.runtime.getURL('options.html'));
  }
}

function initialiseOptions() {
  chrome.storage.sync.get('options', function(storage) {
    // If the value doesn't exist, default to 20.
    document.getElementById('vat-percentage').value = storage.options
      .vatPercentage
      ? storage.options.vatPercentage
      : 20;

    document.getElementById('currency').innerHTML = storage.options.currency;
  });
}

function initialise() {
  // Focus on inital value input.
  document.getElementById('inital-value').focus();
  // Handle add/remove events.
  document.getElementById('add').addEventListener('click', addVAT);
  document.getElementById('remove').addEventListener('click', removeVAT);
  // Handle opening options.
  document.getElementById('options').addEventListener('click', openOptions);
  // Handle keydown events.
  document.addEventListener('keydown', keyEventHandler, false);
}

document.addEventListener('DOMContentLoaded', function() {
  initialiseOptions();
  initialise();
});
