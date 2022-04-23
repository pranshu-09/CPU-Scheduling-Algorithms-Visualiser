var number;
var process = [];
var arrival = [];
var burst = [];
var priority = [];
var waitTime = [];
var turnArTime = [];
var sTime = [];
var cTime = [];
var totWait = 0;
var totTat = 0;

$(document).ready(function() {
  number = Math.floor(Math.random() * 10) + 1;

  for (let i = 0; i < number; i++) {
    process[i] = new Array(4);
  }

  for (let i = 0; i < number; i++) {
    arrival[i] = i;
  }

  for (let i = 0; i < number; i++) {
    burst[i] = Math.floor(Math.random() * 10) + 1;
  }

  for (let i = 0; i < number; i++) {
    priority[i] = Math.floor(Math.random() * 10) + 1;
  }

  for (let i = 0; i < number; i++) {
    process[i][0] = i + 1;
    process[i][1] = arrival[i];
    process[i][2] = burst[i];
    process[i][3] = priority[i];
  } 

  function dispData() {
    let p = "<span style=\"padding-left: 5px;\">" + number + "</span>";
    $(".fcfs-proc").append(p);

    for (let i = 0; i < number; i++) {
      let a = "<span style=\"padding-left: 5px;\">" + arrival[i] + "</span>";
      $(".fcfs-arr").append(a);
    }

    for (let i = 0; i < number; i++) {
      let b = "<span style=\"padding-left: 5px;\">" + burst[i] + "</span>";
      $(".fcfs-bur").append(b);
    }

    for (let i = 0; i < number; i++) {
      let c = "<span style=\"padding-left: 5px;\">" + priority[i] + "</span>";
      $(".Priority").append(c);
    }
  }

  function comp(a, b) {
    if (a[1] === b[1]) {
      return a[3] < b[3];
    }
    else {
      return a[1] < b[1];
    }
  }

  function calcAvg() {
    process.sort(comp);

    let service = [];
    service[0] = process[0][1];
    waitTime[0] = 0;

    for (let i = 1; i < number; i++) {
      service[i] = process[i - 1][2] + service[i - 1];
      waitTime[i] = service[i] - process[i][1];
      if (waitTime[i] < 0) {
        waitTime[i] = 0;
      }
    }

    for (let i = 0; i < number; i++) {
      turnArTime[i] = process[i][2] + waitTime[i];
    }

    sTime[0] = process[0][1];
    cTime[0] = sTime[0] + turnArTime[0];
    for (let i = 1; i < number; i++) {
      sTime[i] = cTime[i - 1];
      cTime[i] = sTime[i] + turnArTime[i] - waitTime[i];
    }
  }

  function dispTable() {
    let tb = document.querySelector(".tab-fcfs");
    for (let i = 0; i < number; i++) {
      totWait = totWait + waitTime[i];
      totTat = totTat + turnArTime[i];

      let tr = document.createElement("tr");
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      let th4 = document.createElement("th");
      let th5 = document.createElement("th");
      th1.innerHTML = process[i][0];
      th2.innerHTML = sTime[i];
      th3.innerHTML = cTime[i];
      th4.innerHTML = turnArTime[i];
      th5.innerHTML = waitTime[i];
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);
      tb.appendChild(tr);
    }

    document.querySelector(".bot-fcfs-con1").innerHTML = "AVERAGE WAITING TIME : " + (totWait / number);
    document.querySelector(".bot-fcfs-con2").innerHTML = "AVERAGE TURN AROUND TIME : " + (totTat / number);
  }

  dispData();
  calcAvg();
  dispTable();
});

$(".btn").click(function() {
  window.location.href=window.location.href;
});

window.onload = console.log('hello');
