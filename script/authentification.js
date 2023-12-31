let loggedInUser = [];
let rememberMe = [];
let autoLogin = false;
let languageArray = [];

async function initAuthentication() {
    usersArray = [];
    await loadUsersArray();
    await loadRememberMe();
    await loadLoggedInUser();
    await checkEmptyUsers();
    autoLogin = false;
    document.getElementById('regBtnId').disabled = false;
    document.getElementById('logInBtnId').disabled = false;
    checkRememberMe();
    if (autoLogin === true) {
        toggleVisibilityById('logInContentId', false)
    } else if (autoLogin === false) {
        toggleVisibilityById('logInContentId', true)
    }
    await loadLanguage();
    if (languageArray[0] === undefined) {
        translateEnglish();
    } else if (languageArray[0] === 'english') {
        translateEnglish();
    } else if (languageArray[0] === 'german') {
        translateGerman();
    } else if (languageArray[0] === 'serbian') {
        translateSerbian();
    } else if (languageArray[0] === 'marokko') {
        translateMarokko();
    } else if (languageArray[0] === 'china') {
        translateChina();
    } else if (languageArray[0] === 'spain') {
        translateSpain();
    } else if (languageArray[0] === 'bavaria') {
        translateBavaria();
    }
}

async function checkEmptyUsers() {
    if (usersArray.length === 0) {
        rememberMe = [];
        loggedInUser = [];
        await saveRememberMe();
        await saveLoggedInUser();
    }
}

//register
async function register() {
    let usernameInput = document.getElementById('usernameId');
    let passwordInput = document.getElementById('passwordId');
    registerUser(usernameInput, passwordInput);
}

async function registerUser(usernameInput, passwordInput) {
    const userExists = usersArray.some(user => user.username === usernameInput.value);
    if (userExists) {
        userAlreadyExists();
    } else if (usernameInput.value.length === 0 || passwordInput.value.length === 0) {
        emptyFields()
    } else {
        usersArray.push({
            username: usernameInput.value.toLowerCase(),
            password: passwordInput.value,
            id: new Date().getTime(),
        });
        toggleVisibilityById('userCreatedTextId', true);
        await setItem('usersArray', JSON.stringify(usersArray));
        setTimeout(() => {
            toggleVisibilityById('userCreatedTextId', false);
        }, 4000);
    }
}

function logIn() {
    document.getElementById('regBtnId').disabled = true;
    document.getElementById('logInBtnId').disabled = true;
    let usernameInput = document.getElementById('usernameId');
    let passwordInput = document.getElementById('passwordId');
    if (usernameInput.value.length === 0 || passwordInput.value.length === 0) {
        emptyFields();
    } else {
        let credentialsMatch = false;
        usersArray.forEach(user => {
            if (checkCredential(user, usernameInput, passwordInput)) {
                credentialsMatch = true;
                trueCredential(usernameInput, passwordInput);
            }
        });
        if (!credentialsMatch) {
            wrongCredential();
        }
    }
}

function checkCredential(user, usernameInput, passwordInput) {
    return user.username === usernameInput.value.toLowerCase() && user.password === passwordInput.value;
}

function emptyFields() {
    document.getElementById('regBtnId').disabled = false;
    document.getElementById('logInBtnId').disabled = false;
    toggleVisibilityById('emptyInputId', true);
    setTimeout(() => {
        toggleVisibilityById('emptyInputId', false);
    }, 4000);
}

function wrongCredential() {
    document.getElementById('regBtnId').disabled = false;
    document.getElementById('logInBtnId').disabled = false;
    toggleVisibilityById('wrongCredentialId', true);
    setTimeout(() => {
        toggleVisibilityById('wrongCredentialId', false);
    }, 4000);
}

function userAlreadyExists() {
    document.getElementById('regBtnId').disabled = false;
    document.getElementById('logInBtnId').disabled = false;
    toggleVisibilityById('userAlreadyExistsTextId', true);
    setTimeout(() => {
        toggleVisibilityById('userAlreadyExistsTextId', false);
    }, 4000);
}

async function trueCredential(usernameInput, passwordInput) {
    let checkbox = document.getElementById('checkboxId');
    const isValid = checkbox.checked;
    if (isValid) {
        rememberMe = [];
        rememberMe.push({
            'username': usernameInput.value.toLowerCase(),
            'password': passwordInput.value,
        });
        await saveRememberMe();
    } else if (!isValid) {
        rememberMe = [];
    }

    // who is logged in
    loggedInUser = [];
    loggedInUser.push({
        'name': usernameInput.value.toLowerCase(),
    });
    await saveLoggedInUser();
    toggleVisibilityById('wrongCredentialId', false);
    window.location.href = 'clock.html';
}

function checkRememberMe() {
    let usernameInput = document.getElementById('usernameId');
    let passwordInput = document.getElementById('passwordId');
    if (rememberMe.length !== 0) {
        autoLogin = true;
        usernameInput.value = rememberMe[0].username;
        passwordInput.value = rememberMe[0].password;
        logIn();
    } else autoLogin = false;
}

function showPassword() {
    var passwordInput = document.getElementById('passwordId');
    var showPasswordImg = document.getElementById('showPasswordId');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordImg.src = 'img/eyeOpen.png';
    } else {
        passwordInput.type = 'password';
        showPasswordImg.src = 'img/eyeClosed.png';
    }
}