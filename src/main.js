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

document.addEventListener('DOMContentLoaded', function() {
  // When Add VAT button is clicked, run addVAT function
  document.getElementById('add').addEventListener('click', addVAT);
  // When Remove VAT button is clicked, run removeVAT function
  document.getElementById('remove').addEventListener('click', removeVAT);
  // Handle keypdown events.
  document.addEventListener('keydown', keyEventHandler, false);
});
