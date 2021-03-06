console.log('Clientside javaascript enabled')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

messageOne.textContent =''
messageTwo.textContent =''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading.....'
    messageTwo.textContent =''
    //fetch function to load json data
    const place = search.value
    fetch('/weather?address='+place).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecastData
        }
    })
})
})