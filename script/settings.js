function showSettings() {
    settings = true;
    changeShowSettingsFunction();
    checkSavedDiaryElement();
    document.getElementById('settingsImgId').src = 'img/close.png';
    document.getElementById('btnAreaId').classList.add('btnArea');
    toggleVisibilityById('settingstitleId', true);
    toggleVisibilityById('dumbellId', false);
    toggleVisibilityById('SPRBtnAreaId', false);
    // toggleVisibilityById('settingsDescriptionId', true);
    toggleVisibilityById('manualImgId', false);
    toggleVisibilityById('logOutBtnId', false);
    toggleVisibilityById('logOutBtnId', false);
    toggleVisibilityById('welcomeMessageId', false);
    toggleVisibilityByClass('changeIntervalArea', true);
    toggleVisibilityByClass('intervalLimit', true);
    toggleVisibilityById('flagsId', true);
    toggleVisibilityById('welcomeMessageTranslateId', false);
    document.getElementById('emptyDiaryTranslateId').style.display = 'none';
    document.getElementById('gymDiaryAreaId').classList.add('dNone');
    document.getElementById('addDiaryBtnImgId').classList.remove('dNone');
    toggleVisibilityById('updateImgId', false);
    document.getElementById('editAlertId').classList.add('intervalLimit');
    document.getElementById('editPreAlertId').classList.add('intervalLimit');

    let diaryRightBtnArea = document.getElementsByClassName('diaryRightBtnArea');
    for (let i = 0; i < diaryRightBtnArea.length; i++) {
        diaryRightBtnArea[i].style.display = 'block';
    }

    for (let i = 0; i < gymDiaryArray.length; i++) {
        toggleVisibilityById(`deleteDiaryBodypart_${i}`, true);
        toggleVisibilityById(`saveDiaryBodypart_${i}`, true);
        document.getElementById(`bodypartTextId_${i}`).removeAttribute('readonly');
        document.getElementById(`bodypartTextId_${i}`).removeAttribute('onclick');
    }
    let clickOnDiaryBtn = document.getElementsByClassName('clickOnDiaryBtn');
    for (let i = 0; i < clickOnDiaryBtn.length; i++) {
        clickOnDiaryBtn[i].classList.add('dNone');
    }
}

function backToMenu() {
    if (preGymDiaryArray.length === 1) {
        toggleVisibilityById('cancelSaveSettingsId', true);
    } else {
        settings = false;
        renderDiaryInputs();
        originalShowSettingsFunction();
        toggleVisibilityById('cancelSaveSettingsId', false);
        document.getElementById('settingsImgId').src = 'img/settings.png';
        document.getElementById('btnAreaId').classList.remove('btnArea');
        toggleVisibilityById('settingstitleId', false);
        toggleVisibilityById('dumbellId', true);
        toggleVisibilityById('SPRBtnAreaId', true);
        // toggleVisibilityById('settingsDescriptionId', false);
        toggleVisibilityById('manualImgId', true);
        toggleVisibilityById('logOutBtnId', true);
        toggleVisibilityById('welcomeMessageId', true);
        toggleVisibilityByClass('changeIntervalArea', false);
        toggleVisibilityById('flagsId', false);
        toggleVisibilityById('welcomeMessageTranslateId', true);
        toggleVisibilityById('emptyDiaryTranslateId', true);
        document.getElementById('gymDiaryAreaId').classList.add('dNone'); //
        document.getElementById('addDiaryBtnImgId').classList.add('dNone');
        toggleVisibilityById('updateImgId', true);
        if (gymDiaryArray.length === 0) {
            document.getElementById('emptyDiaryTranslateId').style.display = 'flex';
        }
        document.getElementById('editAlertId').classList.remove('intervalLimit');
        document.getElementById('editPreAlertId').classList.remove('intervalLimit');
        let diaryRightBtnArea = document.getElementsByClassName('diaryRightBtnArea');
        for (let i = 0; i < diaryRightBtnArea.length; i++) {
            diaryRightBtnArea[i].style.display = 'none';
        }
        let inputDiaryBtns = document.getElementsByClassName('inputDiaryBtn');
        for (let i = 0; i < gymDiaryArray.length; i++) {
            toggleVisibilityById(`deleteDiaryBodypart_${i}`, false);
            toggleVisibilityById(`saveDiaryBodypart_${i}`, false);
            inputDiaryBtns[i].setAttribute('readonly', '');
        }
        let clickOnDiaryBtn = document.getElementsByClassName('clickOnDiaryBtn');
        for (let i = 0; i < clickOnDiaryBtn.length; i++) {
            clickOnDiaryBtn[i].classList.remove('dNone');
        }
        preGymDiaryArray = [];
        toggleVisibilityById('deleteDiaryElementId', false);
    }
}

function changeShowSettingsFunction() {
    document.getElementById('settingsImgId').onclick = function () {
        backToMenu();
    };
}

function originalShowSettingsFunction() {
    const editContactForm = document.getElementById('settingsImgId');
    editContactForm.onclick = function () {
        showSettings();
    };
}

function doNotClose(event) {
    event.stopPropagation();
}

function cancelSaveDiarySettings() {
    toggleVisibilityById('cancelSaveSettingsId', false);
}

function continueDiarySettings() {
    toggleVisibilityById('cancelSaveSettingsId', false);
    preGymDiaryArray = [];
    backToMenu();
}