const STORAGE_TOKEN = '0GSPS8PA494Q5XRXZFXEZC2P0V4J1LMMBR7H9NVP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        }
    });
}

async function loadUsersArray() {
    try {
        usersArray = JSON.parse(await getItem('usersArray'));
    } catch {
        console.warn('Token invalid becauce no user has been created yet');
    }
}

async function loadIndividuallyIntervals() {
    try {
        intervalsArray = JSON.parse(await getItem(`individuallyIntervals_${id}`));
    } catch {
        console.warn('Token invalid becauce no intervals has been created yet');
    }
}

async function loadIndividuallyIntervalsStandard() {
    try {
        intervalsStandardArray = JSON.parse(await getItem(`individuallyIntervalsStandardArray_${id}`));
    } catch {
        console.warn('Token invalid becauce no standards has been created yet');
    }
}

async function loadIndividuallyPreIntervalsStandard() {
    try {
        preIntervalsStandardArray = JSON.parse(await getItem(`individuallyPreIntervalsStandardArray_${id}`));
    } catch {
        console.warn('Token invalid becauce no pre standards has been created yet');
    }
}

async function loadIndividuallyGymDiaryArray() {
    try {
        gymDiaryArray = JSON.parse(await getItem(`individuallyGymDiaryArray_${id}`));
    } catch {
        console.warn('Token invalid becauce no gym diary has been created yet');
    }
}

async function loadIndividuallyHideSaveImg() {
    try {
        hideSaveImg = JSON.parse(await getItem(`individuallyHideSaveImg_${id}`));
    } catch {
        console.warn('Token invalid becauce no gym diary is saved');
    }
}

// save locally
async function saveRememberMe() {
    let rememberMeAsText = JSON.stringify(rememberMe);
    localStorage.setItem('rememberMe', rememberMeAsText);
}

async function loadRememberMe() {
    let rememberMeAsText = localStorage.getItem('rememberMe');
    if (rememberMeAsText) {
        rememberMe = JSON.parse(rememberMeAsText);
    }
}

async function saveLoggedInUser() {
    let loggedInUserAsText = JSON.stringify(loggedInUser);
    localStorage.setItem('loggedInUser', loggedInUserAsText);
}

async function loadLoggedInUser() {
    let loggedInUserAsText = localStorage.getItem('loggedInUser');
    if (loggedInUserAsText) {
        loggedInUser = JSON.parse(loggedInUserAsText);
    }
}

async function saveGymDiaryArray() {
    let gymDiaryArrayAsText = JSON.stringify(gymDiaryArray);
    localStorage.setItem('gymDiaryArray', gymDiaryArrayAsText);
}

async function loadGymDiaryArray() {
    let gymDiaryArrayAsText = localStorage.getItem('gymDiaryArray');
    if (gymDiaryArrayAsText) {
        gymDiaryArray = JSON.parse(gymDiaryArrayAsText);
    }
}

async function saveLanguage() {
    let languageArrayAsText = JSON.stringify(languageArray);
    localStorage.setItem('languageArray', languageArrayAsText);
}

async function loadLanguage() {
    let languageArrayAsText = localStorage.getItem('languageArray');
    if (languageArrayAsText) {
        languageArray = JSON.parse(languageArrayAsText);
    }
}