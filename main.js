 // state of our application
 var state = {
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [
        {id:uniqueId(),name:'salary',amount:0,type:'income'},
        {id:uniqueId(),name:'Grocery',amount:0,type:'expense'},
        {id:uniqueId(),name:'guitar',amount:0,type:'expense'}
        // {name:'travel',amount:'3000',type:'expense'}
    ]
 }
 var balanceEl = document.querySelector('#balance');
 var incomeEl = document.querySelector('#income');
 var expenseEl = document.querySelector('#expense');
 var transactionsEl = document.querySelector('#transaction');
var incomeBtnEl = document .querySelector('#incomeBtn');
var expenseBtnEl = document .querySelector('#expenseBtn');
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');

 function init() {
    updateState();
    initListeners();
 }
 function uniqueId(){
     // random id generator
     return Math.round(Math.random() * 100000);
 }
 function initListeners() {
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}
 function onAddIncomeClick() {
   addTransactions(nameInputEl.value,amountInputEl.value,'income'); 
 }
 function onAddExpenseClick() {
   addTransactions(nameInputEl.value,amountInputEl.value,'expense');
 }
 function addTransactions(name,amount,type) {
    // var name = nameInputEl.value;
    // var amount = amountInputEl.value;
    if(name !== '' && amount !== ''){
        var transaction = 
    { id:uniqueId(),
    name:nameInputEl.value,
    amount:parseInt(amountInputEl.value),
    type:type};
        state.transactions.push(transaction);
        updateState();
    }
    else{
        alert('please eneter valid data');
    }
    nameInputEl.value = '';
    amountInputEl.value = '';
 }

 function onDeleteClick(event) {
   var id = parseInt(event.target.getAttribute('data-id'));
   var deleteIndex;
   for(var i = 0;i<state.transactions.length; i++){
    if(state.transactions[i].id === id){
        // remove krna hai 
        deleteIndex = i;
        break;
    }
   }
   state.transactions.splice(deleteIndex,1);
   updateState(); 
 }

 function updateState() {
    var balance = 0,
        income = 0,
        expense = 0,
        item;
    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];
        if (item.type === 'income') {
            income += item.amount;
        } else if (item.type === 'expense') {
            expense += item.amount;
        }
  }

  balance = income - expense;
  state.balance = balance;
  state.income = income;
  state.expense = expense;
  render();
}
 function render() {
    balanceEl.innerHTML = `Rs.${state.balance}`;
    incomeEl.innerHTML = `Rs.${state.income}`;
    expenseEl.innerHTML = `Rs.${state.expense}`;

    var transactionEl,containerEl,amountEl,btnEl;
    transactionsEl.innerHTML = '';
    for(var i = 0;i < state.transactions.length;i++){
        // li create krke name append kiya hai 
         item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);

  // then appending that to transactionsel which is the ul with id transaction
        transactionsEl.appendChild(transactionEl);
        containerEl = document.createElement('div');
      // tansactionel mein containerel daal diya 
      transactionEl.appendChild(containerEl);
        //fir amount create kiya 
        amountEl = document.createElement('span');
        //amount check krenge income hai ya expense hai uske type se 
        if(item.type == 'income'){
            amountEl.classList.add('income-amt') ;
        }
        else if(item.type== 'expense')
        {
            amountEl.classList.add('expense-amt') ;
    }
    // amount fetch karke usko container mein daal diya 
    amountEl.innerHTML = `Rs.${item.amount}`;
    containerEl.appendChild(amountEl);
    btnEl = document.createElement('button');
    btnEl.setAttribute('data-id',item.id);
    btnEl.innerHTML = 'X';
    btnEl.addEventListener('click',onDeleteClick);
    // butotn ko container div mein add kar diya  
    containerEl.appendChild(btnEl);
     }
 }
 
 init(); 
