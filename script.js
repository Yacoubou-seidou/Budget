// les variables elements du DOM
const moneyEl = document.getElementById("money-el");
const btnMoney = document.getElementById("btn-money");
const amountName = document.getElementById("amount-name");
const amountPrice = document.getElementById("amount-price");
const addAmount = document.getElementById("add-amount");
const budgetEl = document.getElementById("budget-el");
const expensesEl = document.getElementById("expenses-el");
const balanceEl = document.getElementById("balance-el");
const mesDepense = document.getElementById("mes-depense");
let argent = 0; //collecter dans la variable ensuite affecter au budget
let depenses = 0; //collecter ensuite affecter
let defo = 0; //collecter ensuite affecter
//function definir un budget
function addBudget() {
  if (moneyEl.value <= 0) {
    //si un budget n'est pas defini
    alert("Error");
  } else {
    //s'il est defini
    argent = moneyEl.value;
    budgetEl.textContent = argent;
  }
  //reinitialiser l'input
  moneyEl.value = "";
}
// function definir une depense
function addDepenses() {
  //si y'a une depense
  if (
    amountPrice.valueAsNumber > 0 &&
    amountName.value != "" &&
    budgetEl.textContent > 0
  ) {
    //affecter la depense
    depenses += amountPrice.valueAsNumber;
    expensesEl.textContent = depenses;
    balanceEl.textContent = argent - depenses;
    defo = amountPrice.valueAsNumber;
    //ajouter la depense dans mesdepenses
    mesDepense.innerHTML += `<div class="lesdepens">
            <h2 class="titre les-red">${amountName.value}</h2>
            <h2 class="titre depla les-red">${defo}</h2><span class="dollarr">Fcfa</span>
            <h2 class="titre les-red btn-par">
              <button class="icone edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="icone delete-btn" >
                <i class="fa-solid fa-trash deleted"></i>
              </button>
            </h2>
          </div>`;
    listen();
    //reinitialiser les input
    amountPrice.value = "";
    amountName.value = "";
  } else {
    //sinon erreur
    alert("error");
  }
  //mettre ajour les couleurs
  checkBalance();
}
//check balance etat pour afecter couleur
function checkBalance() {
  if (balanceEl.textContent < 0) {
    balanceEl.style.color = "red";
  } else {
    balanceEl.style.color = "green";
  }
}
// function editer la depense
function listen() {
  //modifier
  mesDepense.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("Hello World");
      //selection le parent exact du button
      let removeEl = this.parentNode.parentNode;
      console.log(this.parentNode);
      //prendre ses enfants pour collecter les données et les envoyer dans les inputs
      amountName.value = removeEl.children[0].textContent;
      amountPrice.value = removeEl.children[1].textContent;
      depenses = depenses - amountPrice.value;
      console.log(removeEl.children[0]);
      console.log(removeEl.children[1]);
      //affecter les numbres
      expensesEl.textContent = depenses;
      balanceEl.textContent = argent - depenses;
      //supprimer la div de la section
      mesDepense.removeChild(removeEl);
      //mettre a jours les couleurs
      checkBalance();
    });
  });
  //supprimer
  mesDepense.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log(this);
      //prender le- parent exact
      let removeEl = this.parentNode.parentNode;
      console.log(removeEl);
      //retirer la div
      mesDepense.removeChild(removeEl);
      //affecter les numbre
      depenses = depenses - removeEl.children[1].textContent;
      expensesEl.textContent = depenses;
      balanceEl.textContent = argent - depenses;
      //mettre a jours les couleurs
      checkBalance();
    });
  });
}
listen();
