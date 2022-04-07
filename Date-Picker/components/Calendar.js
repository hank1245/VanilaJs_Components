/* eslint-disable require-jsdoc */


class DatePicker extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render(size) {
    const datePicker = document.createElement('div');
    datePicker.className = 'date-picker';
    const datePickerInput = document.createElement('input');
    datePickerInput.readOnly = true;
    datePickerInput.placeholder = 'Select date';
    datePickerInput.type = 'text';
    const calendar = document.createElement('div');
    calendar.className = 'calendar';
    calendar.tabIndex = '0';
    const calendarNav = document.createElement('div');
    calendarNav.className = 'calendar-nav';
    const nextMonth = document.createElement('div');
    nextMonth.classList.add('arrows', 'next-mth');
    const prevMonth = document.createElement('div');
    prevMonth.classList.add('arrows', 'prev-mth');
    const leftArrow = document.createElement('i');
    leftArrow.classList.add('fa-solid', 'fa-caret-left');
    const rightArrow = document.createElement('i');
    rightArrow.classList.add('fa-solid', 'fa-caret-right');
    const monthYear = document.createElement('div');
    monthYear.className = 'month-year';
    const selectedMonth = document.createElement('div');
    selectedMonth.className = 'mth';
    const selectedYear = document.createElement('div');
    selectedYear.className = 'year';
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    nextMonth.appendChild(rightArrow);
    prevMonth.appendChild(leftArrow);
    monthYear.appendChild(selectedMonth);
    monthYear.appendChild(selectedYear);
    calendarNav.appendChild(prevMonth);
    calendarNav.appendChild(monthYear);
    calendarNav.appendChild(nextMonth);
    calendar.appendChild(calendarNav);
    calendar.appendChild(calendarGrid);
    datePicker.appendChild(datePickerInput);
    datePicker.appendChild(calendar);
    document.querySelector('body').appendChild(datePicker);

    document.documentElement.style.setProperty('--width', `${size}px`);

    const months = ['January', 'February', 'March', 'April',
      'May', 'June', 'July',
      'August', 'September',
      'October',
      'November', 'December'];

    const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();

    let chosenDate = date;

    selectedMonth.textContent = months[month];
    selectedYear.textContent = year;

    changeYearMonth(year, month);

    datePickerInput.addEventListener('focusin', showCalendar);
    calendar.addEventListener('focusout', hideCalendar);
    nextMonth.addEventListener('click', goToNextMonth);
    prevMonth.addEventListener('click', goToPrevMonth);


    function showCalendar() {
      calendar.classList.add('active');
      document.querySelector('.calendar').focus();
    }

    function hideCalendar() {
      calendar.classList.remove('active');
    }


    function goToNextMonth(e) {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      changeYearMonth(year, month);
    }

    function goToPrevMonth(e) {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
      changeYearMonth(year, month);
    }


    function checkLeapYear(year) {
      if (year%400 ==0) {
        return true;
      } else if (year%100 == 0) {
        return false;
      } else if (year%4 == 0) {
        return true;
      } else {
        return false;
      }
    };

    function getFirstDayOfWeek(year, month) {
      // 1일이 무슨 요일인지를 받아온다.
      return (new Date(year+'-'+month+'-01')).getDay();
    }

    function changeYearMonth(year, month) {
      const monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month == 2) {
        if (checkLeapYear(year)) monthDay[1] = 29;
      }
      const firstDayOfWeek = getFirstDayOfWeek(year, month+1);
      const arrCalendar = [];
      for (let i=0; i< firstDayOfWeek; i++) {
        const lastMonthDay = monthDay[month<1 ? 11 : month-1]-
        (firstDayOfWeek-1-i);
        arrCalendar.push(String(lastMonthDay));
      }

      for (let i = 1; i<=monthDay[month]; i++) {
        arrCalendar.push(String(i));
      }
      const remainDay = 7 - (arrCalendar.length%7);
      if (remainDay < 7) {
        for (let i =0; i<remainDay; i++) {
          arrCalendar.push(i+1);
        }
      }
      renderDays(arrCalendar, firstDayOfWeek, remainDay);
      selectedMonth.textContent = months[month];
      selectedYear.textContent = year;
    }

    function renderDays(data, prevdays, nextdays) {
      calendarGrid.innerHTML = '';
      for (let i = 0; i< weeks.length; i++) {
        const week = document.createElement('div');
        week.className = 'week';
        week.innerHTML = weeks[i];
        calendarGrid.appendChild(week);
      }
      for (let i = 0; i<prevdays; i++) {
        const prev = document.createElement('div');
        prev.className = 'not-this-month';
        prev.innerHTML = data[i];
        prev.addEventListener('click', function() {
          chosenDate = new Date(year+'-'+(month)+'-'+(data[i]));
          datePickerInput.value = formatDate(chosenDate);
          console.log(formatDate(chosenDate));
          hideCalendar();
        });
        calendarGrid.appendChild(prev);
      }
      for (let i = prevdays; i< data.length-nextdays; i++) {
        const newDay = document.createElement('div');
        newDay.className = 'day';
        newDay.innerHTML = data[i];
        const todayYear = new Date().getFullYear();
        const todayMonth = new Date().getMonth();
        const today = new Date().getDate();
        if (today == data[i] && todayYear == year && todayMonth == month) {
          newDay.classList.add('today');
        }

        newDay.addEventListener('click', function() {
          chosenDate = new Date(year+'-'+(month+1)+'-'+(data[i]));
          datePickerInput.value = formatDate(chosenDate);
          console.log(formatDate(chosenDate));
          hideCalendar();
        });
        calendarGrid.appendChild(newDay);
      } // 다음달에서 넘어온 날짜 생성. 인자가 7이라면 없는것이다.
      for (let i = data.length-nextdays; i<data.length; i++) {
        const next = document.createElement('div');
        if (nextdays == 7) {
          next.className = 'day';
        } else {
          next.className = 'not-this-month';
        }
        next.innerHTML = data[i];
        next.addEventListener('click', function() {
          chosenDate = new Date(year+'-'+(month+2)+'-'+(data[i]));
          datePickerInput.value = formatDate(chosenDate);
          console.log(formatDate(chosenDate));
          hideCalendar();
        });
        calendarGrid.appendChild(next);
      }
    }

    function formatDate(d) {
      let day = d.getDate();
      if (day < 10) {
        day = '0' + day;
      }

      let month = d.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }

      const year = d.getFullYear();

      return year + '-' + month + '-' + day;
    }
  }
}

customElements.define('date-picker', DatePicker);

export default DatePicker;

