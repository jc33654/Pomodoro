// data setting
// date
const month = new Array(12);
month[0] = "01";
month[1] = "02";
month[2] = "03";
month[3] = "04";
month[4] = "05";
month[5] = "06";
month[6] = "07";
month[7] = "08";
month[8] = "09";
month[9] = "10";
month[10] = "11";
month[11] = "12";
const week = new Array(7);
week[0] = "Sun";
week[1] = "Mon";
week[2] = "Tue";
week[3] = "Wed";
week[4] = "Thu";
week[5] = "Fri";
week[6] = "Sat";
const dt = new Date();
const today = `${dt.getFullYear()}/${month[dt.getMonth()]}/${ dt.getDate()}/${week[dt.getDay()]}`;
const yt = new Date(dt.getTime() - 24 * 60 * 60 * 1000)
const yesterday = `${yt.getFullYear()}/${month[yt.getMonth()]}/${ yt.getDate()}/${week[yt.getDay()]}`;
const yyt = new Date(dt.getTime() - 2 * 24 * 60 * 60 * 1000)
const yyesterday = `${yyt.getFullYear()}/${month[yyt.getMonth()]}/${ yyt.getDate()}/${week[yyt.getDay()]}`;


// pomodoro;
let isWork = true;
let isClockRunning = false;
// let workSessionDuration = 1500; // = 25 mins
// let currentTimeLeftInSession = 1500; //目前時段剩餘時間
// let breakSessionDuration = 300; // ＝ 5mins
let workSessionDuration = 5; // 測試用工作時間
let currentTimeLeftInSession = 5; //測試用目前時段剩餘時間
let breakSessionDuration = 3; // 測試用休息時間


// to do list;
// {
//     taskName: 任務內容,
//     taskStatus: 狀態(0:待處理,1:進行中,2:已完成),
//     taskWorkTimes: 工作鐘次數,
//     taskBreakTimes: 休息鐘次數,
//     taskDate : 日期
// }
let todoData = [{
    taskName: "回覆工作信件",
    taskStatus: 1,
    taskWorkTimes: 1,
    taskDate: today
}, {
    taskName: "討埨版面調整",
    taskStatus: 0,
    taskWorkTimes: 0,
    taskDate: today
}, {
    taskName: "vue 線上課程",
    taskStatus: 0,
    taskWorkTimes: 0,
    taskDate: yesterday
}, {
    taskName: "廣告設計草稿",
    taskStatus: 0,
    taskWorkTimes: 0,
    taskDate: yesterday
}, {
    taskName: "繪畫練習",
    taskStatus: 0,
    taskWorkTimes: 0,
    taskDate: yesterday
}, {
    taskName: "paper reading",
    taskStatus: 2,
    taskWorkTimes: 3,
    taskDate: today
}, {
    taskName: "週計畫規劃",
    taskStatus: 2,
    taskWorkTimes: 2,
    taskDate: yesterday
}, {
    taskName: "鋼彈組裝",
    taskStatus: 2,
    taskWorkTimes: 4,
    taskDate: yyesterday
}, {
    taskName: "打掃寵物",
    taskStatus: 2,
    taskWorkTimes: 1,
    taskDate: yyesterday
}]

// chart
let chartData = { today: 0, week: 0, Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 }