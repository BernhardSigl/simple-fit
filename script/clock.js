let intervalsArray = [];
let intervalsStandardArray = [];
let preIntervalsStandardArray = [];
let gymDiaryArray = [];
let usersArray = [];

var resetTime = 0;
var pauseRun = true;
var lastRun = new Date();

let AUDIO_READY = new Audio('audio/ready.wav');
let AUDIO_GO = new Audio('audio/go.wav');
let audioReadyPlayed = false;
let audioGoPlayed = false;

let intervalTime = 0;
let firstIntervalTime = null;
let secondIntervalTime = null;
let thirdIntervalTime = null;
let firstPreIntervalTime = null;
let secondPreIntervalTime = null;

let preIntervalTime = 0;
let preIntervall = false;

let activeSPRBtn = null;
let activeIntervalBtn = null;
let activePreIntervalBtn = null;

// standard
let firstIntervalStandard = false;
let secondIntervalStandard = false;
let thirdIntervalStandard = false;
let firstPreIntervalStandard = false;
let secondPreIntervalStandard = false;
let thirdPreIntervalStandard = false;

let settings = false;
let preCounterId;

async function init() {
    document.getElementById('requiresAlertTimeId').classList.add('visibilityHidden');
    setTimeout(() => {
        document.getElementById('requiresAlertTimeId').classList.remove('visibilityHidden');
    }, 3000);
    await loadUsersArray();
    await loadLoggedInUser();
    await loadRememberMe();
    await checkEmptyUsers();
    await createIndividuallyIntervalsArray();
    await loadIndividuallyIntervals();

    await createIndividuallyIntervalsStandardArray();
    await loadIndividuallyIntervalsStandard();
    await loadIntervals();
    await createIndividuallyPreIntervalsStandardArray();
    await loadIndividuallyPreIntervalsStandard();

    checkIntervalsStandard();
    checkPreIntervalsStandard();

    setActiveSPRBtn('pauseBtnId');
    settings = false;
    await loadGymDiaryArray();
    let diaryRightBtnArea = document.getElementsByClassName('diaryRightBtnArea');
    for (let i = 0; i < diaryRightBtnArea.length; i++) {
        diaryRightBtnArea[i].style.display = 'none';
    }
    let inputDiaryBtns = document.getElementsByClassName('inputDiaryBtn');
    for (let i = 0; i < inputDiaryBtns.length; i++) {
        inputDiaryBtns[i].classList.add('inputDiaryBtnEdit');
        inputDiaryBtns[i].setAttribute('disabled', '');
    }
    let clickOnDiaryBtn = document.getElementsByClassName('clickOnDiaryBtn');
    for (let i = 0; i < clickOnDiaryBtn.length; i++) {
        clickOnDiaryBtn[i].classList.remove('dNone');
    }
    // document.getElementById('scrollboxId').classList.add('scrollboxStartPage');

    await welcomeMessage();
    if (firstIntervalTime === null || isNaN(firstIntervalTime)) {
        firstIntervalTime = false;
        document.getElementById('firstIntervalBtnId').innerHTML = 'Off';
    }
    if (secondIntervalTime === null) {
        secondIntervalTime = 3;
        document.getElementById('secondIntervalBtnId').innerHTML = '3';
    }
    if (thirdIntervalTime === null) {
        thirdIntervalTime = 4;
        document.getElementById('thirdIntervalBtnId').innerHTML = '4';
    }
    if (firstPreIntervalTime === null) {
        firstPreIntervalTime = 50;
        document.getElementById('preFirstPreIntervalBtnId').innerHTML = '10';
    } else {
        document.getElementById('preFirstPreIntervalBtnId').innerHTML = 60 - firstPreIntervalTime;
    }
    if (secondPreIntervalTime === null) {
        secondPreIntervalTime = 45;
        document.getElementById('preSecondIntervalBtnId').innerHTML = '15';
    } else {
        document.getElementById('preSecondIntervalBtnId').innerHTML = 60 - secondPreIntervalTime;
    }
    if (intervalTime === 0) {
        setGoFirst();
    }
    if (preIntervalTime === 0) {
        setPreIntervalOff();
    }
    if (intervalsStandardArray[0].secondIntervalStandard === true) {
        document.getElementById('intervalSecondNumberFieldId').style.background = '#413534';
    } else if (intervalsStandardArray[0].thirdIntervalStandard === true) {
        document.getElementById('intervalThirdNumberFieldId').style.background = '#413534';
    }
    if (preIntervalsStandardArray[0].secondPreIntervalStandard === true && intervalsStandardArray[0].firstIntervalStandard === false) {
        document.getElementById('preIntervalFirstNumberFieldId').style.background = '#413534';
    } else if (preIntervalsStandardArray[0].thirdPreIntervalStandard === true && intervalsStandardArray[0].firstIntervalStandard === false) {
        document.getElementById('preIntervalSecondNumberFieldId').style.background = '#413534';
    }
    document.getElementById('firstIntervalBtnId').innerHTML = 'Off';
    toggleVisibilityByClass('changeIntervalArea', false);
    toggleVisibilityById('contentStartPageId', true);
    document.getElementById('editAlertId').classList.remove('intervalLimit');
    document.getElementById('editPreAlertId').classList.remove('intervalLimit');
    document.getElementById('intervalSecondNumberFieldId').value = document.getElementById('secondIntervalBtnId').innerHTML;
    document.getElementById('intervalThirdNumberFieldId').value = document.getElementById('thirdIntervalBtnId').innerHTML;
    document.getElementById('preIntervalFirstNumberFieldId').value = document.getElementById('preFirstPreIntervalBtnId').innerHTML;
    document.getElementById('preIntervalSecondNumberFieldId').value = document.getElementById('preSecondIntervalBtnId').innerHTML;
    renderDiaryInputs();
    for (let i = 0; i < gymDiaryArray.length; i++) {
        toggleVisibilityById(`deleteDiaryBodypart_${i}`, false);
        toggleVisibilityById(`saveDiaryBodypart_${i}`, false);
    }
}

