let users = [
  {
    id: 1,
    age: 20,
    name: "tan",
    gender: true,
  },
  {
    id: 2,
    age: 20,
    name: "phuong",
    gender: false,
  },
  {
    id: 3,
    age: 20,
    name: "thanh",
    gender: true,
  },
  {
    id: 4,
    age: 20,
    name: "minh",
    gender: true,
  },
  {
    id: 5,
    age: 20,
    name: "Duong",
    gender: true,
  },
];
let jobs = [
  {
    id: 1,
    name: "IT",
  },
  {
    id: 2,
    name: "Sửa chữa ô tô",
  },
  {
    id: 3,
    name: "Cơ khí",
  },
  {
    id: 4,
    name: "Xây dựng",
  },
];

let actions = [
  {
    id: 1,
    userId: 1,
    jobsId: 1,
    time: new Date(2023, 0, 2).getTime(),
  },
  {
    id: 2,
    userId: 2,
    jobsId: 2,
    time: new Date(2022, 3, 5).getTime(),
  },
  {
    id: 3,
    userId: 3,
    jobsId: 3,
    time: new Date(2021, 9, 10).getTime(),
  },
  {
    id: 4,
    userId: 4,
    jobsId: 4,
    time: new Date(2023, 1, 20).getTime(),
  },
  {
    id: 5,
    userId: 5,
    jobsId: 2,
    time: new Date(2023, 1, 20).getTime(),
  },
];

const list = document.querySelector(".list-jobs");
const addBtn = document.querySelector(".add-btn");
const importData = document.querySelector(".import-data");
const inputName = document.querySelector(".name-table");
const inputAge = document.querySelector(".age-table");
const selectJob = document.getElementById("job-tab");
const selectGender = document.getElementById("gender-tab");
const inputSearch = document.querySelector('.search');

function render() {
  const tableElement = document.createElement("table");
  const tr = document.createElement("tr");
  const id = document.createElement("th");
  id.innerHTML = "id";
  tr.appendChild(id);
  const name = document.createElement("th");
  name.innerHTML = "Tên";
  tr.appendChild(name);
  const age = document.createElement("th");
  age.innerHTML = "Tuổi";
  tr.appendChild(age);
  const gender = document.createElement("th");
  gender.innerHTML = "Giới tính";
  tr.appendChild(gender);
  const job = document.createElement("th");
  job.innerHTML = "Công việc";
  tr.appendChild(job);
  const action = document.createElement("th");
  action.innerHTML = "Action";
  tr.appendChild(action);
  tableElement.appendChild(tr);
  list.appendChild(tableElement);
  users.map((user, index) => {
    const userIdInActions = actions.find((u) => {
      return u.userId === user.id;
    });
    const idJobs = jobs.find((j) => {
      return j.id === userIdInActions.jobsId;
    });
    const trRow = document.createElement("tr");
    const dataId = document.createElement("td");
    dataId.innerHTML = index + 1;
    trRow.appendChild(dataId);
    const dataName = document.createElement("td");
    dataName.innerHTML = user.name;
    dataName.className = "name" + index;
    trRow.appendChild(dataName);
    const dataAge = document.createElement("td");
    dataAge.innerHTML = user.age;
    trRow.appendChild(dataAge);
    const dataGender = document.createElement("td");
    dataGender.innerHTML = user.gender ? "male" : "female";
    trRow.appendChild(dataGender);
    const dataJob = document.createElement("td");
    dataJob.innerHTML = idJobs.name;
    trRow.appendChild(dataJob);
    const dataBtn = document.createElement("td");
    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = `<button onclick={onEdit(${index})}>Sửa</button`;
    dataBtn.appendChild(btnEdit);
    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = `<button onclick={onDelete(${index})}>Xóa</button`;
    dataBtn.appendChild(btnDelete);
    trRow.appendChild(dataBtn);
    tableElement.appendChild(trRow);
  });
}

let newUser = [];
let newAct = [];
let isAddNew = false;

