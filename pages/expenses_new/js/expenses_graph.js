let myLineChart;
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
            if (expenses.date == date2string(day) && expenses.expenses == '収入') {
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
    myLineChart = new Chart(ctx, {
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
    if (day < 10 && month < 10) {
        return `${year}-0${month}-0${day}`;
    } else if (day < 10 && month > 10) {
        return `${year}-${month}-0${day}`;
    } else if (day > 10 && month < 10) {
        return `${year}-0${month}-${day}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}

let count = 0;
function changeMonth(c) {
    count += c
    expensesGraph(currentMonth + count);
    myLineChart.update();
}
expensesGraph(currentMonth);
let myChart;
function expensesBarGraph(month) {
    var year = date.getFullYear();

    // 月末の日付
    var MonthLast = new Date(year, month+1, 0);

    var days = [...Array(MonthLast.getDate())].map((_, i) => i+1)
    var amountsPay = []
    
    var maxNum = 0;
    var sumNum = 0;
    var stepNum = 1000;
    var categoryStr = ["", "食費", "日用品", "たばこ/酒", "趣味", "交通", "住宅", "水道光熱/通信", "クレジット"];
    categoryStr.forEach((category) => {
        for (let i=0; i<days.length; i++) {
            var amount = 0;
            var day = new Date(year, month+1, days[i]);
        
            expensesDatas.forEach((expenses) => {
                if (expenses.category == category) {
                    if (expenses.date == date2string(day)) {
                        amount += expenses.amount
                    }
                }
            });
        
            if (maxNum < amount) {
                maxNum = amount;
            }
            sumNum += amount;
            amountsPay.push(amount);
        };
    });

    if (maxNum > 50000) {
        stepNum = 10000;
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    if (myChart instanceof Chart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: categoryStr,
          datasets: [
            {
              label: "ジャンル",
              data: amountsPay,
            //   backgroundColor: ["#b2cbe4", "#ccd7e3", "#ccd7e3"], // 背景色の設定
            },
          ],
        },
        options: {
          indexAxis: "y", // 横棒グラフ
          responsive: true,
          layout: {
            padding: {
              right: 50, // ラベル表示のために余白を追加
            },
          },
          plugins: {
            legend: {
              display: false, // 凡例を非表示
            },
            tooltip: {
              enabled: false, // ツールチップを非表示
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false, // 縦線を非表示
              },
            },
            y: {
              grid: {
                drawBorder: false, // Y軸の外枠を非表示（任意）
              },
            },
          },
        },
        plugins: [
          {
            id: "customDottedLines",
            afterDatasetsDraw(chart) {
              const { ctx, chartArea, scales } = chart;
              const dataset = chart.data.datasets[0];
    
              ctx.save();
              ctx.setLineDash([1, 2]); // 点線パターン: 1ピクセル線、2ピクセル間隔
              ctx.strokeStyle = "#000"; // 点線の色
    
              dataset.data.forEach((value, index) => {
                const yCenter = scales.y.getPixelForValue(index); // Y軸の中央位置を取得
                const xStart = scales.x.getPixelForValue(value); // バーの右端
                const xLabel = chartArea.right + 10; // ラベル位置（右側）
    
                // 点線を描画
                ctx.beginPath();
                ctx.moveTo(xStart, yCenter); // バーの右端中央からスタート
                ctx.lineTo(xLabel, yCenter); // ラベル位置中央で終了
                ctx.stroke();
    
                // ラベルを描画
                ctx.fillStyle = "#000"; // ラベルの色
                ctx.font = "12px Arial"; // ラベルのフォント
                ctx.fillText(value, xLabel + 5, yCenter + 4); // 数値ラベルを描画
              });
    
              ctx.restore();
            },
          },
        ],
    });
}
expensesBarGraph(currentMonth);