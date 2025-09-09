// Re-useable function
const getElement = (id) => {
        return document.getElementById(id)
    }
    // Load the Category from The API
const getCategories = () => {
        const url = "https://openapi.programming-hero.com/api/categories"
        fetch(url)
            .then(response => response.json())
            .then(data => showCategories(data.categories))
    }
    // Show category
getCategories()
const showCategories = (categories) => {
    const categoriesContainer = getElement("categories-container")
    categoriesContainer.innerHTML = ""

    categories.forEach(element => {
        categoriesContainer.innerHTML += `<li>
                <a id="btn-${element.id}" onclick="getSingleCategoryAPI(${element.id})" class="ctg-btn px-4 py-2 duration-300 hover:bg-green-500 hover:text-white rounded-lg block">${element.category_name}</a>
              </li>
        `
    });
}


// Get Plants 

const getPlants = (url) => {
        // console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => showPlants(data.plants))

    }
    // Get All Plants From The APIs
const getAllPlantsAPI = () => {
    const url = "https://openapi.programming-hero.com/api/plants"
    getPlants(url)

}
getAllPlantsAPI()

// Shows Plants
const showPlants = (plants) => {
    const plantsContainer = getElement("plants_container")
    plantsContainer.innerHTML = ""
    plants.forEach(item => {
        plantsContainer.innerHTML += `
        <div class="bg-white space-y-3 p-5 rounded-lg">
                <img class="h-40 w-full rounded-md object-cover " src="${item.image}"
                  alt="">
                <h4 onclick="openModal(${item.id})" class=" cursor-pointer font-bold text-xl">${item.name}</h4>
                <p class="text-[12px] text-black/50">${item.description}</p>
                <div class="flex justify-between items-center">
                  <p class="bg-green-100 text-green-600 px-4 rounded-full py-1">${item.category}</p>
                  <p>৳<span>${item.price}</span></p>
                </div>
                <button id="${item.id}"
                  class="bg-green-600 rounded-full w-full py-2.5 text-white cursor-pointer duration-300 border border-green-600 hover:bg-white hover:text-green-600 ">Add
                  to Cart</button>
              </div>
        `
    })
    isLoading(false)
}

// get single plants from API
const getSingleCategoryAPI = (id) => {
    isLoading(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    getPlants(url)
    isActive(id)
}

// Active Button
const isActive = (id) => {
        // console.log(id)
        const allBtn = document.querySelectorAll(".ctg-btn")
        allBtn.forEach(element => {
            element.classList.remove("text-white", "bg-green-500")
        });
        getElement(`btn-${id}`).classList.add("text-white", "bg-green-500")
    }
    // Add to cart input
let cartbox = []
getElement("plants_container").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            // console.log("yes am button")
            const title = event.target.parentNode.children[1].innerText
            const id = event.target.id
            const price = event.target.parentNode.children[3].children[1].children[0].innerText
            const object = { title, price, id, quantity: 1 }
            const idcheck = cartbox.find(item => item.id === id)
            if (idcheck) {
                idcheck.quantity++
            } else {
                cartbox.push(object)
            }


            // console.log(cartbox)
            showCart(cartbox)
        } else {
            // console.log("no am button nooooooi")
        }
    })
    // Show Cart Products
const showCart = (AllCart) => {
    // console.log(AllCart)
    const cartCointainter = getElement("cart-cointainter")
    const takaaaaaaa = getElement("takaaaaaaa")
    let total = 0
    cartCointainter.innerHTML = ""

    AllCart.forEach(item => {
        // console.log(item)
        total += Number(item.price * item.quantity)
        cartCointainter.innerHTML += `
        <div class="bg-green-100 p-3 rounded-lg">
                  <div class="flex justify-between items-center ">
                    <div class="">
                      <h4>${item.title}</h4>
                      <p>৳ <span>${item.price}</span> x <span>${item.quantity}</span></p>
                    </div>
                    <button onclick="removeCart(${item.id})" ><i class="fa-solid fa-xmark"></i></button>
                  </div>
                </div>
        `
    })
    takaaaaaaa.innerText = total
}

const removeCart = (id) => {

    cartbox.map((item, index) => {
        if (item.id == id) {
            cartbox.splice(index, 1)
            showCart(cartbox)
                // console.log(cartbox)
        }
    })
}

const isLoading = (status) => {
    if (status) {
        getElement("loading").classList.remove("hidden")
        getElement("plants_container").classList.add("hidden")
    } else {
        getElement("loading").classList.add("hidden")
        getElement("plants_container").classList.remove("hidden")
    }
}

//  Modal
const openModal = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const plant = data.plants;
    const modalContainer = getElement('modal_container');
    modalContainer.innerHTML = '';
    modalContainer.innerHTML += `
                <div class="space-y-3">
                    <h4 class="text-xl font-bold">${plant.name}</h4>
                    <img class="w-full rounded-lg h-50 object-cover" src="${plant.image}" alt="${plant.name}">
                    <p class="font-bold">Category: <span class="font-normal">${plant.category}</span></p>
                    <p class="font-bold">Price: <span class="font-normal">৳${plant.price}</span></p>
                    <p class="font-bold">Description: <span class="font-normal">${plant.description}</span></p>
                </div>
    `;
    getElement('my_modal_5').showModal();
};