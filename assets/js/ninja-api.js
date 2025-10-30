// jshint esversion: 11, strict: false, undef: true, unused: true, browser: true, node: true, shadow: true

// Assignment asks for checkboxes, but their behavior is much closer to
// radio buttons. In case the point of the exercise is to code the
// mutually exclusive behavior, put them in different groups so we have to
// implement the behavior in code.

let apiQueryStrings = {
	exercisesRB: { query: "abdominals", result: "" },
	validatePhoneRB: { query: "611300300822", result: "" },
};

let responseString = document.getElementById("responseString");

const radioGroup = document.querySelectorAll('.radioGroup');
radioGroup.forEach((radioButton) => {
	radioButton.addEventListener('change', (event) => {
		radioGroup.forEach((radio) => {
			if (radio !== event.target && radio.checked === true) {
				// This is the 'on' radio button that we must turn 'off'
				radio.checked = false;
				// Save query+result before it is overwritten
				apiQueryStrings[radio.id].query = document.getElementById("queryString").value;
				apiQueryStrings[radio.id].result = document.getElementById("responseString").value;
				//console.log("DB: " + JSON.stringify(apiQueryStrings, null, "\t"));
				//const elem = document.getElementById("queryString");
				//console.log(elem, typeof elem, elem.value);
			}
		})
		// This is the 'off' radio button that has been turned 'on'
		// Lookup the saved query+result
		document.getElementById("queryString").value = apiQueryStrings[event.target.id].query;
		document.getElementById("responseString").value = apiQueryStrings[event.target.id].result;
		console.log("DB: " + JSON.stringify(apiQueryStrings, null, "\t"));
	})
});

document.getElementById('clearButton').addEventListener("click", (event) => {
	responseString.value = "";
})

document.getElementById('apiToolForm').addEventListener("submit", (event) => {
	event.preventDefault();  // prevent page scroller reset
	callApi(event);
})

function callApi(event) {
	let selectedId = [...radioGroup].find((r) => r.checked)?.id;
	console.log(selectedId);
	if (selectedId) {
		switch (selectedId) {
			case "exercisesRB":
				url = "https://api.api-ninjas.com/v1/exercises?muscle="
					+ document.getElementById("queryString").value;
				break;
			case "validatePhoneRB":
				url = "https://api.api-ninjas.com/v1/validatephone?number="
					+ document.getElementById("queryString").value;
				break;
		}
		console.log(url);
		document.getElementById("responseString").value = "";
		fetch(url, {
			method: "GET",
			headers: {
				"X-Api-Key": "nC9z8PUdwGMedC2iDMbeog==EAr24cWnfUvOGyA4",
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log("data:", data);
			document.getElementById("responseString").value = JSON.stringify(data, null, 2);
		})
		.catch(error => {
			// OK. This console.log messages took me _ages_ to get tight. From
			// puzzling over fetch's strangely vague exception, to consoles
			// special handing of 'error' object which breaks if string
			// interpolation kicks in, to apparently having to fall back to
			// old C printf-style to avoid en extraneous 'space'.
			console.log("Exception: %oFetched %s", error, url);
			document.getElementById("responseString").value = `Exception: ${error}`;
		})
	}
}
