var arrival = [];
var burst = [];
var waitTime = [];
var turnArTime = [];
var compTime = [];
var process;
var totWait = 0;
var totTat = 0;
var quantum;

const roundRobin = () => {
  console.assert(arrival.length === burst.length);
  process = arrival.length;

  quantum = Number(document.getElementById("timeQuantum").value);

  function calcAvg() {
    let remTime = [];
    for (let i = 0; i < process; i++) {
      remTime[i] = burst[i];
    }
    let t = 0;
    let a = 0;
    while (true) {
      let done = true;
      for (let i = 0; i < process; i++) {
        if (remTime[i] > 0) {
          done = false;
          if (remTime[i] > quantum && arrival[i] <= a) {
            t = t + quantum;
            remTime[i] = remTime[i] - quantum;
            a++;
          } else {
            if (arrival[i] <= a) {
              a++;
              t = t + remTime[i];
              remTime[i] = 0;
              compTime[i] = t;
            }
          }
        }
      }
      if (done == true) {
        break;
      }
    }

    for (let i = 0; i < process; i++) {
      turnArTime[i] = compTime[i] - arrival[i];
      waitTime[i] = turnArTime[i] - burst[i];
    }
  }

  function dispTable() {
    let tb = document.querySelector(".tab-fcfs");
    for (let i = 0; i < process; i++) {
      totWait = totWait + waitTime[i];
      totTat = totTat + turnArTime[i];

      let tr = document.createElement("tr");
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      let th4 = document.createElement("th");
      let th5 = document.createElement("th");
      let th6 = document.createElement("th");
      th1.innerHTML = i + 1;
      th2.innerHTML = arrival[i];
      th3.innerHTML = burst[i];
      th4.innerHTML = waitTime[i];
      th5.innerHTML = turnArTime[i];
      th6.innerHTML = compTime[i];
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);
      tr.appendChild(th6);
      tb.appendChild(tr);
    }

    document.querySelector(".bot-fcfs-con1").innerHTML =
      "AVERAGE WAITING TIME : " + totWait / process;
    document.querySelector(".bot-fcfs-con2").innerHTML =
      "AVERAGE TURN AROUND TIME : " + totTat / process;
  }

  calcAvg();
  dispTable();
};

$(".btn").click(function () {
  document.querySelector(".tab-fcfs").innerHTML = `
    <tr>
      <th>PROCESS</th>
      <th>ARRIVAL TIME</th>
      <th>BURST TIME</th>
      <th>WAITING TIME</th>
      <th>TURN AROUND TIME</th>
      <th>COMPLETION TIME</th>
    </tr>
  `;
  roundRobin();
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
  arrival.push(Number(arrivalTimeFromInput));
  burst.push(Number(burstTimeFromInput));
  document.getElementById("data-input-form").reset();
});
