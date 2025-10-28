// Assignment asks for checkboxes, but their behaviour is much closer
// radio buttons. In case the point of the exercise is to code the
// mutually exclusive behaviour, put them in different groups and
// implement that behaviour.
const radioGroup = document.querySelectorAll('.radioGroup');
radioGroup.forEach(radioButton => {
	radioButton.addEventListener('change', () => {
		radioGroup.forEach(radio => {
			if (radio !== radioButton) {
				radio.checked = false;
				//console.log('sdfsdurl');
			}
		})
	})
});

button = document.getElementById("executeButton");
button.addEventListener("click", callApi);

// default"611300 300 822"

function callApi(event) {
	let selectedId = [...radioGroup].find(r => r.checked)?.id;
	if (selectedId) {
		console.log(selectedId);
		switch (selectedId) {
			case "radioButtonE":
				url = "https://api.api-ninjas.com/v1/exercises?muscle="
				    + document.getElementById("queryString").value;
				break;
			case"radioButtonP" :
				url = "https://api.api-ninjas.com/v1/validatephone?number="
				    + document.getElementById("queryString").value;
				break;
		}
		console.log(url);
		fetch(url, {
			method: "GET",
			headers: {
				"X-Api-Key": "nC9z8PUdwGMedC2iDMbeog==EAr24cWnfUvOGyA4",
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log("data:", data);
			document.getElementById("responseString").value = JSON.stringify(data, null, 2);;
		})
	}
}
