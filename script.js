var validuserName = "abcd";
var validPassword ="1234";
function checkValidInput(){
    let inputUserName = document.getElementById("userName").value;
    let inputPassword = document.getElementById("password").value;
    if(inputUserName != validuserName){
        document.getElementById("userNameError").innerHTML="please enter a valid user name";
    }
    else{
        document.getElementById("userNameError").innerHTML="";
    }
    if(inputPassword != validPassword){
        document.getElementById("passwordError").innerHTML="please enter a valid password";
    }
    else{
        document.getElementById("passwordError").innerHTML="";
    }
    if(inputPassword==validPassword && inputUserName==validuserName){
        location.assign("2ndpage.html")
    }
}