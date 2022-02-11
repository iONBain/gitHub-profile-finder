// url api initiate
const url = "https://api.github.com/users/";
const repoUrl = "https://api.github.com/users/"
var txtInput = document.querySelector("#txt-input");
const submitBtn = document.querySelector("#submit")

// content fetching
const proName = document.querySelector("#proName")
const proPic = document.querySelector("#proPic")
const contentt = document.querySelector("#content")
const gitLinker = document.querySelector("#gitLinker")
const repo1 = document.querySelector(".repo1")
const repo2 = document.querySelector(".repo2")
const repo3 = document.querySelector(".repo3")
const link1 = document.querySelector("#repo1")
const link2 = document.querySelector("#repo2")
const link3 = document.querySelector("#repo3")
// part 2 fetch 
const li1 = document.querySelector(".list1")
const li2 = document.querySelector(".list2")
const li3 = document.querySelector(".list3")
const li4 = document.querySelector(".list4")


// color changing utilities
const colorMode = document.querySelector(".lightMode");
const sun = document.querySelector("#sun")
const moon = document.querySelector("#moon")
const header = document.querySelector(".header")
const info = document.querySelector(".info")
// color mode changer function
var cnt = "dark"

function modeChange() {
    console.log("Hello")
    sun.classList.toggle("hide")
    moon.classList.toggle("hide")
    if (cnt == "dark") {
        info.style.backgroundColor = "#E7E7E7"
        header.style.backgroundColor = "#238636";
        header.style.color = "#fff";
        document.body.style.backgroundColor = "#000";
        cnt = "light"
    } else {
        info.style.backgroundColor = "#fff"
        header.style.backgroundColor = "#E7E7E7";
        header.style.color = "#0d1117";
        document.body.style.backgroundColor = "#fff";
        cnt = "dark"
    }
}
colorMode.addEventListener("click", modeChange)


// url fetching 
function getTranslateURL(text) {
    return url + text;
}

function getRepoURL(text) {
    return repoUrl + text + "/repos";
}


// error handling 
function errorHandler(error) {
    contentt.classList.remove("show")
    console.log("error occured", error);
    alert("User Not Found");
}

// utility functions to show and hide with transition 
function showww() {
    // contentt.classList.remove("hide")
    contentt.classList.add("show")
}

function hideee() {
    contentt.classList.remove("show")
}

function unavailable(str) {
    str.textContent = "unavailable"
}

function clearPrev() {
    li1.textContent = "";
    li2.textContent = "";
    li3.textContent = "";
    li4.textContent = "";
    proName.textContent = "";
    proPic.src = "";
    repo1.textContent = "";
    repo2.textContent = "";
    repo3.textContent = "";
    link1.href = "";
    link2.href = "";
    link3.href = "";
}
// main searching function of GitHub Profiles
function searcher() {
    hideee();
    clearPrev();
    var inputText = txtInput.value;
    var inpUser = getTranslateURL(inputText);
    var inpUserRepo = getRepoURL(inputText);

    fetch(inpUser)
        .then(res => res.json())
        .then(json => {
            if (json.message == "Not Found") {
                errorHandler();
            } else {
                console.log(json)
                var proN = json.name;
                var proPi = json.avatar_url;
                proName.textContent = proN;
                proPic.src = proPi;
                gitLinker.href = json.html_url
                showww();
                li1.textContent = json.login;
                li2.textContent = json.followers;
                li3.textContent = json.following;
                li4.textContent = json.bio;
                if (li4.textContent == "") {
                    unavailable(li4);
                }
            }
            txtInput.value = "";
        })
    // .catch(errorHandler);

    // repo finding
    console.log(inpUserRepo)
    fetch(inpUserRepo)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const arr1 = json[0].name;
            const arr2 = json[1].name;
            const arr3 = json[2].name;
            // console.log(arr)
            repo1.textContent = arr1;
            repo2.textContent = arr2;
            repo3.textContent = arr3;
            link1.href = json[0].html_url;
            link2.href = json[1].html_url;
            link3.href = json[2].html_url;
            // console.log(arr[0])
            // arr.forEach(function(entry) {
            //     console.log(entry);
            //   });
            // document.createElement("")
            // var translatedText = json.contents.translated;
            // var translatedText = json.id;
            // txtOutput.textContent = translatedText;
            // console.log(translatedText)

        })
    // .catch(errorHandler);
}


submitBtn.addEventListener("click", searcher);


// utility function for enter pressing search 
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searcher();
    }
});