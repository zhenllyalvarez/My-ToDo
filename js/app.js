const inputEl = document.querySelector(".inputElement");
const dateEl = document.querySelector(".dateEl");
let arrData = [];

renderData();

function renderData() {
    let totalValue = "";
  
    for (let i = 0; i < arrData.length; i++) {
      const data = arrData[i];
      const { inputData, inputDate, isDone } = data;
      let htmlTable = `
              <tr class="trEl" data-status="${isDone ? 'done' : 'pending'}">
                  <td class="${isDone ? 'line-through text-gray-500' : ''}">
                      <div class="boxP" id="dataEl">
                          <input class="checkBox" type="checkbox" ${isDone ? "checked" : ''} onclick="doneToDo(${i})">
                          <p class="name">${inputData},</p>
                          <p class="date">${inputDate}</p>
                      </div>
                      <div class="tdBtn">
                          <button class="removeBtn" onclick="removeToDo(${i})">X</button>
                      </div>
                  </td>
              </tr>
          `;
      totalValue += htmlTable;
    }
  
    const tableEl = document.querySelector(".tableData");
    tableEl.innerHTML = totalValue;

    let scrollBar = document.querySelector(".scrollBar");

    if (arrData.length >= 5) {
        scrollBar.style.maxHeight = "300px";
        scrollBar.style.overflowY = "scroll";
        scrollBar.style.overflowX = "hidden";
    } else {
        scrollBar.style.maxHeight = 'none';
        scrollBar.style.overflowY = 'unset';
    }
    itemLeft();
  }

async function fetchData() {
  try {
    const response = await fetch('api/todos')
    if(!response.ok) throw new Error("Network response is not ok!");
    const data = await response.json();
    if(Array.isArray(data)) {
        arrData = data.map(item => ({
        inputData: item.todo,
        inputDate: formatDate(item.date),
        isDone: item.status
      }));
      renderData();
    } else {
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error fetching data!:", error);
  }
}

async function addData() {
  try {
    const inputTodos = inputEl.value;
    const dateInput = dateEl.value
    const response = await fetch('/api/todos/add', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        todo: inputTodos,
        date: dateInput
      })
    });
    if(!response.ok) throw new Error("Network response is not ok!");
    const results = await response.json();
    if(results) {
      console.log("Data added successfully:", results);
    } else {
      console.log("Failed to add todo:", results);
    }

    inputEl.value = "";
    dateEl.value = "";
  } catch (error) {
    console.error("Error adding data!:", error);
  }
  fetchData();
}

const searchToDo = () => {
  let searchBtn = document.querySelector(".searchEl").value.toUpperCase();
  let dataSearch = document.querySelectorAll(".trEl");

  for(let i = 0; i < dataSearch.length; i++) {
    const p = dataSearch[i].getElementsByTagName("p")[0];
    const textValue = p.textContent || p.innerText;

    if(textValue.toUpperCase().indexOf(searchBtn) > -1) {
      dataSearch[i].style.display = "";
      // console.log(i);
    } else {
      dataSearch[i].style.display = "none";
    }
  }
}  

const addToDo = () => {
  let inputData = inputEl.value;
  let inputDate = dateEl.value;
  const isDone = false;

  if(inputData && inputDate) {
    arrData.push({
        inputData,
        inputDate,
        isDone
      });
  } else {
    alert("Please fill up properly!");
  }

  inputEl.value = "";
  dateEl.value = "";
  renderData();
};

async function updateStatus(index) {
    const todoId = arrData[index].id;
    const isDone = arrData[index]. isDone ? 1 : 0;
    try {
      const response = await fetch('')
    } catch (error) {
      console.error("Error in updating todo:", error);
    }
}

const doneToDo = (index) => {
  arrData[index].isDone = !arrData[index].isDone;
  renderData()
}

const removeToDo = (index) => {
    arrData.splice(index, 1);
    renderData();
}

function itemLeft(){
  const paraInfo = document.querySelector(".paraInfo");
  // const itemsLeft = arrData.length;
  const itemsLeft = arrData.filter(item => !item.isDone).length;

  paraInfo.textContent = `${itemsLeft} item${itemsLeft === 1 ? '' : 's'} left`;
  console.log(paraInfo);
}

function updateFilterSelection(selectedId) {
  // Remove the 'selected' class from all filter options
  document.querySelectorAll(".filterOption").forEach(p => {
      p.classList.remove("selected");
  });

  // Add the 'selected' class to the clicked filter option
  document.getElementById(selectedId).classList.add("selected");
}

function filterData(status) {
  const rows = document.querySelectorAll(".trEl"); // Select all rows with class "trEl"

  rows.forEach(row => {
      const rowStatus = row.getAttribute("data-status"); // Get the status from data attribute
      if (status === 'all' || rowStatus === status) {
          row.style.display = ''; // Show the row
      } else {
          row.style.display = 'none'; // Hide the row
      }
  });
}

function formatDate(date) {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}

const allValue = () => {
  filterData('all'); // Call filterData with 'all'
  updateFilterSelection('allFilter'); // Update the selected filter
}

const pendingData = () => {
  filterData('pending'); // Call filterData with 'pending'
  updateFilterSelection('pendingFilter'); // Update the selected filter
}

const completedData = () => {
  filterData('done'); // Call filterData with 'done'
  updateFilterSelection('completedFilter'); // Update the selected filter
} 

fetchData();