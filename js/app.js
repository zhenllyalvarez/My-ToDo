const inputEl = document.querySelector(".inputElement");
const dateEl = document.querySelector(".dateEl");
let arrData = JSON.parse(localStorage.getItem('localStorageToDO')) || [];

renderData();

function renderData() {
    let totalValue = "";
  
    for (let i = 0; i < arrData.length; i++) {
      const data = arrData[i];
      const { inputData, inputDate } = data;
      let htmlTable = `
              <tr class="trEl">
                  <td>
                      <div class="boxP" id="dataEl">
                          <input class="checkBox" type="checkbox">
                          <p class="name">${inputData}</p>
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

    localStorage.setItem('localStorageToDO', JSON.stringify(arrData));
  }
  

const addToDo = () => {
  let inputData = inputEl.value;
  let inputDate = dateEl.value;

  if(inputData && inputDate) {
    arrData.push({
        inputData,
        inputDate,
      });
  } else {
    alert("Please fill up properly!");
  }

  inputEl.value = "";
  dateEl.value = "";
  renderData();
};

const removeToDo = (index) => {
    arrData.splice(index, 1);
    renderData();
}
