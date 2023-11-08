import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import "./Calendar.css";

const UPDATE_HALL_MUTATION = gql`
  mutation Mutation($orderDays: [String]) {
    createOrder(orderDays: $orderDays) {
      success
      data
      access_token
    }
  }
`;

const HALLS_ORDER_DAYS = gql`
  query {
    halls {
      hallname
      orderDays
    }
  }
`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const { data } = useQuery(HALLS_ORDER_DAYS);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weeks = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];

  const renderCalendar = () => {  
    const currYear = currentDate.getFullYear();
    const currMonth = selectedMonth;
    const firstDayOfMonth = new Date(currYear, currMonth, 0).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    const days = [];

    // Добавляем элементы предыдущего месяца
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <li key={`prev-${i}`} className="inactive">
          {lastDateofLastMonth - i}
        </li>
      );
    }

    // Добавляем элементы текущего месяца
    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === currentDate.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
        ? "active" : "";

      const formattedDate = formatDate(new Date(currYear, currMonth, i));
      const orderDayCount = data && data.halls ? data.halls.filter((hall) =>
        hall.orderDays.includes(formattedDate)
      ).length : 0;

      const percentage = data && data.halls ? (orderDayCount / data.halls.length) * 100 : 0;
      let colorClass = "";

      if (percentage <= 35) {
        colorClass = "size-25";
      } else if (percentage > 35 && percentage <= 90) {
        colorClass = "size-50";
      } else {
        colorClass = "size-90";
      }

      const isSunday = new Date(currYear, currMonth, i).getDay() === 0;
      const dayClass = isToday ? "active" : orderDayCount ? "order-day " + colorClass : "";
      const dayNumberClass = isSunday ? "sunday" : "";

      days.push(
        <li key={i} className={dayClass} onClick={() => handleDayClick(i, formattedDate)}>
          <span className={`day-number ${dayNumberClass}`}>{i}</span>
        </li>
      );
    }

    // Добавляем элементы следующего месяца
    for (let i = lastDayofMonth + 1; i < 7; i++) {
      days.push(
        <li key={`next-${i}`} className="inactive">
          {i - lastDayofMonth}
        </li>
      );
    }

    return days;
  };

  const handleDayClick = (day, formattedDate) => {
    const selectedDay = new Date(currentDate.getFullYear(), selectedMonth, day);
    setSelectedDate(formattedDate);
    const selectedHall = data?.halls?.find((hall) =>
      hall.orderDays.includes(formattedDate)
    );
    if (selectedHall) {
      console.log(selectedHall.hallname);
    }
  };

  const handlePrevNextClick = (isPrev) => {
    setSelectedMonth((prevMonth) => (isPrev ? prevMonth - 1 : prevMonth + 1));
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const [updateHallMutation] = useMutation(UPDATE_HALL_MUTATION);

  const updateHall = () => {
    if (!selectedDate) {
      console.error("No selected date");
      return;
    }
  
    const selectedDay = new Date(selectedDate);
    const today = new Date();
  
    const selectedYear = selectedDay.getFullYear();
    const selectedMonth = selectedDay.getMonth();
    const selectedDayOfMonth = selectedDay.getDate();
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDayOfMonth = today.getDate();
  
    if (
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth) ||
      (selectedYear === currentYear && selectedMonth === currentMonth && selectedDayOfMonth <= currentDayOfMonth)
    ) {
      console.error("Selected date is in the past or today");
      return;
    }
  
    const variables = {
      orderDays: [selectedDate]
    };
  
    updateHallMutation({ variables })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="wrapper wrapper-calendar">
      <header>
        <p className="current-date">{`${months[selectedMonth]} ${currentDate.getFullYear()}`}</p>
        <div className="icons">
          <span id="prev" className="material-symbols-rounded" onClick={() => handlePrevNextClick(true)}>
            chevron_left
          </span>
          <span id="next" className="material-symbols-rounded" onClick={() => handlePrevNextClick(false)}>
            chevron_right
          </span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          {weeks.map((week, index) => (
            <li key={index} className={index === 6 ? "sun" : ""}>{week}</li>
          ))}
        </ul>
        <ul className="days">{renderCalendar()}</ul>
        <form onSubmit={updateHall}>
          <input className="date-input" type="text" value={selectedDate || ""} onChange={(e) => setSelectedDate(e.target.value)} />
          <button className="update-btn" type="submit">Update Hall</button>
        </form>
      </div>
    </div>
  );
}

export default Calendar;