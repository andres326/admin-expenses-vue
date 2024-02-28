
<script setup>
import { formatQty, formatDate } from '../helpers'

import SavingIcon from '../assets/img/saving_icon.svg'
import HomeIcon from '../assets/img/home_icon.svg'
import FoodIcon from '../assets/img/food_icon.svg'
import SundryExpensesIcon from '../assets/img/expenses_icon.svg'
import EntertainmentIcon from '../assets/img/entertainment_icon.svg'
import HealthIcon from '../assets/img/health_icon.svg'
import SubsIcon from '../assets/img/subs_icon.svg'

const props = defineProps({
  expense: {
    type: Object,
    required: true
  }
})
const dictIcons = {
  saving: SavingIcon,
  food: FoodIcon,
  home: HomeIcon,
  sundryExpenses: SundryExpensesIcon,
  entertainment: EntertainmentIcon,
  health: HealthIcon,
  subscription: SubsIcon
}

defineEmits(['edit-expense'])
</script>

<template>
  <div class="expense shadow">
    <div class="content">
      <img :src="dictIcons[expense.category]" alt="expense icon" class="icon" />
      <div class="details">
        <p class="category">{{ expense.category }}</p>
        <p class="name" @click="$emit('edit-expense', expense.id)">{{ expense.name }}</p>
        <p class="date">Date: <span>{{ formatDate(expense.date) }}</span></p>
      </div>
    </div>
    <p class="qty">{{ formatQty(expense.qty) }}</p>
  </div>
</template>


<style scoped>
.expense {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.icon {
  width: 5rem;
}

.details p {
  margin: 0 0 1rem 0;
}

.category {
  color: var(--gray);
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.name {
  color: var(--dark-gray);
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
}

.date {
  color: var(--dark-gray);
  font-size: 1.6rem;
  font-weight: 900;
}

.date span {
  font-weight: 400;
}

.qty {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
</style>