addBtn.addEventListener("click", () => {
  if (isAddNew == false) {
    importData.classList.remove("hidden");
    addBtn.textContent = "Thêm mới";
    isAddNew = true;
    newUser.id = Math.floor(Math.random() * 1000);
    inputName.addEventListener("change", (ev) => {
      inputName.value = ev.target.value;
      newUser.name = inputName.value;
    });
    inputAge.addEventListener("change", (ev) => {
      inputAge.value = ev.target.value;
      newUser.age = inputAge.value;
    });

    newAct.id = Math.floor(Math.random() * 1000);
    newAct.userId = newUser.id;
  } else {
    isAddNew = false;
    importData.classList.add("hidden");
    addBtn.textContent = "Thêm";
    const newGender = selectGender.value === "male" ? true : false;
    newUser.gender = newGender;
    const newJob = selectJob.value;
    switch (newJob) {
      case "it":
        newAct.jobsId = 1;
        break;
      case "scot":
        newAct.jobsId = 2;
        break;
      case "ck":
        newAct.jobsId = 3;
        break;
      case "xd":
        newAct.jobsId = 4;
        break;
      default:
    }
    users.push(newUser);
    actions.push(newAct);
    resetForm();
    clearForm();
    render();
  }
});

let selectUser;
let isEdit = false;

onEdit = (index) => {
  selectUser = users[index];
  const action = actions.find((act) => act.userId === selectUser.id);
  if (isEdit == false) {
    isEdit = true;
    addBtn.style.display = "none";
    importData.classList.remove("hidden");
    inputName.value = selectUser.name;
    inputAge.value = selectUser.age;
    selectGender.value = selectUser.gender ? "male" : "female";
    const nameJob = getJobIdByUserId(selectUser.id);
    switch (nameJob) {
      case "IT":
        selectJob.value = "it";
        break;
      case "Sửa chữa ô tô":
        selectJob.value = "scot";
        break;
      case "Cơ khí":
        selectJob.value = "ck";
        break;
      case "Xây dựng":
        selectJob.value = "xd";
        break;
      default:
    }
  } else {
    isEdit = false;
    addBtn.style.display = "block";
    importData.classList.add("hidden");
    selectUser.name = inputName.value;
    selectUser.age = inputAge.value;
    selectUser.gender = selectGender.value === "male" ? true : false;
    const valueJob = selectJob.value;
    switch (valueJob) {
      case "it":
        action.jobsId = 1;
        break;
      case "scot":
        action.jobsId = 2;
        break;
      case "ck":
        action.jobsId = 3;
        break;
      case "xd":
        action.jobsId = 4;
        break;
      default:
        action.jobsId = null;
    }
    console.log(action.jobsId);
    resetForm();
    clearForm();
    render();
  }
};

getJobIdByUserId = (userId) => {
  const action = actions.find((act) => act.userId === userId);
  if (action) {
    const job = jobs.find((job) => job.id === action.jobsId);
    if (job) {
      return job.name;
    }
  }
  return "";
};

onDelete = (id) => {
  if (confirm("Bạn chắc chắn muốn xóa chứ")) {
    users.splice(id, 1);
    clearForm();
    render();
  }
};

resetForm = () => {
  newAct = {};
  newUser = {};
  inputName.value = "";
  inputAge.value = "";
  selectGender.value = "";
  selectJob.value = "";
};

clearForm = () => {
  list.innerHTML = "";
};

inputSearch.addEventListener('input', (ev) => {
  const searchTerm = ev.target.value.toLowerCase();
  const tableRows = document.getElementsByTagName('tr');
  for (let i = 1; i < tableRows.length; i++) {
    const rowData = tableRows[i].getElementsByTagName('td');
    let rowMatchesSearch = false;

    for (let j = 0; j < rowData.length; j++) {
      const cellData = rowData[j].innerHTML.toLowerCase();
      if (cellData.includes(searchTerm)) {
        rowMatchesSearch = true;
        break;
      }
    }

    if (rowMatchesSearch) {
      tableRows[i].style.display = '';
    } else {
      tableRows[i].style.display = 'none';
    }
  }
})

render();