async function checkEmptyUsers() {
    if (usersArray.length === 0) {
        window.location.href = 'index.html';
        rememberMe = [];
        loggedInUser = [];
        await saveRememberMe();
        await saveLoggedInUser();
    }
}

async function createIndividuallyIntervalsArray() {
    if (loggedInUser.length !== 0) {
        for (let i = 0; i < usersArray.length; i++) {
            const user = usersArray[i];
            id = user.id;
            if (loggedInUser[0].name === user.username) {
                intervalsArray = user[`individuallyIntervals_${id}`] = [];
                return id, intervalsArray;
            }
        }
    } else {
        window.location.href = 'index.html';
    }
}

async function createIndividuallyIntervalsStandardArray() {
    if (loggedInUser.length !== 0) {
        for (let i = 0; i < usersArray.length; i++) {
            const user = usersArray[i];
            id = user.id;
            if (loggedInUser[0].name === user.username) {
                intervalsStandardArray = user[`individuallyIntervalsStandardArray_${id}`] = [];
                return id, intervalsStandardArray;
            }
        }
    } else {
        window.location.href = 'index.html';
    }
}

async function createIndividuallyPreIntervalsStandardArray() {
    for (let i = 0; i < usersArray.length; i++) {
        const user = usersArray[i];
        id = user.id;
        if (loggedInUser[0].name === user.username) {
            preIntervalsStandardArray = user[`individuallyPreIntervalsStandardArray_${id}`] = [];
            return id, preIntervalsStandardArray;
        }
    }
}

