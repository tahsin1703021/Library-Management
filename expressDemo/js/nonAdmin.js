document.addEventListener('DOMContentLoaded',displayPage);

const searchBar = document.getElementById('searchBar');
let allBooks = [];
function displayPage() {
    if(!localStorage.getItem('token'))
    {
        alert('Session ID expired or authentication failure')
        window.location.replace('http://127.0.0.1:5501/expressDemo/index.html', '_self');
    }else{
        loadBody();
    }
}

const loadBody = async () => {
    axios.get("http://localhost:3000/books/getAllBooks")
    .then(result => {
            allBooks.push(result.data);

            displayBooks(allBooks[0]);
        }
    )
    .catch(err => console.log(err))
}

const displayBooks = (data) => {
    data.map(item => {
             const div = `
                 <div class="card" style="width: 18rem;background: transparent;">
                 <img class="card-img-top" src="" alt="Card image cap">
                     <div class="card-body">
                     <h5 class="card-title">${item.book_name}</h5>
                     <p class="card-text">Author :<b>${item.author}</b></p>
                     <p class="card-text">Price :<b>${item.price}</b> </p>
                     <p class="card-text">ISBN :<b>${item.ISBN}</b></p>
                     </div>
                 </div>
                 `;
         document.getElementById('myBooks').innerHTML += div;
          
     })
 }
 
 const searchBarBooks = (data) =>{
    data.map(item => {
        const div = `
            <div class="card" style="width: 18rem;background: transparent;">
                <div class="card-body">
                    <h5 class="card-title">${item.book_name}</h5>
                    <p class="card-text">Author :<b>${item.author}</b></p>
                    <p class="card-text">Price :<b>${item.price}</b> </p>
                    <p class="card-text">ISBN :<b>${item.ISBN}</b></p>
                </div>
                <button class="btn btn-primary" style="border:none; outline:none;" onclick="Edit(this)">Edit</button><br>
                <button class="btn btn-danger" style="border:none; outline:none;" onclick="Remove(this)" id="${item.ISBN}">Remove</button>
            </div>
            `;
    document.getElementById('myBooks').innerHTML = div;   
});
    
}
//search bar content
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredBooks = [];
    allBooks[0].map( bookDetails => {
        const name = bookDetails.book_name.toLowerCase();   
        if( name.includes(searchString))
                filteredBooks.push(bookDetails);
    }); 
    searchBarBooks(filteredBooks);
});
 //logging out
document.getElementById('logout').addEventListener('click',()=>{
    window.localStorage.removeItem('token');
    window.location.href = "../index.html";
});
