// Assignment asks for checkboxes, but their behaviour is much closer
// radio buttons. In case the point of the exercise is to code the
// mutually exclusive behaviour, put them in different groups so we have to
// implement that behaviour.

const radioGroup = document.querySelectorAll('.radioGroup');
radioGroup.forEach((radioButton) => {
	radioButton.addEventListener('change', fff)
});

function fff(event) {
	radioGroup.forEach((radio) => {
		if (radio !== event.target && radio.checked === true) {
			// This is the 'on' radio button that we must turn 'off'
			radio.checked = false;
			// Save the query before it is overwritten
			apiDefaultStrings[radio.id] = document.getElementById("queryString").value;
			//console.log("radio.id: " + radio.id);
			//console.log("Saving: " + apiDefaultStrings[radio.id]);
			//onsole.log("DB: " + JSON.stringify(apiDefaultStrings, null, "\t"));
		}
	})
	// This is the 'off' radio button that has beem turned 'on'
	// Lookup the saved query for this radio button
	document.getElementById("queryString").value = apiDefaultStrings[event.target.id];
}

string: apiDefaultStrings = {
	exercisesRB: "abdominal",
	validatephoneRB: "611300 300 822"
}
string: apiQueryStrings = {
	exercisesRB: {query:"abdominal",result:""},
	validatephoneRB: {query:"611300 300 822",result:""},
}

document.getElementById('apiToolForm').addEventListener("submit", (event) => {
	event.preventDefault();  // prevent page scroller reset
	callApi(event);
})

function callApi(event) {
	let selectedId = [...radioGroup].find(r => r.checked)?.id;
	console.log(selectedId);
	if (selectedId) {
		console.log(selectedId);
		// switch (selectedId) {
		// 	case "exercisesRB":
		// 		url = "https://api.api-ninjas.com/v1/exercises?muscle="
		// 		    + document.getElementById("queryString").value;
		// 		break;
		// 	case"validatephoneRB" :
		// 		url = "https://api.api-ninjas.com/v1/validatephone?number="
		// 		    + document.getElementById("queryString").value;
		// 		break;
		// }
		// console.log(url);
		// fetch(url, {
		// 	method: "GET",
		// 	headers: {
		// 		"X-Api-Key": "nC9z8PUdwGMedC2iDMbeog==EAr24cWnfUvOGyA4",
		// 		"Content-Type": "application/json"
		// 	}
		// })
		// .then(response => {
		// 	if (!response.ok) {
		// 		throw new Error(`HTTP error! status: ${response.status}`);
		// 	}
		// 	return response.json();
		// })
		// .then(data => {
		// 	console.log("data:", data);
		// 	document.getElementById("responseString").value = JSON.stringify(data, null, 2);;
		// })
	}
}
