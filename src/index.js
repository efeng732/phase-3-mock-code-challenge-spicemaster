// write your code here
//class is . id is #
const spiceDetail = document.querySelector("div#spice-blend-detail")
const spiceImage = document.querySelector("img.detail-image")
const title = document.querySelector("h2.title")
const ul = document.querySelector("ul.ingredients-list")
const updateForm = document.querySelector("form#update-form")
updateForm.dataset.id = 1 

const ingredientForm = document.querySelector("form#ingredient-form")
ingredientForm.dataset.id = 1 


//const spiceList = [] 

renderFirstSpice()

function renderFirstSpice () {

    fetch("http://localhost:3000/spiceblends/1")
    .then( res => res.json())
    .then(spiceObj => {
       spiceImage.src = spiceObj.image 
       title.innerText = spiceObj.title
       
       spiceObj.ingredients.forEach((ingredientObj) => {
           let li = document.createElement("li")
           li.dataset.id = ingredientObj.id
           li.innerText = ingredientObj.name
           ul.append(li)

       })

        })

    }

updateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
   let newTitle = (e.target.title.value)

   fetch(`http://localhost:3000/spiceblends/${e.target.dataset.id}`, {
       method: "PATCH", 
       headers: {
           'Content-Type' : 'application/json'
       }, 
       body: JSON.stringify({
           title: newTitle
       })
   })
   .then(res => res.json())
   .then((updatedTitle => {
       //console.log("UPDATED", updatedTitle)
       title.innerText = updatedTitle.title
   }))

})

ingredientForm.addEventListener("submit", (e) => {
    e.preventDefault()
  let newIngredient = (e.target.name.value) 

  fetch("http://localhost:3000/ingredients" , {
      method: "POST",
      headers: {
          'Content-type' : 'application/json'
        
      }, 
      body:  JSON.stringify({
          name: newIngredient, 
          spiceblendId : 1 
      })
  }) 
  .then(res => res.json())
  .then((createdIngredient) => {
      let li = document.createElement("li")
      li.innerText = createdIngredient.name 
      ul.append(li)
  })
    
})





