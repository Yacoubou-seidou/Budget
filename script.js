const budget = document.getElementById("budget");
const addBudget = document.getElementById("addBudget");
const bien = document.getElementById("bien");
const credit = document.getElementById("credit");
const solde = document.getElementById("solde");
const expenseId = document.getElementById("expenseId");
const expenseName = document.getElementById("expenseName");
const expenseValue = document.getElementById("expenseValue");
const addExpense = document.getElementById("addExpense");
const expenseTitle = document.getElementById("expenseTitle");
const expenseMontant = document.getElementById("expenseMontant");
const expenseOperation = document.getElementById("expenseOperation");
const notif = document.getElementById("notif");
const content = document.getElementById("content");

let globalBudget = 0;
let globalExpense = [];
let message = type = "";

window.addEventListener("load", function () {
    calculate();
});

budget.addEventListener("change", () => {
    if (budget.value < 0) {
        budget.value = "";
        message = "Votre buget doit être positive";
        type = "info";
        notification(notif, message, type);
    }
});

addBudget.addEventListener("click", e => {
    e.preventDefault();
    let budgetValue = budget.value;
    if (budgetValue == "") {
        message = "Vous devez en amont saisir une valeur avant de sauvegarder";
        type = "danger";
        notification(notif, message, type);
    } else {
        message = "Votre budget a été ajouté avec success";
        type = "success";
        notification(notif, message, type);
        globalBudget += parseInt(budgetValue);
        budget.value = "";
    }
    calculate();
});

expenseName.addEventListener("change", () => {
    if (expenseName.value.length < 2) {
        expenseName.value = "";
        message =
            "La designation de votre depense doit comporter au moins 2 caracteres";
        type = "info";
        notification(notif, message, type);
    }
});

expenseValue.addEventListener("change", () => {
    if (expenseValue.value < 0) {
        expenseValue.value = "";
        message = "Le montant de votre depense doit être positive";
        type = "info";
        notification(notif, message, type);
    }
});

addExpense.addEventListener("click", e => {
    e.preventDefault();
    let expense = {
        name: expenseName.value,
        montant: expenseValue.value,
    };
    if (expense.name == "" && expense.montant == "") {
        message =
            "Vous devez en amont saisir une designation et une valeur pour la depense avant de sauvegarder";
        type = "danger";
        notification(notif, message, type);
    } else {
        message = "Votre depense a été ajouté avec success";
        type = "success";
        notification(notif, message, type);
        const check = InArray (globalExpense, expenseName.value);
        if (expenseId.value != '' || check != '-1') {
            const index = (check != '-1') ? check : expenseId.value;
            if(check == '-1') globalExpense[index].name = expenseName.value;
            if(expenseId.value != ''){
                if(expenseId.value == check){
                    globalExpense[index].montant = expenseValue.value;
                } else {
                    globalExpense[index].montant =  parseInt(globalExpense[index].montant) + parseInt(expenseValue.value);
                    if(check != '-1') {
                        globalExpense.splice(expenseId.value, 1)
                    }
                }
            } else {
                globalExpense[index].montant =  parseInt(globalExpense[index].montant) + parseInt(expenseValue.value);
            }
            expenseId.value = "";
        } else {
            globalExpense.push(expense);
        }
        expenseName.value = expenseValue.value = "";
    }
    calculate();
});

function calculate() {
    let expense = 0;
    bien.innerHTML = `${numberWithEspace(globalBudget)} CFA`;
    let i = 0;
    let tr = "";
    for (global of globalExpense) {
        expense += parseInt(global.montant);
        let title = global.name;
        let montant = `${numberWithEspace(global.montant)} CFA`;
        let operate = `
            <button type="button" data-el="${i}" class="btn btn-light edit"><i class="fa-solid fa-pen-to-square text-info"></i></button>
            <button type="button" data-el="${i}" class="btn btn-light delete"><i class="fa-solid fa-trash text-danger"></i></button>
        `;

        tr += `
            <tr>
                <td class="col-md-4 text-center" >${title}</td>
                <td class="col-md-4 text-center">${montant}</d>
                <td class="col-md-4 text-center">${operate}</td>
            </tr>
        `;
        i++;
    }

    content.innerHTML = tr;
    credit.innerHTML = `${numberWithEspace(expense)} CFA`;
    let diff = globalBudget - expense;
    
    if (diff < 0) {
        solde.innerHTML = `${numberWithEspace(diff) * -1} CFA`;
        solde.classList.remove("text-success");
        solde.classList.add("text-danger");
    } else {
        solde.innerHTML = `${numberWithEspace(diff)} CFA`;
        solde.classList.add("text-success");
        solde.classList.remove("text-danger");
    }
    listen();
}

function notification(notif, message, type) {
    notif.innerHTML = `<div class="alert alert-${type} mt-2" role="alert">${message}</div>`;

    setInterval(() => {
        notif.innerHTML = "";
    }, 5000);
}

function numberWithEspace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// function editer la depense
function listen() {
    //Editer
    content.querySelectorAll(".edit").forEach((edit) => {
        edit.addEventListener("click", () => {
            const index = edit.getAttribute('data-el');
            expenseId.value = index;
            expenseName.value = globalExpense[index].name;
            expenseValue.value = globalExpense[index].montant;
        });
    });
    //Supprimer
    content.querySelectorAll(".delete").forEach((edit) => {
        edit.addEventListener("click", () => {
            expenseId.value = '';
            const index = edit.getAttribute('data-el');
            globalExpense.splice(index, 1);
            calculate()
        });
    });
}

function InArray (array, elem){
    let i = 0;
    for(arr of array){
        if(arr.name.toLowerCase() == elem.toLowerCase()){
            return i;
        }
        i++;
    }
    return -1;
}

