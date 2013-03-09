function loginCheck(){

	var username = localStorage.getItem("username");

	if (username == ""){
		$.mobile.changePage( "index.html#loginPage", { transition: "slideup"} );
		return false;
	}  else{
		return true;
	}
}

function logout(){
	localStorage.clear();
	window.location.href= "index.html";
}