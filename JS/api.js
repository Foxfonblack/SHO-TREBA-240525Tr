
 
//  const data = fetch()
// const BASE_URL = "https://api.novaposhta.ua/v2.0/json/"
// const searchParams = new URLSearchParams(
//     {
//         "apiKey": "279f6e42f099a104003dce764d05d9d9",
//         "modelName": "AddressGeneral",
//         "calledMethod": "searchSettlements",
//         "methodProperties": {
//      "CityName" : "київ",
//      "Limit" : "50",
//      "Page" : "2"
//         }
//      }
// )
// const URL = `${BASE_URL}?${searchParams}`
// console.log(URL);

// fetch(URL, {
//     method: "GET", 
//     headers: {
//         "apiKey": "279f6e42f099a104003dce764d05d9d9",
//         "Content-Type": "application/json",
//     }
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(error=>console.log(error))

const BASE_URL = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = "279f6e42f099a104003dce764d05d9d9";

// Параметры запроса
const requestPayload = {
    apiKey: apiKey,
    modelName: "AddressGeneral",
    calledMethod: "searchSettlements",
    methodProperties: {
        CityName: "київ",
        Limit: "50",
        Page: "2"
    }
};

// Выполняем запрос
fetch(BASE_URL, {
    method: "POST", 
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload)
})
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