async function loadIntervals() {
    if (intervalsArray.length !== 0) {
        firstIntervalTime = intervalsArray[0].firstIntervalTime;
        secondIntervalTime = intervalsArray[0].secondIntervalTime;
        thirdIntervalTime = intervalsArray[0].thirdIntervalTime;
        firstPreIntervalTime = intervalsArray[0].firstPreIntervalTime
        secondPreIntervalTime = intervalsArray[0].secondPreIntervalTime
        document.getElementById('firstIntervalBtnId').innerHTML = firstIntervalTime;
        document.getElementById('secondIntervalBtnId').innerHTML = secondIntervalTime;
        document.getElementById('thirdIntervalBtnId').innerHTML = thirdIntervalTime;
        document.getElementById('preFirstPreIntervalBtnId').innerHTML = firstPreIntervalTime;
        document.getElementById('preSecondIntervalBtnId').innerHTML = secondPreIntervalTime;
    }
}

async function saveIntervals() {
    intervalsArray = [];
    firstIntervalTime = Number(document.getElementById('firstIntervalBtnId').innerHTML);
    secondIntervalTime = Number(document.getElementById('secondIntervalBtnId').innerHTML);
    thirdIntervalTime = Number(document.getElementById('thirdIntervalBtnId').innerHTML);
    firstPreIntervalTime = 60 - Number(document.getElementById('preFirstPreIntervalBtnId').innerHTML);
    secondPreIntervalTime = 60 - Number(document.getElementById('preSecondIntervalBtnId').innerHTML);
    intervalsArray.push({
        'firstIntervalTime': firstIntervalTime,
        'secondIntervalTime': secondIntervalTime,
        'thirdIntervalTime': thirdIntervalTime,
        'firstPreIntervalTime': firstPreIntervalTime,
        'secondPreIntervalTime': secondPreIntervalTime,
    });
    await setItem(`individuallyIntervals_${id}`, JSON.stringify(intervalsArray));
}

async function saveIntervalsStandard() {
    intervalsStandardArray = [];
    intervalsStandardArray.push({
        'firstIntervalStandard': firstIntervalStandard,
        'secondIntervalStandard': secondIntervalStandard,
        'thirdIntervalStandard': thirdIntervalStandard,
    })
    await setItem(`individuallyIntervalsStandardArray_${id}`, JSON.stringify(intervalsStandardArray));
}

async function savePreIntervalsStandard() {
    preIntervalsStandardArray = [];
    preIntervalsStandardArray.push({
        'firstPreIntervalStandard': firstPreIntervalStandard,
        'secondPreIntervalStandard': secondPreIntervalStandard,
        'thirdPreIntervalStandard': thirdPreIntervalStandard,
    })
    await setItem(`individuallyPreIntervalsStandardArray_${id}`, JSON.stringify(preIntervalsStandardArray));
}

function checkIntervalsStandard() {
    if (intervalsStandardArray.length === 0) {
        firstIntervalStandard = false;
        secondIntervalStandard = false;
        thirdIntervalStandard = false;
    } else if (intervalsStandardArray[0].firstIntervalStandard === true) {
        setGoFirst();
    } else if (intervalsStandardArray[0].secondIntervalStandard === true) {
        setGoSecond();
    } else if (intervalsStandardArray[0].thirdIntervalStandard === true) {
        setGoThird();
    }
}

function checkPreIntervalsStandard() {
    if (preIntervalsStandardArray.length === 0) {
        firstPreIntervalStandard = false;
        secondPreIntervalStandard = false;
        thirdPreIntervalStandard = false;
    } else if (preIntervalsStandardArray[0].firstPreIntervalStandard === true) {
        setPreIntervalOff();
    } else if (preIntervalsStandardArray[0].secondPreIntervalStandard === true) {
        setPreIntervalFirst();
    } else if (preIntervalsStandardArray[0].thirdPreIntervalStandard === true) {
        setPreIntervalSecond();
    }
}

