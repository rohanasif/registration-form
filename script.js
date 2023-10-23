const inputs = document.querySelectorAll("input");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const tbody = document.querySelector("tbody");
const data = [];

showData();

submitBtn.addEventListener("click", () => {
	const obj = {};
	inputs.forEach((input) => {
		if (input.type === "text") {
			obj.name = input.value;
		} else if (input.type === "email") {
			obj.email = input.value;
		} else if (input.type === "password") {
			obj.password = input.value;
		}
	});

	var allData = JSON.parse(localStorage.getItem("data"));
	var emailExists = false;
	if (allData) {
		allData.forEach((person) => {
			if (person.email === obj.email) {
				emailExists = true;
				alert("This email already exists.");
			}
		});
	}

	if (
		!emailExists &&
		obj.name !== "" &&
		obj.email !== "" &&
		obj.password !== ""
	) {
		if (allData) {
			data.push(obj);
			localStorage.setItem("data", JSON.stringify(data));
		} else {
			localStorage.setItem("data", JSON.stringify([obj]));
		}
		inputs.forEach((input) => {
			input.value = "";
		});
		showData();
	} else if (!emailExists) {
		alert("Something is missing");
	}
});

function showData() {
	var allData = JSON.parse(localStorage.getItem("data"));
	tbody.innerHTML = "";
	if (allData && allData.length > 0) {
		allData.forEach((person, index) => {
			tbody.innerHTML += `<tr>
      <td>${person.name}</td>
      <td>${person.email}</td>
      <td><button class="editBtn" onclick=handleEdit(${index})>Edit</button></td>
      <td><button class="delBtn" onclick=handleDel(${index})>Delete</button></td>
    </tr>`;
		});
	}
}

function handleDel(i) {
	var a = JSON.parse(localStorage.getItem("data"));
	a.splice(i, 1);
	localStorage.setItem("data", JSON.stringify(a));
	showData();
}

var handleIndex = -1;

function handleEdit(i) {
	updateBtn.style.display = "inline-block";
	submitBtn.style.display = "none";
	var a = JSON.parse(localStorage.getItem("data"));
	inputs.forEach((input) => {
		if (input.type === "text") {
			input.value = a[i].name;
		} else if (input.type === "email") {
			input.value = a[i].email;
		} else if (input.type === "password") {
			input.value = a[i].password;
		}
	});
	handleIndex = i;
}

updateBtn.addEventListener("click", () => {
	var a = JSON.parse(localStorage.getItem("data"));
	if (handleIndex >= 0) {
		a[handleIndex].name = inputs[0].value;
		a[handleIndex].email = inputs[1].value;
		a[handleIndex].password = inputs[2].value;
		localStorage.setItem("data", JSON.stringify(a));
		showData();
		inputs.forEach((input) => {
			input.value = "";
		});
		handleIndex = -1;
	}
	updateBtn.style.display = "none";
	submitBtn.style.display = "inline-block";
});
