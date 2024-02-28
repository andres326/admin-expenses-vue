<script setup>
import { ref } from 'vue';
import Filter from './components/Filter.vue'
import Budget from './components/Budget.vue'
import BudgetManager from './components/BudgetManager.vue';
import newExpenseIcon from './assets/img/new_expense.svg'

const budget = ref(0)
const available = ref(0)

const defineBudget = (qty) => {
  budget.value = qty
  available.value = qty
}
</script>

<template>
  <div>
    <header>

      <h1>Expenses Planner</h1>
      <div class="container-header container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />
        <BudgetManager v-else :budget="budget" :available="available" />
      </div>
    </header>
    <main v-if="budget > 0">
      <div class="create-expense">
        <img :src="newExpenseIcon" alt="new expense icon" />
      </div>
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
</style>
