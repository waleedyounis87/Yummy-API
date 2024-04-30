let content = document.querySelector(".content");
let rawData = document.querySelector(".rawData");
let urlSearchUsingNameAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
$(document).ready(function() {
    getmealByName("").then(() =>{
        $(".inner-loading-screen").fadeOut(500)
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")
        
    }) 
})
//function to open and close Sidebar
$(".icon").click(function(){
   if ($(".sidebar").css("left") == "0px"){
       closeNav();
   }
   else{
      openNav();
   }
});

//close and Open Functions
let openNav = () => {
    $(".sidebar").animate({left:0}, 700);
    $(".close-open-btn").addClass("fa-x");
     $(".close-open-btn").remove("fa-bars");
     for (let i = 0; i < 5;i++){
         $(".list-item").eq(i).animate({top: 0}, (i + 7) * 100);
     }
}
let closeNav = () => {
    $(".sidebar").animate({left:-200}, 700)
    $(".close-open-btn").remove("fa-x");
    $(".close-open-btn").addClass("fa-bars");
    for (let i = 0; i < 5;i++){
        $(".list-item").eq(i).animate({top: 300}, (i + 7) * 100);
    }
}
//function for click search button
$(".search-item").click(function(e){
    
   content.innerHTML = ``
   content.innerHTML = `
   <div class="d-flex gap-4 mt-4">
   <div class="input-name w-50">
       <input type="text" onkeyup="getmealByName(this.value)" name="name" id="name" placeholder="search by name" class="w-100 form-control">
   </div>
   <div class="input-letter w-50">
       <input type="text" maxlength="1"  onkeyup="getmealByLetter(this.value)" name="name" id="name" placeholder="search by Letter" class="w-100 form-control">
   </div>
</div>
   `;
   e.preventDefault()
   closeNav()
   rawData.innerHTML = ""
//    $(".inner-loading-screen").fadeOut("500");
  
});
$(".category-item").click((e) => {
    e.preventDefault()
    closeNav()
    getMealsByCategory()
});
$(".areas-item").click((e) => {
    e.preventDefault()
    closeNav()
    getAreas()
})
$(".ingred-item").click((e) => {
    e.preventDefault()
    closeNav()
    getIngredientsMealsShow()
})
$(".contact-item").click((e) => {
    e.preventDefault()
    closeNav()
    showContacts()
})
//function to get meal by name API
async function getmealByName(name){
    $(".inner-loading-screen").fadeIn("500");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    response = await response.json();
    response.meals ? displayMealsByName(response.meals) : displayMealsByName([])
   $(".inner-loading-screen").fadeOut("500");
}
async function getmealByLetter(letter){
    $(".inner-loading-screen").fadeIn("500");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    response = await response.json();
    response.meals ? displayMealsByName(response.meals) : displayMealsByName([])
    $(".inner-loading-screen").fadeOut("500");
}
async function getMealsByCategory(){
    $(".inner-loading-screen").fadeIn("500");
    content.innerHTML= ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayMealsByCategory(response.categories)
    $(".inner-loading-screen").fadeOut("500");
}
async function getCategoryMeals(category) {
    $(".inner-loading-screen").fadeIn("500");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMealsByName(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut("500");
}
async function getAreas() {
    $(".inner-loading-screen").fadeIn("500");
    content.innerHTML= ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayAreas(respone.meals)
    $(".inner-loading-screen").fadeOut("500");

}
async function getAreaMeals(area) {
    $(".inner-loading-screen").fadeIn("500");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMealsByName(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut("500");
}

async function getIngredientsMealsShow() {
    $(".inner-loading-screen").fadeIn("500");
    content.innerHTML= ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut("500");

}
async function getIngredientsMeals(ingredients) {
    //console.log(ingredients)
    $(".inner-loading-screen").fadeIn("500");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    console.log(response.meals.slice(0, 20))
    displayMealsByName(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut("500");

}
async function getMealDetails(mealID) {
    $(".inner-loading-screen").fadeIn("500");
    content.innerHTML= ""
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut("500");
}


//display Meals
function displayMealsByName(arr){
    rawData.innerHTML = ""
    let meals = ``
    // $(".loading-screen").fadeIn(300)
    for(let i = 0; i < arr.length;i++){
        meals += `<div class="meal col-md-3 mb-2 py-2">
                        <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal-content  rounded-3 position-relative px-0 overflow-hidden">
                            <div class="image w-100">
                                <img src="${arr[i].strMealThumb}" alt="" class="w-100">
                            </div>
                            <div class="meal-name position-absolute  d-flex align-items-center">
                                <h3 class="fw-bold ps-2">${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`
    }
    rawData.innerHTML = meals
    
}
function displayMealsByCategory(arr){
    console.log(arr)
    rawData.innerHTML = ""
    let meals = ``
    for(let i = 0; i < arr.length;i++){
        meals += `<div class="meal col-md-3 mb-2 py-2">
                        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal-content  rounded-3 position-relative px-0 overflow-hidden">
                            <div class="image w-100">
                                <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
                            </div>
                            <div class="meal-name position-absolute  d-flex flex-column align-items-center justify-content-center">
                                <h3 class="fw-bold ps-2">${arr[i].strCategory}</h3>
                                <p class="text-center">${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                            </div>
                        </div>
                    </div>`
    }
    rawData.innerHTML = meals
}
function displayAreas(arr) {
    rawData.innerHTML = ""
    let areas = ``;
    for (let i = 0; i < arr.length; i++) {
        areas += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer text-white py-3">
                        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h3 class="text-white">${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rawData.innerHTML = areas
}
function displayIngredients(arr) {
    let Ingredients = "";

    for (let i = 0; i < arr.length; i++) {
        Ingredients += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                        <h3 class="text-white">${arr[i].strIngredient}</h3>
                        <p class="text-white">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rawData.innerHTML = Ingredients
}
function displayMealDetails(arr){
    
        let ingredients = ``
        for (let i = 1; i <= 20; i++) {
            if (arr[`strIngredient${i}`]) {
                ingredients += `<li class="alert alert-info m-2 p-1">${arr[`strMeasure${i}`]} ${arr[`strIngredient${i}`]}</li>`
            }
        }
    
        let tags = arr.strTags?.split(",")
        if (!tags) tags = []
    
        let tagsStr = ''
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
    
    
    
        let meal = `
        <div class="col-md-4">
                    <img class="w-100 rounded-3 text-white" src="${arr.strMealThumb}"
                        alt="">
                        <h2 class="text-white">${arr.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${arr.strInstructions}</p>
                    <h3 class="text-white"><span class="fw-bolder text-white">Area : </span>${arr.strArea}</h3>
                    <h3 class="text-white"><span class="fw-bolder text-white">Category : </span>${arr.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${ingredients}
                    </ul>
    
                    <h3 class="text-white">Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        ${tagsStr}
                    </ul>
    
                    <a target="_blank" href="${arr.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    
        rawData.innerHTML = meal
}

//inputs

function showContacts() {
    content.innerHTML = ""
    rawData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}