async function welcomeMessage() {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const capitalizedUserName = capitalizeFirstLetter(loggedInUser[0].name);
    document.getElementById('welcomeMessageId').innerHTML = `Welcome ${capitalizedUserName}`;
}
let counterActive = false;
let preCounterActive = false;
function startTimer(duration, displayElementId) {
    let preTimer = duration, seconds;
    const display = document.getElementById(displayElementId);
    preCounterId = setInterval(function () {
        seconds = parseInt(preTimer % 60, 10);
        preCounterActive = true;
        let secondsString = seconds < 10 ? "0" + seconds : "" + seconds;
        display.textContent = secondsString;
        if (--preTimer < 0) {
            clearInterval(preCounterId);
            preTimer = 0;
            AUDIO_GO.play();
            pauseRun = false;
            preCounterActive = false;
            counterActive = true;
        }
    }, 1000);
}

function start() {
    setActiveSPRBtn('startBtnId');
    if (preIntervalTime !== false && counterActive === false && preIntervall === true) {
        startTimer(15, 'timeId');
    } else {
        pauseRun = false;
    }
}

function pause() {
    setActiveSPRBtn('pauseBtnId');
    pauseRun = true;
    clearInterval(preCounterId);
    if (preCounterActive === true) {
        updateDisplay();
    }
}

function reset() {
    setActiveSPRBtn('resetBtnId');
    pauseRun = true;
    resetTime = 0;
    audioReadyPlayed = false;
    audioGoPlayed = false;
    updateDisplay();
    AUDIO_GO.pause();
    clearInterval(preCounterId);
    counterActive = false;
}

function updateTime() {
    if (pauseRun === false) {
        resetTime += new Date() - lastRun;
        updateDisplay();
    }

    lastRun = new Date();
    setTimeout(updateTime, 1);
}

function updateDisplay() {
    let h = Math.floor(resetTime / 3600000);
    let m = Math.floor(resetTime / 60000) % 60;
    let s = Math.floor(resetTime / 1000) % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById('timeId').innerHTML = h + ":" + m + ":" + s;
    playSounds(m, s);
}

function setGoFirst() {
    setActiveIntervalBtn('firstIntervalBtnId');
    intervalTime = false;
    setPreIntervalOff();
}

function setGoSecond() {
    setActiveIntervalBtn('secondIntervalBtnId');
    if (intervalsArray.length === 0) {
        intervalTime = 4;
    } else {
        intervalTime = intervalsArray[0].secondIntervalTime;
    }
}

function setGoThird() {
    setActiveIntervalBtn('thirdIntervalBtnId');
    if (intervalsArray.length === 0) {
        intervalTime = 5;
    } else {
        intervalTime = intervalsArray[0].thirdIntervalTime;
    }
}

function setPreIntervalOff() {
    setActivePreIntervalBtn('preOffIntervalBtnId');
    preIntervall = false;
    preIntervalTime = false;
    clearInterval(preCounterId);
}

function setPreIntervalFirst() {
    setActivePreIntervalBtn('preFirstPreIntervalBtnId');
    if (intervalsArray.length === 0) {
        preIntervalTime = 50;
        intervalTimeFalse();
    } else {
        preIntervalTime = intervalsArray[0].firstPreIntervalTime;
        intervalTimeFalse();
    }
}

function setPreIntervalSecond() {
    setActivePreIntervalBtn('preSecondIntervalBtnId');
    if (intervalsArray.length === 0) {
        preIntervalTime = 45;
        intervalTimeFalse();
    } else {
        preIntervalTime = intervalsArray[0].secondPreIntervalTime;
        intervalTimeFalse();
    }
}

function intervalTimeFalse() {
    preIntervall = true;
    if (intervalTime === false) {
        setPreIntervalOff();
        toggleVisibilityById('requiresAlertTimeId', true);
        setTimeout(() => {
            toggleVisibilityById('requiresAlertTimeId', false);
        }, 2500);
    }
}

function playSounds(m, s) {
    if (m % intervalTime === 0 && s <= 0.5 && !audioGoPlayed && m >= 1) {
        AUDIO_GO.play();
        audioGoPlayed = true;
    } else {
        audioGoPlayed = false;
    }
    if ((m % intervalTime === intervalTime - 1) && !audioReadyPlayed && s === preIntervalTime && preIntervall === true && (intervalTime !== 1 ? m > 0 : true)) {
        AUDIO_READY.play();
        audioReadyPlayed = true;
    } else {
        audioReadyPlayed = false;
    }
}

