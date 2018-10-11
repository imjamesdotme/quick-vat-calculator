function handleSubmit(e) {
  e.preventDefault();

  var formValues = {
    vatPercentage: document.getElementById('vat-percentage').value,
    currency: document.getElementById('currency').value
  };

  if (validateVatInput(formValues.vatPercentage)) {
    saveOptions(formValues);
  }
}

function validateVatInput(value) {
  var errorMessage = document.querySelector('#vat-percentage ~ .error-message');

  if (!isNaN(value) && value >= 1) {
    errorMessage.style.visibility = 'hidden';
    return true;
  } else {
    errorMessage.style.visibility = 'visible';
    return false;
  }
}

function saveOptions(formValues) {
  chrome.storage.sync.set(
    {
      options: formValues
    },
    function() {
      var status = document.getElementById('status');
      status.style.visibility = 'visible';
      setTimeout(function() {
        status.style.visibility = 'hidden';
      }, 1500);
    }
  );
}

function restoreOptions() {
  chrome.storage.sync.get('options', function(storage) {
    document.getElementById('vat-percentage').value =
      storage.options.vatPercentage;
    document.getElementById('currency').value = storage.options.currency;
  });
}

// Set default options & restore them into the interface.
function initaliseOptions() {
  var defaultOptions = {
    options: {
      vatPercentage: 20,
      currency: '&pound;'
    }
  };

  chrome.storage.sync.set(defaultOptions, restoreOptions);
}

function initalise() {
  // Check if user has stored options & restore, otherwise initalise default options.
  chrome.storage.sync.get('options', function(options) {
    if (options.hasOwnProperty('options')) {
      restoreOptions();
      return;
    }

    initaliseOptions();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initalise();

  document.getElementById('save').addEventListener('click', handleSubmit);
});
