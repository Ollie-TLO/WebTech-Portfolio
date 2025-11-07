// jshint esversion: 6
// _jshint esversion: 11, strict: implied, undef: true, unused: true, browser: true, devel: true

// Assignment asks for checkboxes, but their behavior is much closer to
// radio buttons. In case the point of the exercise is to code the
// mutually exclusive behavior, put them in different groups so we have to
// implement the behavior in code.
// Changed to checkboxes, lacking a sound reason, IMHO.

const EXERCISES_HELP = "\n\nNo Results\n\nEnter the name of a major muscle group, such as:\n" +
					   "    Abdominals\n" +
					   "    Glutes\n" +
					   "    Triceps\n";
const VALIDATE_PHONE_HELP = "\n\nNo Result\n\nEnter a country code followed by a phone number.\n" +
							"For example 61 followed by an Australian phone number (611300300822).\n";

let apiQueryStrings = {
	exercisesCB: { query: "abdominals", result: "" , help: EXERCISES_HELP },
	validatePhoneCB: { query: "611300300822", result: "", help: VALIDATE_PHONE_HELP },
};

let queryString = document.getElementById("queryString");
let responseString = document.getElementById("responseString");

const checkBoxGroup = document.querySelectorAll('.checkGroup');

checkBoxGroup.forEach((currentCheckBox) => {
	currentCheckBox.addEventListener('change', (event) => {
		if (currentCheckBox.checked) {
			queryString.value = "";
			responseString.value = "";
			checkBoxGroup.forEach((other) => {
				if (currentCheckBox !== other) {
					other.checked = false;
				}
			});
		}
	});
});

document.getElementById('clearButton').addEventListener("click", () => {
	responseString.value = "";
});

document.getElementById('apiToolForm').addEventListener("submit", (event) => {
	event.preventDefault();  // prevent page scroller reset
	if ([...checkBoxGroup].some((cb) => cb.checked)) {
		callApi(event);
	} else {
		responseString.value = "Please select an API first";
	}
});

function callApi() {
	// let selectedId = [...radioGroup].find((r) => r.checked)?.id;  // ES6 wont allow ?.
	let selectedId = ([...checkBoxGroup].find((cb) => cb.checked) || {}).id;
	if (selectedId) {
		let url;
		switch (selectedId) {
			case "exercisesCB":
				url = "https://api.api-ninjas.com/v1/exercises?muscle=";
				break;
			case "validatePhoneCB":
				url = "https://api.api-ninjas.com/v1/validatephone?number=";
				break;
		}
		url += encodeURIComponent(queryString.value.trim().replace(/[<>"'`/\\]/g, ''));
		console.log(url);
		responseString.value = "";
		fetch(url, {
			method: "GET",
			headers: {
				"X-Api-Key": "nC9z8PUdwGMedC2iDMbeog==EAr24cWnfUvOGyA4",
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log("data:", data);
			responseString.value = JSON.stringify(data, null, 2);
			if (data.length == 0 && selectedId == "exercisesCB") {
				responseString.value += apiQueryStrings[selectedId].help;
			}
		})
		.catch(error => {
			// OK. This console.log messages took me _ages_ to get tight. From
			// puzzling over fetch's strangely vague exception, to consoles
			// special handing of 'error' object which breaks if string
			// interpolation kicks in, to apparently having to fall back to
			// old C printf-style to avoid en extraneous 'space'.
			console.log("Exception: %oFetched: %s", error, url);
			responseString.value = error;
			if (responseString.value.includes("HTTP Status")) {
				responseString.value += apiQueryStrings[selectedId].help;
			}
		});
	}
}
