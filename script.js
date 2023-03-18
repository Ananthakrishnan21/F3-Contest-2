//3 Promise Functions to fetch API

function PromiseAPI1(){
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{          //used set timeout and data fetched inside it
            resolve(fetch("https://dummyjson.com/posts"))
        },1000)
   })  
}
function PromiseAPI2(){
    return new Promise((resolve,reject)=>{
         setTimeout(()=>{
             resolve(fetch("https://dummyjson.com/products"))
         },2000)
    })  
}
function PromiseAPI3(){
    return new Promise((resolve,reject)=>{
         setTimeout(()=>{
             resolve(fetch("https://dummyjson.com/todos"))
         },3000)
    })  
}

//Dom manipulation..

let btn=document.querySelector('#btn')
let loader=document.querySelector('.loader')
btn.addEventListener('click',call)//by clicking call function is executed
let firstData
let secondData
let thirdData

function call(){
    btn.disabled=true//click function diabled to ensure that we can only click once
    btn.classList.add('hide')//hide classes contains display none property
    loader.classList.remove('hide')//it is used to hide and show elements with respect to our needs
    PromiseAPI1()//first promise is called
        .then((data)=>{
            return data.json()
        })
        .then((data)=>{            
            firstData=data
            post(firstData)//post function is used to manipulate data into html page
            if(data){
                PromiseAPI2()//second promise
                    .then((data)=>{return data.json()})
                    .then((data)=>{
                        secondData=data
                        product(secondData)//passed data as argument to make changes in web page
                        if(data){
                            PromiseAPI3()//third promise
                                .then((data)=>{return data.json()})
                                .then((data)=>{
                                    loader.classList.add('hide')//hides the loader when complete page is loaded
                                    thirdData=data
                                    todo(thirdData)//data passed
                                })
                        }
                    })
            }
        })
}

//Below functions receive data from 3 APIs and present that data into html page by DOM Manipulation
function post(data){
    let posting=document.querySelector('.post-area')
    let postingHead=document.querySelector('.post-heading')
    postingHead.classList.remove('hide')
    let posts=data.posts
    let myHtml=posts.map((items)=>{
        return `
        <div class=post-box>
        <h1>${items.id}.${items.title}</h1>
        <p>${items.body}</p>
        </div>`
    })
    posting.innerHTML=myHtml.join("")
}

function product(data){
    let products=document.querySelector('.product-area')
    let productHead=document.querySelector('.product-heading')
    productHead.classList.remove('hide')
    let productss=data.products
    let myHtml=productss.map((items)=>{
        return `<div class="box">
        <div class="top-box">
            <img class="image" src=${items.thumbnail}>
        </div>
        <div class="bottom-box">
            <p class="tag">Title : <span class="details">${items.title}</span></p>
            <p class="tag">Brand : <span class="details">${items.brand}</span></p>
            <p class="tag">Price : <span class="details">${items.price}</span></p>
            <p class="tag">Rating : <span class="details">${items.rating}</span></p>
            <p class="tag">Stock Left : <span class="details">${items.stock}</span></p>
        </div>
    </div>`
    })
    products.innerHTML=myHtml.join("")
}

function todo(data){
    let todos=document.querySelector('.todo-area')
    todos.classList.remove('hide')
    let todoHead=document.querySelector('.todo-heading')
    todoHead.classList.remove('hide')
    let todoss=data.todos
    let myHtml=todoss.map((items)=>{
        return `<tr>
        <td>${items.id}</td>
        <td>${items.todo}</td>
        <td class='answer'>${items.completed}</td>
        </tr>`
    })
    todos.innerHTML+=myHtml.join("")
    let bool=document.querySelectorAll('.answer')//cells which contain true or false
    for(let i=0;i<bool.length;i++){//this is for giving green colour to task completed & red to task not completed
        let x=bool[i].innerText
        if(x=='true'){
            bool[i].classList.add('done')
        }
        else{
            bool[i].classList.add('not-done')
        }
    }
}

    
