import {changeObj,filter,ageSort,nameSort,subjectSort,countrySort,findAge,findNote,findName,validation,getRequest,postData} from './functions.js';
import {randomUserMock} from './FE4U-Lab3-mock.js';

let users=[]
let favUsers=[]
let statsPage=[]
let data= await getRequest(50)
let id=0;
function correctObject(data){
    let res=[]
    for(let temp of data){
        id++;
        let newUser=changeObj(temp,id)
        res.push(newUser)
        newUser.isFavorite=false
        users.push(newUser)
    }
    return res
}
correctObject(data)
//let lastId=++users[users.length-1].id
function generatePopUp(user){
    let popupContainer=document.getElementById('teacher_popup')
    popupContainer.insertAdjacentHTML('afterbegin',`<div class="teacher_form" id="person_popup">
    <div class="form_header" ><p >Teacher Info</p> 
        <img class="cross" src="../images/cross.png" alt="cross" id="popup_cross"></div>
        <div class="block">
            <div class="teacher_picture">
                <img class="picture_container" src="${user.picture_large}" alt="Teacher">
            </div>
        <div class="popup_description">
            <div class="top_info">
                <p id="name_popup" class="information">
                ${user.full_name}
                </p>
            <div class="star" id="popup_star"><img  src="../images/star.png" alt="Star"></div></div>

            <div class="side_info">
            <p class="degree">${user.course} </p>
            <p class="details" id="native_city">${user.city},${user.country}</p>
            <p class="details" id="age_gender">${user.age},${user.gender}</p>
            <a href="" class="mail" id="popup_email">${user.email}</a>
            <p class="details" id="phone_number"> ${user.phone}</p>
        </div>
    </div>
    <p class="footer_text" id="personal_info">${user.note} </p>
        <a href="" class="map">Toggle map</a>
        </div>
</div>`)


}
function generateUser(user,teachersPanel){
    teachersPanel.insertAdjacentHTML('beforeend',
    `<div class="person" data-id="${user._id}">
    <div class="photo"><img src="${user.picture_large}" alt="JL" ></div>
    <div class="description">
        <p class="name">
        ${user.full_name}
        </p>
        <p class="major">
        ${user.course}
        </p>
        <p class="country">
        ${user.country}
         </p>
    </div>
</div>`)
}

function popUpCorrection(user){

const star=document.querySelector('#popup_star img')
star.setAttribute('src',user.isFavorite?'../images/star.png':'../images/starcontur.png')
star.addEventListener('click',function (){//додавання в вибрані
    if(user.isFavorite){
    user.isFavorite=false
    favUsers=favUsers.filter(el=>user._id!=el._id)
    document.querySelector(`.teachers_favorites .person[data-id="${user._id}"]`).remove()
    star.setAttribute('src','../images/starcontur.png')
    console.log('delete')
    }
    else{
      user.isFavorite=true
      let favoritesBlock=document.querySelector('.teachers_favorites')  
        generateUser(user,favoritesBlock)
        star.setAttribute('src','../images/star.png')
        favUsers.push(user)
        const thisUser=document.querySelector(`.teachers_favorites .person[data-id="${user._id}"]`)
thisUser.addEventListener('click', showPopUp)
    }
    
})

}function showUsers(users,teachersPanel){
    for(let user of users){
        generateUser(user,teachersPanel)
    }
    let allUsers=document.querySelectorAll('.person')
    allUsers.forEach(user=>{
        user.addEventListener('click', showPopUp);;
    })
}
function showPopUp(){
    let id=this.getAttribute('data-id')
    let person;
    for(let user of users){
        if(id==user._id){
            person=user
        break
        }    
    }

    let popupContainer=document.getElementById('teacher_popup')
    popupContainer.innerHTML=''
    generatePopUp(person)
    popupContainer.style.display="flex";
    

    popUpCorrection(person)
    let form=document.getElementById('person_popup')
    form.scrollIntoView({block:'center',behavior:'smooth'})
    let cross=document.getElementById('popup_cross')

    cross.addEventListener('click',function(){
    let popupContainer=document.getElementById('teacher_popup')
    popupContainer.innerHTML=''
    popupContainer.style.display="none";
})
}
let teachersPanel=document.querySelector('.teachers')
let favoritesPanel=document.querySelector('.favorites .container')


showUsers(users,teachersPanel)
function logoOnClick(){
    let topTeachers=document.querySelector('#teachers_info h2')
    topTeachers.innerText='Top Teachers'
    teachersPanel.innerHTML=''
    let filtersBlock=document.querySelector('.filters')
    filtersBlock.style.visibility='visible'
    let getTeachers=document.getElementById('getNewTeachers')
    getTeachers.style.visibility='visible'
    showUsers(users,teachersPanel)
    updateTable(users)

}
let popupContainer=document.getElementById('teacher_popup')
    popupContainer.innerHTML=''
    popupContainer.style.display="none";
