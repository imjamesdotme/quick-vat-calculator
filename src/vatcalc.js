
document.addEventListener('DOMContentLoaded', function () {

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

	// When Add VAT button is clicked, run addVAT function
	document.getElementById('addButton').addEventListener('click', addVAT);
	// When Remove VAT button is clicked, run removeVAT function
	document.getElementById('removeButton').addEventListener('click', removeVAT);

}); // End ready
