const process = [];
let number;
let totWait = 0;
let totTat = 0;

const sjf = () => {
  number = process.length;

  // for (let i = 0; i < number; i++) {
  //   process[i] = new Array(6);
  // }
  // for (let i = 0; i < number; i++) {
  //   process[i][0] = i + 1;
  //   process[i][1] = Math.floor(Math.random() * 11);
  //   process[i][2] = Math.floor(Math.random() * 10) + 1;
  // }

  console.log(process);

  function calcAvg() {
    for (let i = 0; i < number; i++) {
      for (let j = 0; j < number - i - 1; j++) {
        if (process[j][1] > process[j + 1][1]) {
          for (let k = 0; k < 5; k++) {
            let swap = process[j][k];
            process[j][k] = process[j + 1][k];
            process[j + 1][k] = swap;
          }
        }
      }
    }

    let temp, val;
    process[0][3] = process[0][1] + process[0][2];
    process[0][5] = process[0][3] - process[0][1];
    process[0][4] = process[0][5] - process[0][2];

    for (let i = 1; i < number; i++) {
      temp = process[i - 1][3];
      let low = process[i][2];
      for (let j = i; j < number; j++) {
        if (temp >= process[j][1] && low >= process[j][2]) {
          low = process[j][2];
          val = j;
        }
      }
      process[val][3] = temp + process[val][2];
      process[val][5] = process[val][3] - process[val][1];
      process[val][4] = process[val][5] - process[val][2];
      for (let k = 0; k < 6; k++) {
        let swap = process[val][k];
        process[val][k] = process[i][k];
        process[i][k] = swap;
      }
    }
  }
  console.log(process);
  function compare(p1, p2) {
    console.log(p1, p2);
    if (p1[0] < p2[0]) return -1;
    else if (p1[0] > p2[0]) return 1;
    return 0;
  }
  process.sort(compare);
  console.log(process);

  function dispTable() {
    let tb = document.querySelector(".tab-fcfs");
    for (let i = 0; i < number; i++) {
      totWait = totWait + process[i][4];
      totTat = totTat + process[i][5];

      let tr = document.createElement("tr");
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      let th4 = document.createElement("th");
      let th5 = document.createElement("th");
      th1.innerHTML = process[i][0];
      th2.innerHTML = process[i][1];
      th3.innerHTML = process[i][2];
      th4.innerHTML = process[i][4];
      th5.innerHTML = process[i][5];
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);
      tb.appendChild(tr);
    }

    document.querySelector(".bot-fcfs-con1").innerHTML =
      "AVERAGE WAITING TIME : " + totWait / number;
    document.querySelector(".bot-fcfs-con2").innerHTML =
      "AVERAGE TURN AROUND TIME : " + totTat / number;
  }

  calcAvg();
  dispTable();
};

$(".btn").click(() => {
  document.querySelector(".tab-fcfs").innerHTML = `
          <tr>
            <th>PROCESS</th>
            <th>ARRIVAL TIME</th>
            <th>BURST TIME</th>
            <th>WAITING TIME</th>
            <th>TURN AROUND TIME</th>
          </tr>
  `;
  sjf();
});

$("#add-data-button").click((e) => {
  // e.preventDefault();
  const existingTable = document.getElementById("data-table").innerHTML;
  const arrivalTimeFromInput = document.getElementById("arr-time").value;
  const burstTimeFromInput = document.getElementById("burst-time").value;
  const updatedTable =
    existingTable +
    `
            <tr class="table-row">
              <th class="table-row-item">${arrivalTimeFromInput}</th>
              <th class="table-row-item">${burstTimeFromInput}</th>
            </tr>
  `;
  document.getElementById("data-table").innerHTML = updatedTable;

  const countOfProcesses = process.length;
  process.push([
    countOfProcesses + 1,
    Number(arrivalTimeFromInput),
    Number(burstTimeFromInput),
  ]);
  document.getElementById("data-input-form").reset();
});
