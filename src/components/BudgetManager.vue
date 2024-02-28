
<script setup>
import graph from '../assets/img/graph.jpg'
import { formatQty } from '../helpers'

const props = defineProps({
  budget: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
})
</script>

<template>
  <div class="two-columns">
    <div class="graph-container">
      <img :src="graph" />
    </div>
    <div class="budget-container">
      <button class="reset-app">Reset values</button>
      <p><span>Budget:</span>
        {{ formatQty(budget) }}</p>
      <p><span>Available:</span>
        {{ formatQty(available) }}</p>
      <p><span>Spent:</span>
        $0</p>
    </div>
  </div>
</template>

<style scoped>
.two-columns {
  display: flex;
  flex-direction: column;
}

.two-columns> :first-child {
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }

  .two-columns> :first-child {
    margin-bottom: 0;
  }
}

.reset-app {
  background-color: #db2777;
  border: none;
  padding: 1rem;
  width: 100%;
  color: var(--white);
  font-weight: 900;
  text-transform: uppercase;
  border-radius: 1rem;
  transition: background-color 300ms ease;
}

.reset-app:hover {
  cursor: pointer;
  background-color: #c11d67;
}

.budget-container {
  width: 100%;
}

.budget-container p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--dark-gray);
}

@media (min-width: 768px) {
  .budget-container p {
    text-align: left;
  }
}

.budget-container span {
  font-weight: 900;
  color: var(--blue);
}
</style>