

/** ******** Your code here! *********** */
 let id = 0
const randomElement = (arr) => {
    let random = Math.floor(Math.random() * arr.length)
    return arr[random]
}
const subjects = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
    "Law", "Art", "Medicine", "Statistics"]
const color = ["Black", "White", "Yellow", "Green", "Red", "Blue"]

export function changeObj(randomUser,id) {
    let tempObj = {
        gender: randomUser.gender.toLowerCase(),
        full_name: randomUser.name.first + " " + randomUser.name.last,
        title: randomUser.name.title,
        city: randomUser.location.city,
        state: randomUser.location.state,
        country: randomUser.location.country,
        postcode: randomUser.location.postcode,
        coordinates: randomUser.location.coordinates,
        timezone: randomUser.location.timezone,
        email: randomUser.email,
        b_date: randomUser.dob.date,
        age: randomUser.dob.age,
        phone: randomUser.phone,
        picture_large: randomUser.picture.large,
        picture_thumnail: randomUser.picture.thumbnail,
        _id: id,
        favorite: "Sport",
        course: randomElement(subjects),
        bg_color: randomElement(color),
        note: "This is note"
    }

    return tempObj
}
export async function getRequest(amount){
    let res=[]
  let response= await fetch(`https://randomuser.me/api?results=${amount}`)
 let json= await response.json()

 return  json.results
}
export async  function postData(url = '', data = {},event) {
    event.preventDefault();
    const response = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });
  
  }
function concatUnique(changedArray) {
    let result = []
    changedArray.forEach(function (element) {
        if (!imp.additionalUsers.includes(element))
            result.push(element)
    })
    return result
}/**errors number*/
export function validation( full_name, gender,  city, country, age, phone, email ) {
    if (!stringValidation(full_name))
    throw new Error('Wrong name')
    else{
        if (typeof gender != "string")
        throw new Error('Incorrect gender')
        else{
                    if (!stringValidation(city))
                    throw new Error('Incorrect city')
                    else{
                         if (!stringValidation(country))
                        throw new Error('Incorrect country')
                        else{
                             if (typeof age != "number")
                             throw new Error('Incorrect age')
                             else{
                                if (!(phone.match('(\\+380)[0-9]{9}')||phone.match('(\\+1)[0-9]{10}')))
                                throw new Error('Incorrect phone number')
                                else{
                                if (!email.includes('@'))
                                throw new Error('Incorrect email')
                                }
                    }
                       
                }
                    
            }
                
        }
            
    }
}/** */
export function filter(array, country, age, gender ) {
    let result = []
    let ageLimits=age.split('-')
    array.forEach(e => {
        if ((country=='Default'||e.country == country) && (age=='Default'||(e.age>= ageLimits[0]&&e.age<=ageLimits[1])) && (gender=='Default'||e.gender == gender))
            result.push(e)
    })
    return result
}
function stringValidation(text) {
    if (typeof text == "string"&&text.length!=0 && text[0] == text[0].toUpperCase())
        return true;
    return false;
}



export function ageSort(result) {
    result.sort(function (a, b) {
        return a.age - b.age;
    })
}
export function nameSort(result) {
    result.sort(function (a, b) {
        if (a.full_name > b.full_name)
            return 1;
        if (a.full_name < b.full_name)
            return -1;
        return 0;

    })
}
function reverseNameSort(result) {
    result.sort(function (a, b) {
        if (a.full_name < b.full_name)
            return 1;
        if (a.full_name > b.full_name)
            return -1;
        return 0;

    })
}
export function subjectSort(result) {
    result.sort(function (a, b) {
        if (a.course > b.course)
            return 1;
        if (a.course < b.course)
            return -1;
        return 0;

    })
}
function b_daySort() {
    result.sort(function (a, b) {
        if (a.b_date > b.b_date)
            return 1;
        if (a.b_date < b.b_date)
            return -1;
        return 0;

    })
}

function b_dayReverseSort() {
    result.sort(function (a, b) {
        if (a.b_date < b.b_date)
            return 1;
        if (a.b_date > b.b_date)
            return -1;
        return 0;

    })
}
export function countrySort(result) {
    result.sort(function (a, b) {
        if (a.country > b.country)
            return 1;
        if (a.country < b.country)
            return -1;
        return 0;

    })
}
export function findName(name,res,users) {
    users.forEach(e => {
        if (e.full_name.toUpperCase().includes(name.toUpperCase()))
        res.push(e)
    })
}

export function findNote(note,res,users) {
    
    users.forEach(e => {
        if (e.note.includes(note))
        res.push(e)
    })
 
}
export function findAge(age,res,users) {
    users.forEach(e => {
        if (e.age == age)
        res.push(e)
    })
}
function findAgePer(age, bool) {
    let count = 0;
    result.forEach(e => {
        if (e.age >= age && bool)
            count++;
        if (e.age <= age && !bool)
            count++;

    })

    return count / result.length * 100
}
function findNamePer(name) {

    return findName(name).length / result.length * 100
}
