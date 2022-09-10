let main = document.getElementById("main")
// console.log(main);
const APIURL = "https://api.github.com/users/";
let mainArray = []

let form = document.getElementById("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("searched");
    formValidation()
})

let formValidation = () => {
    let input = document.getElementById("search")
    if (input.value == "") {
        main.innerHTML = "Please Fill some valid User"
        // console.log("failed");
        // console.log("please find by Name");
    }

    else {
        // console.log("sucess");
        getData(input.value)
        getResponse(input.value)
        input.value = ""
    }
}



let getData = async (user) => {
    let resp = await fetch(APIURL + user)
    let data = await resp.json()
    if (data.message !== "Not Found") {
        mainArray = data
    } else {
        main.innerHTML = "Please Fill some valid User"
        // console.log("invalid");
        return;
    }

    // console.log(mainArray);

    creatData(mainArray)

}



let creatData = (mainArray) => {
    return (main.innerHTML = `
<div class="card"> 
        <div>
          <img class="avatar" src=${mainArray.avatar_url} alt="image" />
        </div>

        <div class="user-info">
          <h2>${mainArray.name}</h2>
          <p>${mainArray.bio}</p>

          <ul class="info">
            <li><strong>${mainArray.followers}</strong></li>
            <li><strong>${mainArray.following}</strong></li>
            <li><strong>${mainArray.public_repos}</strong></li>
          </ul>

          <div id="repos">
           



          </div>
        </div>
      </div>

     
`
    )
}



let getResponse = async(user)=>{
    let resp = await fetch(APIURL + user + '/repos')
    let data = await resp.json()
    // data = JSON.parse(data);
    // console.log(data);
    let repos = document.querySelector("#repos")
    data.forEach((data)=>{
        let creatElement = document.createElement("a")
        creatElement.classList.add("repo")
        creatElement.href = data.html_url
        creatElement.innerText = data.name
        creatElement.target = "_blank"
        repos.appendChild(creatElement)
    });


}


(()=>{
    getData("satyamgitt");
    getResponse("satyamgitt")
    
})()