function setActiveSPRBtn(buttonId) {
    if (activeSPRBtn) {
        document.getElementById(activeSPRBtn).classList.remove('activeSPRBtn');
    }
    activeSPRBtn = buttonId;
    document.getElementById(buttonId).classList.add('activeSPRBtn');
}

function setActiveIntervalBtn(buttonId) {
    if (activeIntervalBtn) {
        document.getElementById(activeIntervalBtn).classList.remove('activeIntervalBtn');
    }
    activeIntervalBtn = buttonId;
    document.getElementById(buttonId).classList.add('activeIntervalBtn');
}

function setActivePreIntervalBtn(buttonId) {
    if (activePreIntervalBtn) {
        document.getElementById(activePreIntervalBtn).classList.remove('activePreIntervalBtn');
    }
    activePreIntervalBtn = buttonId;
    document.getElementById(buttonId).classList.add('activePreIntervalBtn');
}

// edit
function confirmFirstInterval(inputId, buttonId) {
    const newIntervalTime = document.getElementById(inputId).value;
    if (newIntervalTime.length !== 0) {
        intervalTime = parseInt(newIntervalTime);
        document.getElementById(buttonId).innerText = newIntervalTime;
        saveIntervals();
        document.getElementById(inputId).value = '';
    }
}

function confirmSecondInterval(inputId, buttonId) {
    const newIntervalTime = document.getElementById(inputId).value;
    if (newIntervalTime.length !== 0) {
        intervalTime = parseInt(newIntervalTime);
        document.getElementById(buttonId).innerText = newIntervalTime;
        saveIntervals();
        document.getElementById('intervalSecondNumberFieldId').style.background = 'green';
        setTimeout(() => {
            if (secondIntervalStandard === true) {
                document.getElementById('intervalSecondNumberFieldId').style.background = '#413534';
            } else {
                document.getElementById('intervalSecondNumberFieldId').style.background = '';
            }
        }, 500);
    }
}

function confirmThirdInterval(inputId, buttonId) {
    const newIntervalTime = document.getElementById(inputId).value;
    if (newIntervalTime.length !== 0) {
        intervalTime = parseInt(newIntervalTime);
        document.getElementById(buttonId).innerText = newIntervalTime;
        saveIntervals();
        document.getElementById('intervalThirdNumberFieldId').style.background = 'green';
        setTimeout(() => {
            if (thirdIntervalStandard === true) {
                document.getElementById('intervalThirdNumberFieldId').style.background = '#413534';
            } else {
                document.getElementById('intervalThirdNumberFieldId').style.background = '';
            }
        }, 500);
    }
}

function confirmFirstPreInterval(inputId, buttonId) {
    const newIntervalTime = document.getElementById(inputId).value;
    if (newIntervalTime.length !== 0) {
        preIntervalTime = 60 - parseInt(newIntervalTime);
        document.getElementById(buttonId).innerText = newIntervalTime;
        saveIntervals();
        document.getElementById('preIntervalFirstNumberFieldId').style.background = 'green';
        setTimeout(() => {
            if (firstPreIntervalStandard === true) {
                document.getElementById('preIntervalFirstNumberFieldId').style.background = '#413534';
            } else {
                document.getElementById('preIntervalFirstNumberFieldId').style.background = '';
            }
        }, 500);
    }
}

function confirmSecondPreInterval(inputId, buttonId) {
    const newIntervalTime = document.getElementById(inputId).value;
    if (newIntervalTime.length !== 0) {
        preIntervalTime = 60 - parseInt(newIntervalTime);
        document.getElementById(buttonId).innerText = newIntervalTime;
        saveIntervals();
        document.getElementById('preIntervalSecondNumberFieldId').style.background = 'green';
        setTimeout(() => {
            if (secondPreIntervalStandard === true) {
                document.getElementById('preIntervalSecondNumberFieldId').style.background = '#413534';
            } else {
                document.getElementById('preIntervalSecondNumberFieldId').style.background = '';
            }
        }, 500);
    }
}

