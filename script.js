// const displayuser = document.getElementById("displayuser");

// //data storage
// let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
// let budget_storage = Number(localStorage.getItem("budget")) || 0;

// function starttracker() {
//   const budget = document.getElementById("budget").value;
//   const expenseName = document.getElementById("expenses").value;
//   const expensePrice = document.getElementById("pricetag").value;

//   expenses.push(expenseName);
//   budget_storage.push(expensePrice);

//   displayuser.innerHTML = `<h1>Budget - /${budget}</h1>
//     <br> <h2>Expenses</h2>
//     <ul>
//     <li> The product is ${expenseName} the price is ${expensePrice}</li>
//     </ul>`;
//   expenseName.innerText = " ";
//   expensePrice.innerText = " ";
// }

const displayuser = document.getElementById("displayuser");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget_storage = Number(localStorage.getItem("budget")) || 0;

//chart
let pieChart;
let barChart;

function updateDisplay() {
  let totalExpenses = expenses.reduce((sum, e) => sum + e.price, 0);
  let remainingBudget = budget_storage - totalExpenses;

  let expenseList = expenses
    .map(
      (e, index) =>
        `<li>
          ${e.name} - ₹${e.price}
          <button id="delbtn" onclick="deleteExpense(${index})">Delete</button>
        </li>`
    )
    .join("");

  displayuser.innerHTML = `
   <h1>Budget: ₹${budget_storage}</h1>
    <h2>Expenses</h2>
    <ul>${expenseList}</ul>
      <h2 style="color:${remainingBudget < 0 ? "red" : "green"}">
      Remaining Budget: ₹${remainingBudget}
    </h2>
    <h2>Total Expenses: ₹${totalExpenses}</h2>
  `;

  updateCharts();
}

function starttracker() {
  const budget = Number(document.getElementById("budget").value);
  const expenseName = document.getElementById("expenses").value;
  const expensePrice = Number(document.getElementById("pricetag").value);

  if (budget) {
    budget_storage = budget;
    localStorage.setItem("budget", budget_storage);
  }

  if (expenseName && expensePrice) {
    expenses.push({ name: expenseName, price: expensePrice });
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  document.getElementById("expenses").value = "";
  document.getElementById("pricetag").value = "";

  updateDisplay();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateDisplay();
}

function updateCharts() {
  const labels = expenses.map((e) => e.name);
  const data = expenses.map((e) => e.price);

  const pieCtx = document.getElementById("expensePieChart").getContext("2d");

  if (pieChart) pieChart.destroy();

  pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
        },
      ],
    },
  });

  const barCtx = document.getElementById("expenseBarChart").getContext("2d");

  if (barChart) barChart.destroy();

  barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Expense Amount (₹)",
          data: data,
        },
      ],
    },
  });
}
updateDisplay();
