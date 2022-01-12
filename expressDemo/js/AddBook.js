
let allBooks = [];

document.addEventListener('DOMContentLoaded',displayPage);
const searchBar = document.getElementById('searchBar');
function displayPage() {
    if(!localStorage.getItem('token')){
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
                    <button class="btn btn-primary" style="border:none; outline:none;" onclick="Edit(this)">Edit</button><br>
                    <button class="btn btn-danger" style="border:none; outline:none;" onclick="Remove(this)" id="${item.ISBN}">Remove</button>
                </div>
                `;
        document.getElementById('myBooks').innerHTML += div;
         
    })
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


//opening the form
document.getElementById('ShForm').addEventListener('click',()=>{
    document.getElementById('addBooks').style.display = 'block';
});

//closing the form
document.getElementById('closeForm').addEventListener('click',()=>{
    document.getElementById('addBooks').style.display = 'none';
});


//Add the books in the post api
document.getElementById('Add').addEventListener('click',()=>{
    const bookDetails = [];
    const form = document.getElementById('addBookForm');
    const formdata = new FormData(document.getElementById('addBookForm'));
    for(let key of formdata.keys()){
        bookDetails.push(formdata.get(key));
    }

    let title =  bookDetails[0];
    let author =  bookDetails[1];
    let price =  bookDetails[2];
    let isbn =  bookDetails[3];
    let img = bookDetails[4];

    axios.post('http://localhost:3000/books/postBooks', {
        book_name : title,
        ISBN : isbn,
        author: author,
        price : price
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
      form.reset();
});

//logging out
document.getElementById('logout').addEventListener('click',()=>{
    window.localStorage.removeItem('token');
    window.location.href = "../index.html";
});

//editing books
function Edit(element){
    let isbnNumber = element.parentNode.getElementsByTagName('*')[7].textContent;
    let editDetails = document.getElementsByName('editInfo');
    
    allBooks.map(item=>{
        item.map(bookDetails => {
            if(bookDetails.ISBN === parseInt( isbnNumber )){
                editDetails[0].placeholder = bookDetails.book_name;
                editDetails[1].placeholder = bookDetails.author;
                editDetails[2].placeholder = bookDetails.price;
                editDetails[3].placeholder = bookDetails.ISBN;
            }
        })
    });
    var modal = document.getElementById("modalHeader");

    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

//updating the edited book
function saveEditing(element){
    //getting the placeholder value of the modal
    let isbnNumber = element.parentNode.getElementsByTagName('*')[18].placeholder;

    //getting the form inputs
    let editDetails = document.getElementsByName('editInfo');

    axios.put(`http://localhost:3000/books/editedBooks/${isbnNumber}`,{
        book_name : editDetails[0].value,
        author: editDetails[1].value,
        price : editDetails[2].value
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}

//remove any book
function Remove(element){
    let isbnNumber = element.id;
    axios.delete(`http://localhost:3000/books/deleteBook/${isbnNumber}`)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log("error in remove function");
    })
    console.log(element.parentNode);
    element.parentNode.remove(element.parentNode);

}