function confirmFirstIntervalAsStandard() {
    firstIntervalStandard = true;
    secondIntervalStandard = false;
    thirdIntervalStandard = false;
    setGoFirst();
    saveIntervalsStandard();
    document.getElementById('intervalSecondNumberFieldId').style.background = '';
    document.getElementById('intervalThirdNumberFieldId').style.background = '';
}

function confirmSecondIntervalAsStandard() {
    firstIntervalStandard = false;
    secondIntervalStandard = true;
    thirdIntervalStandard = false;
    setGoSecond();
    saveIntervalsStandard();
    document.getElementById('intervalSecondNumberFieldId').style.background = '#413534';
    document.getElementById('intervalThirdNumberFieldId').style.background = '';
}

function confirmThirdIntervalAsStandard() {
    firstIntervalStandard = false;
    secondIntervalStandard = false;
    thirdIntervalStandard = true;
    setGoThird();
    saveIntervalsStandard();
    document.getElementById('intervalSecondNumberFieldId').style.background = '';
    document.getElementById('intervalThirdNumberFieldId').style.background = '#413534';
}

function confirmOffPreIntervalAsStandard() {
    firstPreIntervalStandard = true;
    secondPreIntervalStandard = false;
    thirdPreIntervalStandard = false;
    setPreIntervalOff();
    savePreIntervalsStandard()
    document.getElementById('preIntervalFirstNumberFieldId').style.background = '';
    document.getElementById('preIntervalSecondNumberFieldId').style.background = '';
}

function confirmFirstPreIntervalAsStandard() {
    firstPreIntervalStandard = false;
    secondPreIntervalStandard = true;
    thirdPreIntervalStandard = false;
    setPreIntervalFirst();
    savePreIntervalsStandard()
    if (intervalTime === false) {
        setPreIntervalOff();
        toggleVisibilityById('requiresAlertTimeId', true);
        setTimeout(() => {
            toggleVisibilityById('requiresAlertTimeId', false);
        }, 2500);
    } else {
        document.getElementById('preIntervalFirstNumberFieldId').style.background = '#413534';
        document.getElementById('preIntervalSecondNumberFieldId').style.background = '';
    }
}

function confirmSecondPreIntervalAsStandard() {
    firstPreIntervalStandard = false;
    secondPreIntervalStandard = false;
    thirdPreIntervalStandard = true;
    setPreIntervalSecond();
    savePreIntervalsStandard()
    if (intervalTime === false) {
        setPreIntervalOff();
        toggleVisibilityById('requiresAlertTimeId', true);
        setTimeout(() => {
            toggleVisibilityById('requiresAlertTimeId', false);
        }, 2500);
    } else {
        document.getElementById('preIntervalFirstNumberFieldId').style.background = '';
        document.getElementById('preIntervalSecondNumberFieldId').style.background = '#413534';
    }
}
let bodypartIndex = -1;

function addNewBodypart() {
    const gymDiaryElement = document.getElementById('gymDiaryBtns');
    const newIndex = gymDiaryArray.length; // Verwende die aktuelle Länge des Arrays als Index
    const newBodypartElement = document.createElement('div');
    newBodypartElement.className = 'inputDiaryBtnArea column';
    newBodypartElement.id = `bodypartField_${newIndex}`;
    newBodypartElement.innerHTML = /*html*/ `
        <div class="relative">
            <div class="clickOnDiaryBtn">
            </div>
            <input type="text" class="inputDiaryBtn font16" id="bodypartTextId_${newIndex}">
        </div>
        <div class="deleteAndMemoryDiaryBtns">
            <div class="column spaceBetween diaryRightBtnArea">
            <img src="img/garbage.png" class="saveDiaryImg" onclick="deleteDiaryElement(${newIndex})">
            </div>
            <img src="img/save.png" class="saveDiaryImg" onclick="saveDiaryElement(${newIndex})" style="margin-top: 3px;">
        </div>
    `;
    gymDiaryElement.appendChild(newBodypartElement);
    let clickOnDiaryBtn = document.getElementsByClassName('clickOnDiaryBtn');
    for (let i = 0; i < clickOnDiaryBtn.length; i++) {
        clickOnDiaryBtn[i].classList.add('dNone');
    }
}

