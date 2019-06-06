

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para1 = document.querySelector('#message-1')
const para2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location= search.value
    para1.textContent="Loading"
    para2.textContent=""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            para1.textContent=data.error
        } else {
            para1.textContent=data.forecast
            para2.textContent=data.location
        }

    })
})
    console.log("testing")
})