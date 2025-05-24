// const BASE_URL = "https://dlr.novaform.com.ua/api/api-token-auth/"
// const USER_NAME = "KV1e18081"
// const PASSWORD = "u4id9AB@"
// fetch(BASE_URL, {
//     method: "POST",
//     headers: {"Content-type": "application/x-www-form-urlencoded\r\n"},
//     body: new URLSearchParams({
//         username: USER_NAME,
//         password: PASSWORD
//     }).toString()

// }).then(res=>res.json()).then(data=>console.log(data))

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IktWMWUxODA4MSIsInVzZXJfaWQiOjI1NjAsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NvZGUiOiIxMDAwMTgwODEiLCJqdGkiOiJhMmI5Yzk5Yy01OTdmLTExZWYtODI2MS0wMDBjMjllNzQ4OTkiLCJleHAiOjE3MjM1NzM0MTksImVtYWlsIjoicG9ncmVibnlha2FsZXhleUBnbWFpbC5jb20ifQ.UJxOoFFGrOne2nCmXfvQ2ozmX8dlG6oN8PqTM9DHdIc'
// const params = new URLSearchParams({
//     product_code: "100430969",
//         })

// const BASE_URL =`https://dlr.novaform.com.ua/api/pricelist/${params}/json/`
// fetch(BASE_URL, {
    
//     headers: {"Authorization": `${token}`},
   

// }).then(res=>res.json()).then(data=>console.log(data))