let totalBudget=10000;
let totalExpense=0;
let categoryTotals={
    Food:0,
    Travel:0,
    Shopping:0,
    Education:0,
    Other:0,
};
let expensechart = new Chart(
    document.getElementById("expenseChart"),
    {
        type:"pie",
        data:{
            labels:["Food","Travel","Shopping","Education","Other"],datasets:[{
                data:[0,0,0,0,0]
            }]
        }
    }
);
function addExpense(){
    let name=
    document.getElementById("expenseName").value;
let amount=Number(document.getElementById("expenseAmount").value);
let category= document.getElementById("expenseCategory").value;
if (name==="" || amount <=0 || category===""){
    alert("enter valid expense details!");
    return ;
}
totalExpense+=amount;
categoryTotals[category]+=amount;
expensechart.data.datasets[0].data=[
    categoryTotals.Food,
    categoryTotals.Travel,
    categoryTotals.Shopping,
    categoryTotals.Education,
    categoryTotals.Other,
];
expensechart.update();
let balance=totalBudget-totalExpense;
document.querySelector(".expense h2").innerText= "₹"+ totalExpense;
document.getElementById("remainingBalance").innerText="₹"+ balance;
let item =document.createElement("li");
item.innerHTML = name + " - ₹" + amount + " - " + category +
'<button onclick="editExpense(this)">EDIT</button>' +
'<button onclick="deleteExpense(this)">DELETE</button>';
item.dataset.amount=amount;
item.dataset.category=category;
document.getElementById("expenseList").append(item);
document.getElementById("expenseName").value="";
document.getElementById("expenseAmount").value="";
}
function setBudget() {
    let newBudget = Number(document.getElementById("budgetAmount").value);

    if (newBudget <= 0) {
        alert("Please enter a valid budget!");
        return;
    }

    totalBudget = newBudget;

    let balance = totalBudget - totalExpense;

    document.getElementById("totalBudget").innerText = "₹" + totalBudget;
    document.getElementById("remainingBalance").innerText = "₹" + balance;

    document.getElementById("budgetAmount").value = "";
}
function deleteExpense(button) {
    let item = button.parentElement;

    let amount = Number(item.dataset.amount);
    let category = item.dataset.category;

    totalExpense -= amount;
    categoryTotals[category] -= amount;

    expensechart.data.datasets[0].data = [
        categoryTotals.Food,
        categoryTotals.Travel,
        categoryTotals.Shopping,
        categoryTotals.Education,
        categoryTotals.Other
    ];

    expensechart.update();

    document.querySelector(".expense h2").innerText = "₹" + totalExpense;
    document.getElementById("remainingBalance").innerText =
        "₹" + (totalBudget - totalExpense);

    item.remove();
}
function editExpense(button) {
    let item = button.parentElement;

    let oldAmount = Number(item.dataset.amount);
    let category = item.dataset.category;

    let newAmount = Number(prompt("Enter new amount:"));

    if (newAmount <= 0 || isNaN(newAmount)) {
        alert("Enter a valid amount!");
        return;
    }

    totalExpense = totalExpense - oldAmount + newAmount;
    categoryTotals[category] = categoryTotals[category] - oldAmount + newAmount;

    item.dataset.amount = newAmount;

    item.firstChild.textContent =
        item.firstChild.textContent.replace("₹" + oldAmount, "₹" + newAmount);

    expensechart.data.datasets[0].data = [
        categoryTotals.Food,
        categoryTotals.Travel,
        categoryTotals.Shopping,
        categoryTotals.Education,
        categoryTotals.Other
    ];

    expensechart.update();

    document.querySelector(".expense h2").innerText = "₹" + totalExpense;
    document.getElementById("remainingBalance").innerText =
        "₹" + (totalBudget - totalExpense);
}
function getSuggestion() {
    let suggestion = "";

    if (totalExpense === 0) {
        suggestion = "Start adding your expenses!";
    }
    else if (totalExpense > totalBudget * 0.8) {
        suggestion = "Your expenses are high! Try reducing shopping and other expenses.";
    }
    else if (totalExpense > totalBudget * 0.5) {
        suggestion = "Good! Try saving more by reducing unnecessary expenses.";
    }
    else {
        suggestion = "Excellent! You are managing your budget well. Keep saving!";
    }

    document.getElementById("aiSuggestion").innerText = suggestion;
}