const url = "https://api.github.com/users/";
const submitBtn = document.querySelector("#submit")
var txtInput = document.querySelector("#txt-input");
const repoUrl = "https://api.github.com/users/"
// const namee = userName.value; 
const proName = document.querySelector("#proName")
const proPic = document.querySelector("#proPic")
const contentt = document.querySelector("#content")
const gitLinker = document.querySelector("#gitLinker")

const repos = document.querySelector(".repos")


const colorMode = document.querySelector(".lightMode");
const sun = document.querySelector("#sun")
const moon = document.querySelector("#moon")
// var bodyy = document.getElementsByTagName("body");
const header = document.querySelector(".header")

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
    // colorMode.textContent = "Hello"
}

colorMode.addEventListener("click", modeChange)


function getTranslateURL(text) {
    return url + text;
}

function getRepoURL(text) {
    return repoUrl + text + "/repos";
}


function errorHandler(error) {
    console.log("error occured", error);
    alert("User Not Found");
    // contentt.classList.add("hide")
    // contentt.classList.add("hide")
    contentt.classList.remove("show")
}


function showww(){
    // contentt.classList.remove("hide")
    contentt.classList.add("show")
}
function hideee(){
    contentt.classList.remove("show")
}
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
            // txtOutput.textContent = translatedText;
            // console.log(translatedText)
            showww();
            
        })
        .catch(errorHandler);
        


    // repoooooooooooooooooo
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
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // alert('Enter is pressed!');
        searcher();
        // console.log('enter')
    }
});