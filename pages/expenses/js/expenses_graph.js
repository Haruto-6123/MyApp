function expensesGraph(month) {
    var year = date.getFullYear();

    // 月末の日付
    var MonthLast = new Date(year, month+1, 0);

    var days = [...Array(MonthLast.getDate())].map((_, i) => i+1)
    var amountsPay = []
    var pockets = []
    
    var maxNum = 0;
    var sumNum = 0;
    var stepNum = 1000;

    for (let i=0; i<days.length; i++) {
        var amount = 0;
        var pocket = 0;
        var day = new Date(year, month+1, days[i]);
        expensesDatas.forEach((expenses) => {
            if (expenses.date == date2string(day) && expenses.expenses == true) {
                pocket += expenses.amount;
            } else if (expenses.date == date2string(day)) {
                amount += expenses.amount;
            }
        });
        if (maxNum < amount) {
            maxNum = amount;
        }
        sumNum += amount;
        amountsPay.push(amount);
        pockets.push(pocket);
    }
    
    if (maxNum > 50000) {
        stepNum = 10000;
    }

    var ctx = document.getElementById("myLineChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: '支出',
                    data: amountsPay,
                    borderColor: "rgba(255,0,0,1)",
                    backgroundColor: "rgba(0,0,0,0)"
                },
                {
                    label: '収入',
                    data: pockets,
                    borderColor: "rgba(0,0,255,1)",
                    backgroundColor: "rgba(0,0,0,0)"
                }
            ],
        },
        options: {
            title: {
                display: true,
                text: `${month+1}月（合計：${sumNum})`
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMax: maxNum,
                        suggestedMin: 0,
                        stepSize: stepNum,
                        callback: function(value, index, values){
                            return  value +  '円'
                        }
                    }
                }]
            },
        }
    });
}

function date2string(d) {
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    if (day < 10) {
        return `${year}-${month}-0${day}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}

expensesGraph(currentMonth);