function saveDiaryElement(index) {
    const bodypartTextElement = document.getElementById(`bodypartTextId_${index}`);
    const bodypartValue = bodypartTextElement.value;

    if (!gymDiaryArray[index]) {
        gymDiaryArray[index] = {}; // Falls noch kein Objekt im Array existiert, erstelle eins
    }
    document.getElementById(`bodypartTextId_${index}`).style.background = 'green';
    setTimeout(() => {
        document.getElementById(`bodypartTextId_${index}`).style.background = '#202124';
    }, 500);
    gymDiaryArray[index].bodypart = bodypartValue;
    saveGymDiaryArray();
}

function renderDiaryInputs() {
    const gymDiaryElement = document.getElementById('gymDiaryBtns');
    gymDiaryElement.innerHTML = ''; // Entferne vorhandene Elemente

    for (let i = 0; i < gymDiaryArray.length; i++) {
        const newBodypartElement = document.createElement('div');
        newBodypartElement.className = 'inputDiaryBtnArea column';
        newBodypartElement.id = `bodypartField_${i}`;
        newBodypartElement.innerHTML = /*html*/ `
        <div class="clickOnDiaryBtn">&nbsp;</div>
        <input type="text" class="inputDiaryBtn font16" id="bodypartTextId_${i}" onclick="openDiary(${i})" readonly>
        <div class="deleteAndMemoryDiaryBtns">
            <div class="column spaceBetween diaryRightBtnArea dNone" id="deleteDiaryBodypart_${i}">
            <img src="img/garbage.png" class="saveDiaryImg" onclick="deleteDiaryElement(${i})">
            </div>
            <img src="img/save.png" id="saveDiaryBodypart_${i}" class="saveDiaryImg" onclick="saveDiaryElement(${i})">
        </div>
        `;

        gymDiaryElement.appendChild(newBodypartElement);

        if (gymDiaryArray[i].bodypart) {
            document.getElementById(`bodypartTextId_${i}`).value = gymDiaryArray[i].bodypart;
        }

        let clickOnDiaryBtn = document.getElementsByClassName('clickOnDiaryBtn');
        for (let j = 0; j < clickOnDiaryBtn.length; j++) {
            clickOnDiaryBtn[j].classList.add('dNone');
        }
        if (settings === true) {
            toggleVisibilityById(`deleteDiaryBodypart_${i}`, true);
            toggleVisibilityById(`saveDiaryBodypart_${i}`, true);
        } else {
            toggleVisibilityById(`deleteDiaryBodypart_${i}`, false);
            toggleVisibilityById(`saveDiaryBodypart_${i}`, false);
        }
    }
}

function purgeDiaryCategory(bodypartIndex) {
    gymDiaryArray.splice(bodypartIndex, 1);
    saveGymDiaryArray();
    renderDiaryInputs();
    toggleVisibilityById('deleteDiaryElementId', false);
}

function deleteDiaryElement(bodypartIndex) {
    toggleVisibilityById('deleteDiaryElementId', true);
    document.getElementById('deleteDiaryElementId').innerHTML = /*html*/ `
    <button id="stopDeleteId" onclick="toggleVisibilityById('deleteDiaryElementId', false)">Abbrechen</button>
    <button id="acceptDeleteId" onclick="purgeDiaryCategory(${bodypartIndex})">Löschen</button>
    `;
}

function deleteGymDiaryArray() {
    gymDiaryArray = [];
    saveDiaryInputs();
    renderDiaryInputs();
}

async function deleteAllUser() {
    usersArray = [];
    await setItem('usersArray', JSON.stringify(usersArray));
}

updateTime();