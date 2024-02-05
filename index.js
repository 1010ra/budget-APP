// mes variable
const erreurBudget = document.getElementById("erreur-budget");
const inputBudget = document.getElementById('inputBudget');
const btnCalculate = document.getElementById('btnCalculate');
const budgetTotale = document.getElementById('budgetTotale');
const depensTotale = document.getElementById('depensTotale');
const balanceTotale = document.getElementById('balanceTotale');
const errorExpense = document.getElementById('erreur-expense')
const inputProduit = document.getElementById('inputProduit');
const inputValeurs = document.getElementById('inputValeurs');
const btnSoldes = document.getElementById('btnSoldes');
const tableAffichage = document.getElementById('tableAffichage');
const btnHistory = document.getElementById('btnHistory');
const divHistory = document.getElementById('divHistory');
const btnClose = document.getElementById('btnClose');
const tbodyTableau = document.getElementById('tbodyTableau');
const tbodyHistory = document.getElementById('tbodyHistory')
const btnModifier = document.getElementById('btnModifier');

//=========================================================

let tabExpense = JSON.parse(localStorage.getItem('tabExpense')) || [];

//===========initialisation
if (!localStorage.getItem('budget')) {
  localStorage.setItem('budget', 0)

}
if (!localStorage.getItem('expense')) {
  localStorage.setItem('expense', 0)

}
if (!localStorage.getItem('balance')) {
  localStorage.setItem('balance', 0)

}


//======= recuperation
let totalBudget = JSON.parse(localStorage.getItem('budget'));
let totalExpense = JSON.parse(localStorage.getItem('expense'));
let totalBalance = JSON.parse(localStorage.getItem('balance'));

// console.log(totalBudget,totalExpense,totalBalance);


// console.log('notre tabEpense au debut => ', tabExpense);

//=================================== mes addEventListes=
//les valeurs ne doit pas etre vide ou negative
btnCalculate.addEventListener('click', function () {
  // console.log(inputBudget.value);

  if (inputBudget.value === "" || parseInt(inputBudget.value) < 0) {
    erreurBudget.classList.remove("d-none");
    inputBudget.value = "";
    setTimeout(() => {
      erreurBudget.classList.add("d-none");
    }, 2000);

  } else {


    totalBudget = totalBudget + parseInt(inputBudget.value);
    totalBalance = totalBudget - totalExpense;
    miseAjours()
    afficheResultat()
    inputBudget.value = "";
  }

});

//=============================================

btnHistory.addEventListener('click', function () {
  divHistory.classList.remove('d-none');
})

btnClose.addEventListener('click', function () {
  divHistory.classList.add('d-none');
})

// ===========================================================




//==========================mes functions
function viderLocal() {
  localStorage.clear()
  location.reload()

}

function tableau() {
  tbodyTableau.innerHTML = "";
  tbodyHistory.innerHTML = "";
  tabExpense.forEach((achat, index) => {
    tbodyTableau.innerHTML += `<tr>
    <td>${achat.achatTitle} </td>
    <td>${achat.achatValue} </td>
    <td><i onclick = "iconModifier(${index})" class="bi bi-pencil-square mx-2"></i>
    <i onclick ="supprimer(${index})"  class="iconDlete bi bi-trash-fill"></i></td>           
  </tr>`;

    tbodyHistory.innerHTML += ` <tr>
  <td>${index + 1}</td>
  <td>${achat.achatTitle} </td>
  <td>${achat.achatValue} </td>
</tr>`
  });


}
tableau()

//=============================================== pour modifier

let achatModifier = ''
function iconModifier(index) {
  achatModifier = tabExpense[index]
  // console.log(achatModifier);
  inputProduit.value = achatModifier.achatTitle;
  console.log('titre à modifier: ', inputProduit.value);
  inputValeurs.value = achatModifier.achatValue;
  console.log('montant à modifier: ', inputValeurs.value);
  btnSoldes.classList.add('d-none')
  btnModifier.classList.remove('d-none')
}

