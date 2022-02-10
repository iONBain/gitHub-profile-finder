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
const repos = document.querySelector(".repos")

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

// color mode changer function
var cnt = "dark"
  function modeChange(){
      console.log("Hello")
      sun.classList.toggle("hide")
      moon.classList.toggle("hide")
    if(cnt=="dark"){
        header.style.backgroundColor = "#238636";
        header.style.color = "#fff";
        document.body.style.backgroundColor = "#000";
        cnt = "light"
    }
    else{
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
    console.log("error occured", error);
    alert("User Not Found");
    contentt.classList.remove("show")
}

// utility functions to show and hide with transition 
function showww(){
    // contentt.classList.remove("hide")
    contentt.classList.add("show")
}
function hideee(){
    contentt.classList.remove("show")
}

function unavailable(str){
    str.textContent = "unavailable"
}
// main searching function of GitHub Profiles
function searcher() {
    hideee();
    var inputText = txtInput.value;
    var inpUser = getTranslateURL(inputText);
    var inpUserRepo = getRepoURL(inputText);
    fetch(inpUser)
        .then(res => res.json())
        .then(json => {
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
            if(li4.textContent == ""){
                unavailable(li4);
            }
        })
        .catch(errorHandler);

    // repo finding
    console.log(inpUserRepo)
    fetch(inpUserRepo)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            const arr = json.name;
            console.log(arr)
            // arr.forEach(function(entry) {
            //     console.log(entry);
            //   });
            // document.createElement("")
            // var translatedText = json.contents.translated;
            // var translatedText = json.id;
            // txtOutput.textContent = translatedText;
            // console.log(translatedText)

        })
        .catch(errorHandler);
}


submitBtn.addEventListener("click", searcher);


// utility function for enter pressing search 
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searcher();
    }
});