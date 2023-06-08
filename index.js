let tbody = document.getElementById("tbody");

//Fetch from json server
fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    json.map((value) => {
      let data = document.createElement("tr");
      data.innerHTML = `
            <tr>
                <td>${value.id}</td>
                <td>${value.name}</td>
                <td>${value.status}</td>
                <td>${value.salary}</td>
                <td>
                    <button class="btn btn-warning" onclick="editBtn(${value.id})">Edit</button>
                    <button class="btn btn-warning" onclick="deleteBtn(${value.id})">Delete</button>
                </td>
            </tr>
        `;
      tbody.append(data);
    });
    // return data;
  });

// Insert data to json server
let idInput = document.getElementById("id");
let nameInput = document.getElementById("name");
let statusInput = document.getElementById("status");
let salaryInput = document.getElementById("salary");

let submit = document.getElementById("submit");

submit.addEventListener("click", function () {
  let dataToJson = {
    id: idInput.value,
    name: nameInput.value,
    status: statusInput.value,
    salary: salaryInput.value,
  };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToJson),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "created");
    })
    .catch((err) => {
      console.log("Fail to submit to json server", err);
    });
});

//Edit to data
function editBtn(id) {
    submit.style.display="none";
    idInput.style.display="none";
    save.style.display="inline-block";
  fetch(`http://localhost:3000/users/${id}`, {
    method: "GET",
    header: {
      "content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      idInput.value = json.id;
      nameInput.value = json.name;
      statusInput.value = json.status;
      salaryInput.value = json.salary;
    });
}
// After click on edit save data to json server
let save = document.getElementById("save");

save.addEventListener("click", function () {
    submit.style.display="block";
  let dataToJson = {
    name: nameInput.value,
    status: statusInput.value,
    salary: salaryInput.value,
  };
  
   let id = idInput.value;

  fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToJson),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Saved data to json server");
    })
    .catch((err) => {
      console.log("Fail to submit to json server", err);
    });
});

//Delete data from json server
function deleteBtn(id) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
    header: {
      "content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("You deleted data successfully");
      } else {
        throw Error("Not success");
      }
    })
    .catch((err) => {
      console.log("not deleted", err);
    });
}
