// Re-useable function
const getElement =(id)=> {
    return document.getElementById(id)
}
// Load the Category from The API
const getCategories =()=> {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
    .then(response => response.json()) 
    .then(data => showCategories(data.categories))
}
// Show category
getCategories()
const showCategories =(categories)=> {
    const categoriesContainer = getElement("categories-container")
    categoriesContainer.innerHTML=""

    categories.forEach(element => {
        categoriesContainer.innerHTML += `<li>
                <a id="btn-${element.id}" onclick="getSingleCategoryAPI(${element.id})" class="ctg-btn px-4 py-2 duration-300 hover:bg-green-500 hover:text-white rounded-lg block">${element.category_name}</a>
              </li>
        `
    });
}


// Get Plants 
const getPlants =(url)=> {
    // console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => showPlants(data.plants))
    
}
// Get All Plants From The APIs
const getAllPlantsAPI =()=> {
    const url = "https://openapi.programming-hero.com/api/plants"
    getPlants(url)
}
getAllPlantsAPI()

// Shows Plants
const showPlants =(plants)=>{
    const plantsContainer = getElement("plants_container")
    plantsContainer.innerHTML = ""
    plants.forEach(item => {
        plantsContainer.innerHTML += `
        <div class="bg-white space-y-3 p-5 rounded-lg">
                <img class="h-40 w-full rounded-md object-cover " src="${item.image}"
                  alt="">
                <h4 class="font-bold text-xl">${item.name}</h4>
                <p class="text-[12px] text-black/50">${item.description}</p>
                <div class="flex justify-between items-center">
                  <p class="bg-green-100 text-green-600 px-4 rounded-full py-1">${item.category}</p>
                  <p>৳<span>${item.price}</span></p>
                </div>
                <button
                  class="bg-green-600 rounded-full w-full py-2.5 text-white cursor-pointer duration-300 border border-green-600 hover:bg-white hover:text-green-600 ">Add
                  to Cart</button>
              </div>
        `
    })
}

// get single plants from API
const getSingleCategoryAPI =(id) => {
        const url = `https://openapi.programming-hero.com/api/category/${id}`
        getPlants(url)
        isActive(id)
}

// Active Button
const isActive =(id) =>{
    // console.log(id)
    const allBtn = document.querySelectorAll(".ctg-btn")
    allBtn.forEach(element => {
        element.classList.remove("text-white", "bg-green-500")
    });
    getElement(`btn-${id}`).classList.add("text-white", "bg-green-500")
}
