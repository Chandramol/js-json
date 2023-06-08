let tbody = document.getElementById("tbody");

// show data on table
fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    json.forEach((value) => {
      let data = document.createElement("tr");
      data.innerHTML = `
            <tr>
                <td>${value.id}</td>
                <td>${value.name}</td>
                <td>${value.status}</td>
                <td>${value.salary}</td>
                <td>
                    <button class="btn btn-warning" onclick="editBtn(${value.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBtn(${value.id})">Delete</button>
                </td>
            </tr>
        `;
      tbody.append(data);
    });
  });

// To Add data in json server
let idIn = document.getElementById("id");
let nameIn = document.getElementById("name");
let statusIn = document.getElementById("status");
let salaryIn = document.getElementById("salary");

let submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  let dataOfjson = {
    id: idIn.value,
    name: nameIn.value,
    status: statusIn.value,
    salary: salaryIn.value,
  };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(dataOfjson),
  })
    .then((res) => res.jason())
    .then((value) => {
      console.log(value);
    })
    .catch((err) => {
      console.log("Not success to submit", err);
    });
});

// To Edit the data
const editBtn = (id) => {
  submit.style.display = "none";
  save.style.display = "inline-block";
  idIn.disabled=true;

  fetch(`http://localhost:3000/users/${id}`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((value) => {
      (idIn.value = value.id),
        (nameIn.value = value.name),
        (statusIn.value = value.status),
        (salaryIn.value = value.salary);
    })
    .catch((error) => {
      console.log(error);
    });
};
// To save this data
let save = document.getElementById("save");
save.onclick = function () {
    save.style.display="none";
    submit.style.display="inlie-block";

  let dataOfjson = {
    id: idIn.value,
    name: nameIn.value,
    status: statusIn.value,
    salary: salaryIn.value,
  };
  let id=idIn.value;

  fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(dataOfjson),
  })
    .then((res) => res.jason())
    .then((value) => {
      console.log(value);
    });
};

// To Delete the data
const deleteBtn = (id) => {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      console.log("Deleted SuccessFully...");
    } else {
      throw Error("Fail to Delete data");
    }
  });
};
