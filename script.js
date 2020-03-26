//Document access
const word_input = document.querySelector('#phrase');
const langSelect = document.querySelector('#langSelect');
const langAddBtn = document.querySelector('#langAdd');
const addToLangList = document.querySelector('#addToLang');
const clearLangList = document.querySelector('#clearLang');
const define_input = document.querySelector('#definedAs');
const pronounce_input = document.querySelector('#pronunciation');
const sentence_input = document.querySelector('#sentence');
const synonym_input = document.querySelector('#synonyms');
const phrase_input = document.querySelector('#phraseToRemem');
const assoc_input = document.querySelector('#associated');
const addImageBtn = document.querySelector('#addImage');
// add image url from input
const addToDB_button = document.querySelector('#addToDB');
const warnEmpty = document.querySelector('#warnEmpty');
const delWordBtn = document.querySelector('#delWord');
const delThisWord = document.querySelector('#delThisWord');
const delAllWords = document.querySelector('#delAllWords');





function createWordObject() {
    if (typeof (Storage) !== "undefined") {
        if (word_input.value.replace(/ /g, '') == "") {
            alert("You must enter a word!")
        } else {
            if (langSelect.options[langSelect.options.selectedIndex].innerText === "Choose language...") {
                alert("You must select a language first before submitting")
            } else {
                var _phrase = { // object to stringify and add to localstorage
                    word: word_input.value,
                    language: langSelect.options[langSelect.selectedIndex].innerText,
                    definition: define_input.value,
                    pronunciation: pronounce_input.value,
                    sentence: sentence_input.value,
                    synonyms: synonym_input.value,
                    phrase: phrase_input.value,
                    associated: assoc_input.value,
                    image: ""
                }
                localStorage.setItem(`${word_input.value}`, JSON.stringify(_phrase));
                
                for (let i = 0; document.querySelectorAll(".form-control").length; i++){
                    //document.querySelectorAll(".form-control").reset();
                    document.querySelectorAll(".form-control")[i].value = "";
                }
            }

        }
    } else {
        alert("Your browser does not support storage options");
    }
}

let optionVal = "1";
let languageList = [];

function insertLang() {
    if (typeof (Storage) !== "undefined") {
        if (addToLangList.value.replace(/ /g, '') == "" || addToLang.value == null) {
            warnEmpty.innerText = "You must enter a language or close this box";
        } else {
            languageList.push(addToLangList.value.replace(/ /g, ''));
            warnEmpty.innerText = "";
            sessionStorage.setItem("languageList", JSON.stringify(languageList));

            console.log(languageList.length);
            // langSelect.options[0]; // maybe remove

            langSelect.options[optionVal - 1] = new Option(languageList[languageList.length - 1], optionVal, false, false); //optionVal was langSelect.options.length
            langSelect.selectedIndex = optionVal - 1;
            optionVal++;
            console.log("optionVal => " + optionVal);
            console.log("options length => " + langSelect.options.length)
        }
    } else {
        alert("Your browser does not support storage options");
    }
    addToLangList.value = "";

}

function getLang() {
    if (typeof (Storage) !== "undefined") {
        languageList = JSON.parse(sessionStorage.getItem('languageList'));
        if (JSON.parse(sessionStorage.getItem('languageList')) == null) {
            languageList = [];
        }
    } else {
        alert("Your browser does not support storage options");
    }
    return languageList;
}
console.log(getLang());



function clearLang() {
    optionVal -= langSelect.options.length; // maybe remove
    sessionStorage.clear();
    languageList = [];
    langSelect.options.length = 0;
    langSelect.options[langSelect.options.length] = new Option("Choose language...", "0", false, false);
    addToLangList.value = "";

}

function deleteWord() {

    //console.log(localStorage.getItem('test'));

    if (localStorage.getItem(delThisWord.value) === null) {
        document.querySelector('#removed').innerText = "The word \"" + delThisWord.value + "\" does not exist in the database."
    } else {
        document.querySelector('#removed').innerText = "The word \"" + delThisWord.value + "\" was removed."
        localStorage.removeItem(delThisWord.value);
        document.querySelector('#delThisWord').value = "";
    }
}

function deleteAllWords() {
    var deleteAll = confirm("Are you sure, this will delete ALL of your stored words?");
    if (deleteAll == true) {
        localStorage.clear();
        document.querySelector('#delThisWord').value = "";
    }
}

function resetRemoved() {
    removed.innerText = "";
}

function loadLangList() {
    languageList = getLang();
    //languageList.forEach(function(){
    for (let i = 0; i < languageList.length; i++) {
        langSelect.options[i] = new Option(languageList[i], optionVal, false, false); //optionVal was langSelect.options.length
        optionVal++;
    }
} //)
console.log("List contains " + languageList);
//}

addToDB_button.addEventListener('click', createWordObject);
langAddBtn.addEventListener('click', insertLang);
clearLangList.addEventListener('click', clearLang);
delWordBtn.addEventListener('click', deleteWord);
delAllWords.addEventListener('click', deleteAllWords);
var wordClose = document.querySelectorAll('.wordClose');
wordClose[0].addEventListener('click', resetRemoved);
wordClose[1].addEventListener('click', resetRemoved);
document.addEventListener('DOMContentLoaded', loadLangList);