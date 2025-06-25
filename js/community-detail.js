const title = document.querySelector('.title')
const category = document.querySelector('.category')
const content = document.querySelector('.group-content')
const urlParmas = new URLSearchParams(window.location.search)
const id = urlParmas.get('id')

fetch(`https://kdt-api.fe.dev-cos.com/documents/${id}`,{
  method: 'GET',
  headers: {
    "x-username" : 'fes-6-whereisgym'
  }
}).then(res => res.json())
  .then(data => {
    const [categorytext,titletext] = data.title.split('-') 
    title.textContent = titletext
    category.textContent = categorytext
    content.textContent = data.content

    return data
})
  

  
