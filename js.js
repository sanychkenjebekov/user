const card = document.querySelector('.user')
const cardModalCard = document.querySelector('.userModal--card')
const cardModal = document.querySelector('.userModal')
const input = document.querySelector('.input')


let usersData = []

async function getUser (){
   try {
       const url = await fetch(`https://jsonplaceholder.typicode.com/users`)
       const res = await url.json()
       // data(res)
       usersData = res
       allData(usersData)
   }catch (err){
       console.log(err.message)
   }
}

getUser()

function allData(users){
    card.innerHTML = ''

    if (users.length === 0) {
        card.innerHTML = '<p>Ничего не найдено</p>';
    }
   users.forEach(user => {
       const userCard = document.createElement('div');
       userCard.className = 'user--card'
       userCard.innerHTML += `
<h2>${user.username}</h2>
<p>name: <span>${user.name}</span></p>
<p>number: ${user.phone}</p>
<p>email: ${user.email}</p>
<p>website: ${user.website}</p>
`
       card.append(userCard)
       userCard.addEventListener('click',()=>{
           cardModal.style.transform = 'translateY(0)'
           cardModalCard.innerHTML = `
<h1>${user.username}</h1>
<p>City: ${user.address.city}</p>
<p>Street: ${user.address.street}</p>
`
       })
   })
}

cardModal.addEventListener('click',()=>{
    cardModal.style.transform = 'translateY(-100%)'
})

input.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = usersData.filter(user =>
        user.username.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText)
    );
    allData(filteredUsers);
});