let logo=document.querySelector('.logo')
logo.addEventListener('click',function(){
    logoOnClick()
})
let filter_button=document.querySelector('#filter_button')
filter_button.addEventListener('click',function(){
   teachersPanel.innerHTML=''
    let age=document.getElementById('age')
    let country=document.getElementById('region')
    let gender=document.getElementById('sex')

    let filterResult=filter(users,country.value,age.value,gender.value)
    showUsers(filterResult,teachersPanel)
    updateTable(filterResult)
    let getTeachers=document.getElementById('getNewTeachers')
    getTeachers.style.visibility='hidden'

})
let flilter_fav=document.querySelector('.favorite_filters')
let favorite_fav_button=flilter_fav.querySelector('#filter_button')
favorite_fav_button.addEventListener('click',function(){
    let favoritesBlock=document.querySelector('.teachers_favorites')  
    favoritesBlock.innerHTML=''
     let age=flilter_fav.querySelector('#age')
     let country=flilter_fav.querySelector('#region')
     let gender=flilter_fav.querySelector('#sex')
 
     let filterResult=filter(favUsers,country.value,age.value,gender.value)
     showUsers(filterResult,favoritesBlock)
 
 })
function deleteTableRows(){
    let rows=document.querySelectorAll('.rows')
for(let row of rows){
    row.remove()
}
}
function showTablePage(statsPage){
    let table=document.querySelector('table')
deleteTableRows()
let tableText=''
for(let user of statsPage){
    tableText+=`<tr class='rows' >
    <td id="left">${user.full_name}</td>
    <td>${user.course}</td>
    <td>${user.age}</td>
    <td>${user.gender}</td>
    <td>${user.country}</td>
</tr>`
}
table.insertAdjacentHTML('beforeend',tableText)
}
function createPage(number,statsPage,users){
  let userBorder=number*10
 statsPage.splice(0,statsPage.length)

    for(let i=userBorder-10;i<Math.min(userBorder,users.length);i++){
        statsPage.push(users[i])
    }
    }
    function createForm(){
        if( document.getElementById('form_popup')!=null)
        document.getElementById('form_popup').remove()
        document.body.insertAdjacentHTML('afterbegin',`
        <div  class="add_teacher" id="form_popup">
<div class="teacher_form">
    <div class="form_header"><p >Add Teacher</p> 
    <img class="cross formCross" src="../images/cross.png" alt="cross"></div>
    <div class="form_content">
    <form>
    
        <div class="form_field">
        <div class="parametr">Name</div>
            <input class="name_field" type="text" placeholder="Enter name" required>
    </div>
        <div class="form_field">
        <div class="parametr">Specialty</div>
            <select name="specialty" id="Specialty">
            <option value="Mathematics" selected label="Mathematics"></option>
            <option value="Chemistry" label="Chemistry" ></option>
            <option value="Biology" label="Biology" ></option>
            <option value="English" label="English" ></option>
            <option value="Computer Science" label="Computer Science" ></option>
            <option value="Dancing" label="Dancing" ></option>
            <option value="Chess" label="Chess" ></option>
            <option value="Law" label="Law" ></option>
            <option value="Medicine" label="Medicine" ></option>
            </select>

    </div>
    <div class="form_field" id="two_fields">
        <div class="element">
            <div class="parametr">Country</div>
            <select name="country" id="state">
            <option value="Denmark" label="Denmark" selected ></option>
            <option value="Germany" label="Germany" ></option>
            <option value="United States" label="United States" ></option>
            <option value="Finland" label="Finland" ></option>
            <option value="Turkey" label="Turkey" ></option>
            <option value="New Zealand" label="New Zealand" ></option>
            <option value="Iran" label="Iran" ></option>
                </select>
        </div>
        <div class="element">
            <div class="parametr">City</div>
            <input id="cityField" type="text" required>
        </div>
    </div>
    <div class="form_field" id="two_fields">
        <div class="element">
            <div class="parametr" >Email</div>
            <input id="mailField" type="text" required>
        </div>
        <div class="element">
            <div class="parametr">Phone</div>
            <input id="phoneField" type="text" required>
        </div>
    </div>
    <div class="form_field" >
        <div class="element">
            <div class="parametr">Date of birth</div>
            <input id="dateField" type="date" value="2018-07-22" required>
        </div>
    </div>
    <div class="form_field" id="sex_form">
        <div class="parametr">Sex
           </div> <div class="radio">
            <label for="male">Male</label>
            <input type="radio" value="Male" id="male" checked name="sex">
            <label for="female">Female</label>
            <input type="radio" value="Female" id="female" name="sex">
        </div>
    </div>
<div class="form_field">
    <div class="parametr">Background color <input class="color" type="color" ></div>
</div>
<div class="form_field">
    <div class="parametr">Notes(optional)</div>
    <textarea class="noteField"></textarea>
</div>
<input type="submit"  class="form_button addTeacher" value="Add">
</div>
</form>
</div>
</div>
        `)
        let cross=document.querySelector('.formCross')
        cross.addEventListener('click',function(){
            document.getElementById('form_popup').remove()
          
        })
        let form=document.querySelector('#form_popup .teacher_form')
        form.scrollIntoView({block:'center',behavior:'smooth'})
        let teachersForm=document.querySelector('form')
        teachersForm.addEventListener('submit',async function(event){
            event.preventDefault()
            let nameField=form.querySelector('.name_field')
            let subjectField=form.querySelector('#Specialty')
            let countryField=form.querySelector('#state')
            let maleField=form.querySelector('#male')
            let cityField=form.querySelector('#cityField')
            let mailField=form.querySelector('#mailField')
            let phoneField=form.querySelector('#phoneField')
            let dateField=form.querySelector('#dateField')
            let currDate=new Date('03-12-2022')
            let birthDate=new Date(dateField.value)
            let userAge=currDate.getFullYear()-birthDate.getFullYear()
            let noteField=form.querySelector('.noteField')
            let isCorrect=true;
            try{
                validation(nameField.value,maleField.checked?'male':'female',cityField.value,countryField.value,userAge,phoneField.value,mailField.value)
            }
            catch(e){
                alert(e.message)
                isCorrect=false
            }
            if(!isCorrect)
            return;
          
           let newUser={
            gender: maleField.checked?'male':'female',
            full_name: nameField.value,
            city: cityField.value,
            country:countryField.value,
            email:mailField.value,
            b_date:dateField.value,
            age: userAge,
            phone:phoneField.value,
            picture_large: '../images/nophoto.jpg',
            picture_thumnail: '../images/nophoto.jpg',
            _id:++id,
            favorite: "Sport",
            course: subjectField.value,
            note: noteField.value
           }
          
           users.push(newUser)
           generateUser(newUser,teachersPanel)
           logoOnClick()
           updateTable(users)
         postData('http://localhost:3000/teachers',newUser,event).then((data) => {
            console.log(data); 
          });
           const thisUser=document.querySelector(`.person[data-id="${newUser._id}"]`)
thisUser.addEventListener('click', showPopUp)
           document.getElementById('form_popup').remove()
          
        })
    }
    function createPageNumber(usersAmount){
        let pageAmount=Math.ceil(usersAmount/10.0)
        
        console.log(pageAmount)
        let pages=document.querySelector('.pages')
        pages.innerHTML=''
        let res=''
        for(let i=1;i<=pageAmount;i++){
            res+=` <a href="#statistics">${i}</a>`
        }
        pages.insertAdjacentHTML('afterbegin',res)
    }
    function updateTable(users){
        createPage(1,statsPage,users)
        showTablePage(statsPage)
        createPageNumber(users.length)
        let pagesNumber=document.querySelectorAll('.pages a')
        
        for(let pageNumber of pagesNumber){
            pageNumber.addEventListener('click',function(){
               let number=Number.parseInt(pageNumber.innerText)
               createPage(number,statsPage,users)
                showTablePage(statsPage)
            })
        }
    }
    updateTable(users)
