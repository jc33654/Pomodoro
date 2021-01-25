$(function() {
    // hamburger
    $('.hamburgerList').click(function() {
        $('.hambergerDetail').toggle();
    })

    // date
    const todayText = `${dt.getFullYear()}/${month[dt.getMonth()]}/${ dt.getDate()}  ${week[dt.getDay()]}`;
    $('.date').text(todayText);

    // To Do List
    showToDoListHTML(todoData);

    // chart
    showChartData();

    // clock
    showDoingTaskHTML(todoData);
    $('.clockBTN').click(function() {
        if (isWork) {
            currentTimeLeftInSession = workSessionDuration;
            timerTagget(currentTimeLeftInSession);
        } else {
            currentTimeLeftInSession = breakSessionDuration;
            timerTagget(currentTimeLeftInSession);
        }
    })
    $('.reSetClock').click(function() {
        resetClock();
    })

});



// function --------------------------------------------------

function showDoingTaskHTML(todoData) {
    let tempWorkTimes = 0;
    for (let i in todoData) {
        if (todoData[i]['taskStatus'] == 1) {
            $('.doing h2').html(todoData[i]['taskName']);
            tempWorkTimes = todoData[i]['taskWorkTimes'];
            showWorkTimes(tempWorkTimes);
        }
    }
    if ($('.doing h2').html() === '') {
        $('.iconDoing').hide();
    } else {
        $('.iconDoing').show();
    }
}

function showToDoListHTML(todoData) {
    let listCount_todo = 0;
    let listCount_done = 0;
    $('.listToDo ul').html('');
    $('.listDone ul').html('');
    todoData.reverse()
    for (let i in todoData) {
        if (todoData[i]['taskStatus'] == 0 && listCount_todo < 3) {
            $('.tomatoIndex .listToDo ul').append(`<li>
                                                        <div class="flex">
                                                            <div class="iconUndo" taskname="${todoData[i]['taskName']}"></div>
                                                            <h5>${todoData[i]['taskName']}</h5>
                                                        </div>
                                                        <div class="icontodo" taskname="${todoData[i]['taskName']}"></div>          
                                                    </li>
                                                    <div class="listBorder"></div>`);
            listCount_todo++;
        } else if (todoData[i]['taskStatus'] == 2 && listCount_done < 3) {
            $('.tomatoIndex .listDone ul').append(`<li>
                                                        <div class="iconDone" taskname="${todoData[i]['taskName']}"></div>
                                                        <h5>${todoData[i]['taskName']}</h5>
                                                    </li>
                                                    <div class="listBorder"></div>`);
            listCount_done++;
        }

        if (todoData[i]['taskStatus'] == 0) {
            $('.tomatoList .listToDo ul').append(`<li>
                                                        <div class="flex">
                                                            <div class="iconUndo" taskname="${todoData[i]['taskName']}"></div>
                                                            <h5>${todoData[i]['taskName']}</h5>
                                                        </div>
                                                        <div class="icontodo" taskname="${todoData[i]['taskName']}"></div>           
                                                    </li>
                                                    <div class="listBorder"></div>`);
        }
        if (todoData[i]['taskStatus'] == 2) {
            $('.tomatoList .listDone ul').append(`<li>
                                                        <div class="iconDoneY" taskname="${todoData[i]['taskName']}"></div>
                                                        <h5>${todoData[i]['taskName']}</h5>
                                                    </li>
                                                    <div class="listBorder"></div>`);
        }
    }
    $('.tomatoIndex .listToDo .listBorder').last().remove();
    $('.tomatoIndex .listDone .listBorder').last().remove();
    $('.tomatoList .listToDo .listBorder').last().remove();
    $('.tomatoList .listDone .listBorder').last().remove();
    addTodoList();
    undoClick();
    doingClick();
}

// click function
function addTodoList() {
    $('.add-btn').click(function() {
        todoData.reverse();
        if ($(this).prev().val() != '') {
            let newData = {
                taskName: $(this).prev().val(),
                taskStatus: 0,
                taskWorkTimes: 0,
                taskBreakTimes: 0,
                taskDate: today
            }
            todoData.push(newData);
            showToDoListHTML(todoData);
            $('.add-input').val('')
        }
    });
}

function undoClick() {
    $('.icontodo').click(function() {
        todoData.reverse();
        let tempTaskName = $(this).attr('taskname');
        let tempWorkTimes = 0;
        for (let i in todoData) {
            if (todoData[i]['taskStatus'] == 1 && todoData[i]['taskName'] != tempTaskName) {
                todoData[i]['taskStatus'] = 0;
                todoData[i]['taskDate'] = today;
            } else if (todoData[i]['taskName'] == tempTaskName) {
                todoData[i]['taskStatus'] = 1;
                tempWorkTimes = todoData[i]['taskWorkTimes'];
                todoData[i]['taskDate'] = today;
            }
        }
        showToDoListHTML(todoData);
        showDoingTaskHTML(todoData);
        showWorkTimes(tempWorkTimes);
    })
}

function doingClick() {
    $('.iconUndo').click(function() {
        todoData.reverse();
        let tempTaskName = $(this).attr('taskname');
        for (let i in todoData) {
            if (todoData[i]['taskName'] == tempTaskName) {
                todoData[i]['taskStatus'] = 2;
                todoData[i]['taskDate'] = today;
                showToDoListHTML(todoData);
                showDoingTaskHTML(todoData);
            }
        }
    })
    $('.iconDoing').click(function() {
        todoData.reverse();
        let tempTaskName = $('.doing h2').html();
        for (let i in todoData) {
            if (todoData[i]['taskName'] == tempTaskName) {
                todoData[i]['taskStatus'] = 2;
                todoData[i]['taskDate'] = today;
                $('.doing h2').html('');
                $('.tomatoDot').html('');
                showToDoListHTML(todoData);
                showDoingTaskHTML(todoData);
            }
        }
    })
}

