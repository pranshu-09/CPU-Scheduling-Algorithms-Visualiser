var arrival = [];
var burst = [];
var waitTime = [];
var turnArTime = [];
var process;
var totWait = 0;
var totTat = 0;

$(document).ready(function() {
  process = Math.floor(Math.random() * 10) + 1;

  for (let i = 0; i < process; i++) {
    arrival[i] = i;
  }

  for (let i = 0; i < process; i++) {
    burst[i] = Math.floor(Math.random() * 10) + 1;
  }

  function dispData() {
    let p = "<span style=\"padding-left: 5px;\">" + process + "</span>";
    $(".fcfs-proc").append(p);

    for (let i = 0; i < process; i++) {
      let a = "<span style=\"padding-left: 5px;\">" + arrival[i] + "</span>";
      $(".fcfs-arr").append(a);
    }

    for (let i = 0; i < process; i++) {
      let b = "<span style=\"padding-left: 5px;\">" + burst[i] + "</span>";
      $(".fcfs-bur").append(b);
    }
  }

  function calcAvg() {
    let service = [];
    service[0] = 0;
    waitTime[0] = 0;

    for (let i = 1; i < process; i++) {
      service[i] =  service[i - 1] + burst[i - 1];
      waitTime[i] = service[i] - arrival[i];
      if (waitTime[i] < 0) {
        waitTime[i] = 0;
      }
    }

    for (let i = 0; i < process; i++) {
      turnArTime[i] = burst[i] + waitTime[i];
    }
  }

  function dispTable() {
    let tb = document.querySelector(".tab-fcfs");
    for (let i = 0; i < process; i++) {
      totWait = totWait + waitTime[i];
      totTat = totTat + turnArTime[i];
      let compTime = turnArTime[i] + arrival[i];

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
      th6.innerHTML = compTime;
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);
      tr.appendChild(th6);
      tb.appendChild(tr);
    }

    document.querySelector(".bot-fcfs-con1").innerHTML = "AVERAGE WAITING TIME : " + (totWait / process);
    document.querySelector(".bot-fcfs-con2").innerHTML = "AVERAGE TURN AROUND TIME : " + (totTat / process);
  }

  dispData();
  calcAvg();
  dispTable();
});

$(".btn").click(function() {
  window.location.href=window.location.href;
});

window.onload = console.log('hello');
