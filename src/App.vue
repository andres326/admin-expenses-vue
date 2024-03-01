<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import Budget from './components/Budget.vue'
import BudgetManager from './components/BudgetManager.vue';
import Modal from './components/Modal.vue'
import Expense from './components/Expense.vue'
import Filter from './components/Filter.vue'
import { generateUID } from './helpers'
import newExpenseIcon from './assets/img/new_expense.svg'

const budget = ref(0)
const available = ref(0)
const spent = ref(0)
const filter = ref('')

const expenses = ref([])

const modal = reactive({
  show: false,
  animate: false
})

const expense = reactive({
  name: '',
  qty: '',
  category: '',
  id: null,
  date: ''
})

watch(expenses, () => {
  const total = expenses.value.reduce((total, expense) => expense.qty + total, 0)
  spent.value = total
  available.value = budget.value - spent.value
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
}, { deep: true })

watch(modal, () => {
  if (!modal.show) {
    resetExpenseState()
  }
}, { deep: true })

watch(budget, () => {
  localStorage.setItem('budget', budget.value)
})

onMounted(() => {
  const budgetStoraged = localStorage.getItem('budget')
  const expensesStoraged = localStorage.getItem('expenses')
  if (budgetStoraged) {
    budget.value = Number(budgetStoraged)
    available.value = Number(budgetStoraged)
  }
  if (expensesStoraged) {
    expenses.value = JSON.parse(expensesStoraged)
  }
})

const resetExpenseState = () => {
  Object.assign(expense, {
    name: '',
    qty: '',
    category: '',
    id: null,
    date: ''
  })
}
const defineBudget = (qty) => {
  budget.value = qty
  available.value = qty
}

const openModal = () => {
  modal.show = true
  setTimeout(() => {
    modal.animate = true
  }, 300)
}

const closeModal = () => {
  modal.animate = false
  setTimeout(() => { modal.show = false }, 300)
}

const saveExpense = () => {
  if (expense.id) {
    const { id } = expense
    const index = expenses.value.findIndex(exp => exp.id === id)
    expenses.value[index] = { ...expense }
  } else {
    expenses.value.push({
      ...expense,
      date: Date.now(),
      id: generateUID()
    })
  }

  closeModal()
  resetExpenseState()
}

const editExpense = (id) => {
  const expenseEdit = expenses.value.find(exp => exp.id === id)
  Object.assign(expense, { ...expenseEdit })
  openModal()
}

const deleteExpense = () => {
  expenses.value = expenses.value.filter(exp => exp.id !== expense.id)
  closeModal()
}

const filteredExpenses = computed(() => {
  if (filter.value) {
    return expenses.value.filter(exp => exp.category === filter.value)
  }
  return expenses.value
})

const resetApp = () => {
  expenses.value = []
  budget.value = 0
}
</script>

<template>
  <div :class="{ fixed: modal.show }">
    <header>
      <h1>Expenses Planner</h1>
      <div class="container-header container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />
        <BudgetManager v-else :budget="budget" :available="available" :spent="spent" @reset-app="resetApp" />
      </div>
    </header>
    <main v-if="budget > 0">
      <Filter v-model:filter="filter" />
      <div class="expenses-list container">
        <h2>{{ filteredExpenses.length > 0 ? 'Expenses List' : 'No expenses yet' }}</h2>
        <Expense v-for="expense in filteredExpenses" :key="expense.id" :expense="expense" @edit-expense="editExpense" />
      </div>
      <div class="create-expense">
        <img :src="newExpenseIcon" alt="new expense icon" @click="openModal" />
      </div>
      <Modal v-if="modal.show" @close-modal="closeModal" @save-expense="saveExpense" @delete-expense="deleteExpense"
        :modal="modal" :available="available" :id="expense.id" v-model:name="expense.name" v-model:qty="expense.qty"
        v-model:category="expense.category" />
    </main>
  </div>
</template>

<style>
:root {
  --blue: #3b82f6;
  --white: #FFF;
  --light-gray: #F5F5F5;
  --gray: #94a3b8;
  --dark-gray: #64748b;
  --black: #000
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--light-gray);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

.fixed {
  overflow: hidden;
  height: 100vh;
}

header {
  background-color: var(--blue);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 1.2rem;
  padding: 5rem;
}

.create-expense {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expense img {
  width: 5rem;
  cursor: pointer;
}

.expenses-list {
  margin-top: 10rem;
}

.expenses-list h2 {
  font-weight: 900;
  color: var(--dark-gray);
}
</style>