// 重設時間
function resetClock() {
    $('.clockWork').removeClass('rolling');
    $('.clockBreak').removeClass('rolling');
    $('.clockBTN').css('background-image', 'url(Tomato_img/playBTN.png)')
    clearInterval(clockTimer);
    isClockRunning = false;
    if (isWork) {
        changeSecToMin(workSessionDuration);
    } else {
        changeSecToMin(breakSessionDuration);
    }
}

// 開始＆暫停
function timerTagget(timeCount) {
    if (isClockRunning === true) {
        // PAUSE THE TIMER
        $('.clockWork').removeClass('rolling');
        $('.clockBreak').removeClass('rolling');
        $('.clockBTN').css('background-image', 'url(Tomato_img/playBTN.png)')
        clearInterval(clockTimer);
        isClockRunning = false;
    } else {
        // START THE TIMER
        $('.clockWork').addClass('rolling');
        $('.clockBreak').addClass('rolling');
        $('.clockBTN').css('background-image', 'url(Tomato_img/stopBTN.png)')
        clockTimer = setInterval(() => {
            timeCount--;
            changeSecToMin(timeCount);
            currentTimeLeftInSession = timeCount
            isWorkChange()
        }, 1000);
        isClockRunning = true;
    }
}

// 工作＆休息
function isWorkChange() {
    if (currentTimeLeftInSession <= 0 && isWork) {
        // RUNOUT 25 MIN
        $('.clockWork').hide();
        $('.clockBreak').show();
        $('.clockWork').removeClass('rolling');
        $('.clockBreak').removeClass('rolling');
        $('.clockBTN').css('background-image', 'url(Tomato_img/playBTN.png)')
        clearInterval(clockTimer);
        changeSecToMin(breakSessionDuration);
        isClockRunning = false;
        isWork = false;
        noteWorkTimes();
    } else if (currentTimeLeftInSession <= 0 && !isWork) {
        // RUNOUT 5 MIN
        $('.clockWork').show();
        $('.clockBreak').hide();
        $('.clockWork').removeClass('rolling');
        $('.clockBreak').removeClass('rolling');
        $('.clockBTN').css('background-image', 'url(Tomato_img/playBTN.png)')
        clearInterval(clockTimer);
        changeSecToMin(workSessionDuration);
        isClockRunning = false;
        isWork = true;
    }
}

// 紀錄番茄數量
function noteWorkTimes() {
    let tempTaskName = $('.doing h2').html();
    let tempWorkTimes = 0;
    for (let i in todoData) {
        if (todoData[i]['taskName'] == tempTaskName) {
            todoData[i]['taskWorkTimes']++;
            tempWorkTimes = todoData[i]['taskWorkTimes'];
        }
    }
    showWorkTimes(tempWorkTimes);
}

// 顯示番茄數量
function showWorkTimes(workTimes) {
    $('.tomatoDot').html('');
    for (let i = 0; i < workTimes; i++) {
        $('.tomatoDot').append(`<div class="icontimes"></div>`);
    }
    showChartData();
}

// 時間轉換
function changeSecToMin(timeCount) {
    const secondsLeft = timeCount;
    let result = "";
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);

    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time;
    }
    if (hours > 0) result += `${hours}:`;
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    $('.clockNumber h1').text(result.toString());
};

// chart Change
function showChartData() {
    countChartData();
    chart();
    $('#daliyTimes').html(chartData['today']);
    $('#weekilyTimes').html(chartData['week']);
}

function countChartData() {
    chartData = { today: 0, week: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 }
    for (let i in todoData) {
        chartData['week'] += todoData[i]['taskWorkTimes'];
        let weekly = todoData[i]['taskDate'].split('/')[3];
        if (todoData[i]['taskDate'] == today) {
            chartData['today'] += todoData[i]['taskWorkTimes'];
        }
        switch (weekly) {
            case 'Sun':
                chartData['Sun'] += todoData[i]['taskWorkTimes'];
                break;
            case 'Mon':
                chartData['Mon'] += todoData[i]['taskWorkTimes'];
                break;
            case 'Tue':
                chartData['Tue'] += todoData[i]['taskWorkTimes'];
                break;
            case 'Wed':
                chartData['Wed'] += todoData[i]['taskWorkTimes'];
                break;
            case 'Thu':
                chartData['Thu'] += todoData[i]['taskWorkTimes'];
                break;
            case 'Fri':
                chartData['Fri'] += todoData[i]['taskWorkTimes'];
                break;
            case 'Sat':
                chartData['Sat'] += todoData[i]['taskWorkTimes'];
                break;
        }
    }
}

// 圖表
function chart() {
    const ctx = document.getElementById("example");
    Chart.defaults.global.defaultFontColor = '#FFF';
    example = new Chart(ctx, {
        type: "bar", // 圖表類型
        data: {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // 標題
            datasets: [{
                label: "一週資訊", // 標籤
                data: [chartData['Sun'], chartData['Mon'], chartData['Tue'], chartData['Wed'], chartData['Thu'], chartData['Fri'], chartData['Sat']], // 資料
                backgroundColor: [ // 背景色
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                ],
                borderWidth: 1 // 外框寬度
            }],
        }
    });
}