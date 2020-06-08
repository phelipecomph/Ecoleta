function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then(res => res.json())
    .then(states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    stateInput.value = event.target.options[event.target.selectedIndex].text

    const ufValue = event.target.value
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

function handleSelectedItem(event){
    const itemLi = event.target
    //add or remove class in js
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    if (alreadySelected != -1){
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems =filteredItems

    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems

    
}
let collectedItems = document.querySelector("input[name=items]")

populateUFs()

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

document
.querySelector("select[name=city]")
.addEventListener("change", (i) => {
    const cityInput = document.querySelector("input[name=iCity]")
    cityInput.value = i.target.options[i.target.selectedIndex].text  
})

//itens de coleta
const itemsToCollect =  document.querySelectorAll(".items-grid li")
let selectedItems = []

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}