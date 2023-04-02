<template>
  <div class="calendar">
    <div class="calendar__content">
      <div class="content__header">
        <div class="goMonth" @click="prev">&lt;</div>
        <div class="header__month">
          <h1>{{ currentMonth.format("MMMM") }}</h1>
        </div>
        <div class="goMonth" @click="next">&gt;</div>
      </div>
      <div class="calendar__select">
        <select name="year" id="year">
          <option>Выбрат</option>
        </select>
        <select name="month" id="month">
          <option>Выбрат</option>
        </select>
      </div>
      <table class="calendar_table" cellspacing="6">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td
              v-for="day in week"
              :key="day.day"
              :class="getDayClasses(day)"
              @click="selectDay(day)"
            >
              {{ day.date.date() }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="save">
        <button>Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import moment from "moment";

export default {
  setup() {
    const currentMonth = ref(moment());
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const weeks = ref([]);
    const selectedDay = ref(null);
    const selectDay = (day) => {
      selectedDay.value = day;
    };

    const isToday = (day) => {
      return moment().isSame(day.date, "day");
    };

    const isSelected = (day) => {
      return (
        selectedDay.value && selectedDay.value.date.isSame(day.date, "day")
      );
    };

    const isMonth = (day) => {
      return !currentMonth.value.isSame(day.date, "month");
    };

    const isSunday = (day) => {
      return day.date.day() === 0;
    };

    const getDayClasses = (day) => {
      return {
        "is-today": isToday(day),
        "is-other-month": isMonth(day),
        "is-sunday": isSunday(day),
        selected: isSelected(day),
      };
    };

    const prev = () => {
      currentMonth.value.subtract(1, "month");
      makeCalendar();
    };

    const next = () => {
      currentMonth.value.add(1, "month");
      makeCalendar();
    };

    const makeCalendar = () => {
      const weeksArray = [];
      const startMonth = currentMonth.value.clone().startOf("month");
      const endMonth = currentMonth.value.clone().endOf("month");
      const startDate = startMonth.clone().startOf("isoWeek");
      const endDate = endMonth.clone().endOf("isoWeek");
      let currentDate = startDate.clone();

      while (currentDate.isBefore(endDate)) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          week.push({
            date: currentDate.clone(),
          });
          currentDate.add(1, "day");
        }
        weeksArray.push(week);
      }

      weeks.value = weeksArray;
    };

    makeCalendar();

    return {
      currentMonth,
      daysOfWeek,
      weeks,
      selectedDay,
      selectDay,
      isToday,
      isSelected,
      isMonth,
      isSunday,
      getDayClasses,
      prev,
      next,
      makeCalendar,
    };
  },
};
</script>
