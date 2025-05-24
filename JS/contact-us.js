const contactUsForm = document.querySelector(".contact-page-contact-us-form")
const contactUsSubmitBtn = document.querySelector(".contact-page-contact-us-submite-btn")

console.log(contactUsForm, contactUsSubmitBtn);

contactUsForm.addEventListener("submit", onContactUsFormSubmit)
function onContactUsFormSubmit(event){
event.preventDefault()
event.currentTarget.reset()
contactUsSubmitBtn.classList.add("disabled")
event.currentTarget.elements.name.style = ""
event.currentTarget.elements.phone.style = ""
}



contactUsForm.addEventListener("input", onContactUsFormInputChange)

function onContactUsFormInputChange(event){
    console.log(event.target.name);
    if(event.target.value.length>=1 && event.target.name !== "question"){
        
        // event.target.style.borderColor = "red"
        event.target.style.borderColor = "green"
    event.target.style.backgroundColor = "rgba(0, 128, 0, 0.06)"
        event.target.nextElementSibling.classList.remove("show-error")
    }else if(event.target.value.length===0 && event.target.name !== "question") {
        // event.target.style.borderColor = "red"
        event.target.style.borderColor = "red"
        event.target.style.backgroundColor = "rgba(255, 0, 0, 0.06)"
        event.target.nextElementSibling.classList.add("show-error")
    }
    if(event.currentTarget.elements.name.value !=="" &&
        event.currentTarget.elements.phone.value !==""
    ){
        console.log("hjhg")
        contactUsSubmitBtn.classList.remove("disabled")
    }else{
        contactUsSubmitBtn.classList.add("disabled")
    }
}
