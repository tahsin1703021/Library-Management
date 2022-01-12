

let userObj = [];
const loadusers = async () => {
    axios.get('http://localhost:3000/user/registeredUsers')
    .then(result => {
        console.log("i am the loadusers on load body function in index.htlml");
        userObj.push(result.data)
        console.log(userObj[0]);
    })
    .catch(err => console.log(err))
}

document.getElementById('signUpExtension').addEventListener('click',()=>{
    let register = document.getElementById('register');
    register.style.width = '150%'; 
});

document.getElementById('signUp').addEventListener('click',()=>{ 
    
    //getting the input values of the signup form
    let SignUpInfo = document.getElementsByName('SignUpInfo');
    let user_name = SignUpInfo[0].value;
    let password = SignUpInfo[1].value;
    let email = SignUpInfo[3].value;
    let confirmPassword = SignUpInfo[2].value;

    //checking if password and confirm password match
    if(password !== confirmPassword) {
        document.getElementById('passwordError').style.display = 'block';
    }else {
        const userDetails = {
            user_name : user_name,
            password : password,
            email: email
        };
        // checking if username is already taken or not
        let flag = 0;//keeping count if username is already taken
        //looping through the users who already signed up
        userObj.forEach(res => {  
            res.map(user => {
                if(user.user_name === userDetails.user_name)  flag = flag + 1; 
            });
        });
        //if flag>0 the username is already taken
        if(flag !=0)  document.getElementById('userExists').style.display = 'block';
        else{
            
            axios.post('http://localhost:3000/user/registeredUsers', {
                name : user_name,
                password : password,
                email: email
            })
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
            alert(`${userDetails.user_name} is successfully signed up`);
        }
    }
});

document.getElementById('signIn').addEventListener('click',()=>{

    //retrieving the input values fromm the sign in section
    const LogInInfo = document.getElementsByName('LogInInfo');
    const user_name = LogInInfo[0].value;//name
    const password = LogInInfo[1].value; //pass
    
    axios.post('http://localhost:3000/user/login', {
        name : user_name,
        password : password
    })
    .then(function (response) {
        const token = response.data.access_token; 
        window.localStorage.setItem('token',token);
        window.location.href = "pages/nonAdmin.html";
    })
    .catch(function (error) {
        console.log(error);
    });
});

document.getElementById('adminSignIn').addEventListener('click',()=>{

    //retrieving the input values fromm the sign in section
    const adminLogInInfo = document.getElementsByName('adminUserInput');
    const admin_user_name = adminLogInInfo[0].value;//name
    const admin_password = adminLogInInfo[1].value; //pass
    
    axios.post('http://localhost:3000/user/adminLogin', {
        name : admin_user_name,
        password : admin_password
    })
    .then(function (response) {
        const token = response.data.access_token; 
        window.localStorage.setItem('token',token);
        window.location.href = "pages/AddBook.html";
    })
    .catch(function (error) {
        alert(error.message);
    });
});

function showAdminModal(e){
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

document.getElementById("sendLink").addEventListener('click',()=>{
    const email= document.getElementById('forgotPassInfo').value;
    console.log(email);
    axios.post('http://localhost:3000/user/forgot-password', {
        email: email
    })
    .then(function (response) {
        console.log(response);

    })
    .catch(function (error) {
        console.log(error);
    });
})

document.getElementById('fp').addEventListener('click', () => {
    document.getElementById('fPassword').style.display = 'block';
})