// Re-useable function
const getElement =(id)=> {
    return document.getElementById(id)
}
const getCategories =()=> {
    const url = "https://openapi.programming-hero.com/api/categories"
    fetch(url)
    .then(response => response.json()) 
    .then(data => showCategories(data.categories))
}
getCategories()
const showCategories =(categories)=> {
    categories.forEach(element => {
        console.log(element)
    });
}