function modifierBtn() {
  let indexAchatModifier = tabExpense.indexOf(achatModifier);
  console.log('index à modifier: ', indexAchatModifier);
  let tab = tabExpense[indexAchatModifier];
  console.log('element à modifier: ', tab);
  let existAchat = tabExpense.find(achat => achat.achatTitle == inputProduit.value);
  if (inputProduit.value === "" || inputValeurs.value === "" || parseInt(inputValeurs.value) <= 0) {
    errorExpense.classList.remove("d-none");
    setTimeout(() => {
      errorExpense.classList.add("d-none");
    }, 2000);
    return;
  } else if (existAchat) {
    console.log('exist achat : ',existAchat);
    if (inputProduit.value === tab.achatTitle) {
      totalExpense = totalExpense - parseInt(tab.achatValue);
      totalExpense = totalExpense + parseInt(inputValeurs.value);
      totalBalance = totalBudget - totalExpense;
      tab.achatValue = parseInt(inputValeurs.value);
      console.log('element modifier: ',tab);
      miseAjours()
      afficheResultat()
      tableau()
      inputProduit.value = "";
      inputValeurs.value = "";
    } else {
      totalExpense = totalExpense - parseInt(tab.achatValue);
      totalExpense = totalExpense + parseInt(inputValeurs.value);
      totalBalance = totalBudget - totalExpense;
      existAchat.achatValue =existAchat.achatValue + parseInt(inputValeurs.value);
      tabExpense.splice(indexAchatModifier, 1)
      miseAjours()
      afficheResultat()
      tableau()
      inputProduit.value = "";
      inputValeurs.value = "";

    }
  }else{
    totalExpense - achatModifier.achatValue
        achatModifier.achatTitle = inputProduit.value;
        achatModifier.achatValue = parseInt(inputValeurs.value);
        totalExpense + parseInt(inputValeurs.value)
        totalBudget - totalExpense;
        totalBalance = totalBudget - totalExpense;
        miseAjours()
        afficheResultat()
        tableau()
        inputProduit.value = "";
        inputValeurs.value = "";
  }
}




//===========================================pour supprimer
function supprimer(index) {
  let supprimeAchat = tabExpense[index]
  // console.log(supprimeAchat);
  totalExpense -= supprimeAchat.achatValue;
  totalBalance = totalBudget - totalExpense

  tabExpense.splice(index, 1);
  miseAjours()
  afficheResultat()
  tableau()

}

//=======================================================
function AddExpense() {
  if (inputProduit.value === "" || inputValeurs.value === "" || parseInt(inputValeurs.value) <= 0) {
    errorExpense.classList.remove("d-none");
    setTimeout(() => {
      errorExpense.classList.add("d-none");
    }, 2000);
    return;
  } else {
    let achat = {
      id: Date.now(),
      achatTitle: inputProduit.value,
      achatValue: parseInt(inputValeurs.value)

    };
    let achatTitleAchat = achat.achatTitle;
    // console.log('achatTitle Achat =>', achatTitleAchat);
    let existAchat = tabExpense.find(achat => achat.achatTitle == achatTitleAchat);
    //  console.log('achat existe  =>', existAchat);
    if (existAchat) {
      existAchat.achatValue += achat.achatValue
      totalExpense = totalExpense + achat.achatValue
      totalBalance = totalBudget - totalExpense
      miseAjours()
      afficheResultat()
      tableau()
    } else {
      totalExpense = totalExpense + achat.achatValue
      totalBalance = totalBudget - totalExpense
      tabExpense.push(achat);
      miseAjours()
      afficheResultat()
      tableau()
    }
    inputProduit.value = ""
    inputValeurs.value = ""
  }
};


//=============================metre a jour localstorage
function miseAjours() {
  localStorage.setItem('budget', JSON.stringify(totalBudget))
  localStorage.setItem('expense', JSON.stringify(totalExpense))
  localStorage.setItem('balance', JSON.stringify(totalBalance))
  localStorage.setItem('tabExpense', JSON.stringify(tabExpense));

}

//=================================
function afficheResultat() {
  budgetTotale.innerHTML = `${totalBudget}F`
  depensTotale.innerHTML = `${totalExpense}F`
  balanceTotale.innerHTML = `${totalBalance}F`

}
afficheResultat()

//

const ctx = document.getElementById('myChart');

let tabLabelchart = [];
let tabDatachart = [];
tabExpense.forEach(achat => {
  tabLabelchart.push(achat.achatTitle);
  tabDatachart.push(achat.achatValue);
})
// console.log(tabLabelchart);
// console.log(tabDatachart);


function showChart() {
  let config = {
    type: 'doughnut',
    data: {
      labels: tabLabelchart,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: tabDatachart,//[12, 19, 3, 5, 2, 3],
        borderWidth: 0
      }]
    },
    options: {

      scales: {
        x: {
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
        }
      }
    }
  };

  let graphe = new Chart(ctx, config);
  return graphe;

}
// =================== APPEL DE LA FONCTION SHOWSART ================
showChart();
//


