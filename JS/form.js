const contactUsForm = document.querySelector(".contact-us-form")
const contactUsPageForm = document.querySelector(".contact-page-contact-us-form")
const TOKEN = "7428299170:AAE0djA_kcwAMzzQFa1dK6rFi6mIsIw7Tgg"
const CHAT_ID = "-1002179658365"
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`


const contactUsButton = document.querySelector(".contact-us")
const contactUsFormCloseBtn = document.querySelector(".contact-us-form-close-btn")
const contactUsSubmitBtn = document.querySelector(".contact-us-submite-btn")
contactUsFormCloseBtn.addEventListener("click", onClosecontactUsButtonClick)


contactUsForm.addEventListener("submit", onContactUsFormSubmit)
function onContactUsFormSubmit(event){
event.preventDefault()
onClosecontactUsButtonClick()
}

contactUsButton.addEventListener("click", onClosecontactUsButtonClick)

function onClosecontactUsButtonClick(){
    if (contactUsForm.classList.contains("show-contact-us-form")){
        contactUsForm.classList.remove("show-contact-us-form")
    }else {
        contactUsForm.classList.add("show-contact-us-form")
    }
}

contactUsForm.addEventListener("input", onContactUsFormInputChange)

function onContactUsFormInputChange(event){
    console.log(event.target.name);
    if(event.target.value.length>=1 && event.target.name !== "question"){
        
        // event.target.style.borderColor = "red"
        event.target.style.backgroundColor = "rgb(255, 253, 207)"
        event.target.nextElementSibling.classList.remove("show-error")
    }else if(event.target.value.length===0 && event.target.name !== "question") {
        // event.target.style.borderColor = "red"
        event.target.style.backgroundColor = "rgba(173, 106, 106, 0.68)"
        event.target.nextElementSibling.classList.add("show-error")
    }
    if(event.currentTarget.elements.name.value !=="" &&
        event.currentTarget.elements.phone.value !==""
    ){
        contactUsSubmitBtn.classList.remove("disabled")
    }else{
        contactUsSubmitBtn.classList.add("disabled")
    }
}



if(contactUsPageForm){
    contactUsPageForm.addEventListener("submit", handleContactUsFormSubmit)
}
contactUsForm.addEventListener("submit", handleContactUsFormSubmit)
function handleContactUsFormSubmit (event){
event.preventDefault()
const form = event.currentTarget
let message = `Заявка з сайта\n`
message+=`Імʼя: ${form.name.value}\n`
message+=`Телефон: ${form.phone.value}\n`
message+=`Питання: ${form.question.value}\n`

const data = JSON.stringify({chat_id: CHAT_ID, parse_model:"html", text: message})

fetch(URL, {method: "POST", headers: {"Content-Type":"application/json", "Content-Length":data.length}, body:data}).catch((error)=>{console.log(error.message);})
}


