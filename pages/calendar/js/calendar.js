function createCalendar(month) {
    var year = date.getFullYear();
    if (month > 11) {
        month = 0;
        year = year + 1;
    }

    const monthDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let calendarHTML = '<table class="calendar">';
    calendarHTML += `<caption class="month">${month+1}</caption>`
    calendarHTML += '<thead><tr>'

    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            calendarHTML += `<th class="sun">${monthDays[i]}</th>`;
        } else if (i === 6) {
            calendarHTML += `<th class="sat">${monthDays[i]}</th>`;
        } else {
            calendarHTML += `<th>${monthDays[i]}</th>`;
        }
    }

    calendarHTML += '</tr></thead><tbody>';

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 今月の末日
    const firstDay = new Date(year, month, 1).getDay(); // 今月の初日曜日
    const daysInPrevMonth = new Date(year, month, 0).getDate(); // 先月

    let dayCount = 1;
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < 6; i++) {
        calendarHTML += '<tr>';

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                calendarHTML += `<td class="mute"><button>${prevDayCount}</button></td>`;
                prevDayCount++;
            } else if (dayCount > daysInMonth) {
                let nextMonthDayCount = dayCount - daysInMonth;
                calendarHTML += `<td class="mute"><button>${nextMonthDayCount}</button></td>`;
                dayCount++;
            } else {
                // 今日の日付にclassを付ける
                if (dayCount === today && month === currentMonth) {
                    calendarHTML += `<td class="today"><button id="${year + '/' + currentMonth + '/' + dayCount}" type=”button” onclick="popdwindows(this)">${dayCount}</button></td>`;
                } 
                // 日曜日にclassを付ける
                else if (j === 0) {
                    calendarHTML += `<td class="off_sun"><button id="${year + '/' + currentMonth + '/' + dayCount}" type=”button” onclick="popdwindows(this)">${dayCount}</button></td>`;
                } 
                // 土曜日にclassを付ける
                else if (j === 6) {
                    calendarHTML += `<td class="off_sat"><button id="${year + '/' + currentMonth + '/' + dayCount}" type=”button” onclick="popdwindows(this)">${dayCount}</button></td>`;
                } else {
                    calendarHTML += `<td><button id="${year + '/' + currentMonth + '/' + dayCount}" type=”button” onclick="popdwindows(this)">${dayCount}</button></td>`;
                }
                dayCount++;
            }
        }

        calendarHTML += '</tr>';

        if (dayCount - daysInMonth > 7) {
            break;
        }
    }

    calendarHTML += '</tbody></table>';

    return calendarHTML;
}

function popdwindows(button) {
    var id = button.id;
    console.log(id);
}

document.getElementById('calendar').innerHTML = createCalendar(currentMonth) + createCalendar(currentMonth + 1);