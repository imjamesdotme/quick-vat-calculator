
document.addEventListener('DOMContentLoaded', function () {

	// When Add VAT button is clicked, run addVAT function
	document.getElementById('addButton').addEventListener('click', addVAT);
	// When Remove VAT button is clicked, run removeVAT function
	document.getElementById('removeButton').addEventListener('click', removeVAT);
	//
	document.addEventListener("keydown", keyEventHandler, false);

}); // End ready

function addVAT() {
	var inputVat = document.getElementById("vat-input").value;
	var input = document.getElementById("input").value;

	var add = input * (1 + (inputVat/100));
	var vatDiff = add - input;
	document.getElementById("output").textContent = add.toFixed(2);
	document.getElementById("outputVatdiff").textContent = vatDiff.toFixed(2);
	document.getElementById("amount").textContent = "Inc VAT";
}

function removeVAT() {
	var inputVat = document.getElementById("vat-input").value;
	var input = document.getElementById("input").value;

	var remove = input / (1 + (inputVat/100));
	var vatDiff = remove - input;
	document.getElementById("output").textContent = remove.toFixed(2);
	document.getElementById("outputVatdiff").textContent = vatDiff.toFixed(2);
	document.getElementById("amount").textContent = "Ex VAT";
}

function keyEventHandler(e) {
	var keyCode = e.keyCode;

	if(keyCode === 13) {
		// Enter key
		addVAT();
	} else if(keyCode === 16) {
		// Shift key
		removeVAT();
	} else if(keyCode === 40) {
		// Down arrow key
		removeVAT();
	}
}