let nameTable=document.querySelector('.tableName')
nameTable.addEventListener('click',function(){
    nameSort(statsPage)
showTablePage(statsPage)
})
let tableSpecialty=document.querySelector('.tableSpecialty')
tableSpecialty.addEventListener('click',function(){
    subjectSort(statsPage)
showTablePage(statsPage)
})
let tableAge=document.querySelector('.tableAge')
tableAge.addEventListener('click',function(){
    ageSort(statsPage)
showTablePage(statsPage)
})
let tableNationality=document.querySelector('.tableNationality')
tableNationality.addEventListener('click',function(){
    countrySort(statsPage)
showTablePage(statsPage)
})
let searchButton=document.querySelector('.searchButton')
searchButton.addEventListener('click',function(){
    let searchInfo=document.getElementById('field')
    let parameters=searchInfo.value.split(',')    
    let res=[]
    if(parameters.length==0||parameters[0]=='')
    return;
    
    if(parameters.length==1){
        if(!isNaN(parameters[0])){
            findAge(Number.parseInt(parameters[0]),res,users)
        }
        else{
            findName(parameters[0],res,users)
        }
    }let tempRes=[]
    if(parameters.length>=2){
        findAge(Number.parseInt(parameters[1]),tempRes,users)
            findName(parameters[0],res,tempRes)
    }
    if(parameters.length==3){
        tempRes=res.slice(0,res.length)
        res=res.slice(0,0)
        console.log(res)
       findNote(parameters[2],res,tempRes)
       
    }
    let filtersBlock=document.querySelector('.filters')
    filtersBlock.style.visibility='hidden'
    let getTeachers=document.getElementById('getNewTeachers')
    getTeachers.style.visibility='hidden'
    let topTeachers=document.querySelector('#teachers_info h2')
    topTeachers.innerText='Search Results'
    teachersPanel.innerHTML=''
    showUsers(res,teachersPanel)
    updateTable(res)
})
let addTeacherButtons=document.querySelectorAll('.addTeacherButton')
addTeacherButtons.forEach(e=>{
e.addEventListener('click',function(){
    createForm()
    
})
})
let getTeachers=document.getElementById('getNewTeachers')
getTeachers.addEventListener('click',async function(){
    let data= await getRequest(10)
    
    data=correctObject(data)
    showUsers(data,teachersPanel)
    updateTable(users)
})