var member_id = localStorage.getItem('member_id');


$('#releasespg').live('pageshow', function(event) {
	getReleases();
});

$('#productcheckspg').live('pageshow', function(event) {
	getProducts();
});

$('#availabilitypg').live('pageshow', function(event) {
    getAvailabilityHistory();
});

$('#newspg').live('pageshow', function(event) {
    getNewsFeed();
});

$("#createAccountBtn").live('click',function(event){
    var username = $(".createusername").val();
    var password = $('.createpassword').val();
    var confirm = $('.passwordconfirm').val();

    if (password !== confirm){
        alert("Passwords do not match");
        return;
    }

    createAccount(username,password);
});

$('.addReleaseAlert').live('click',function(event){
    var element = $(event.target);
    var product_id = element.attr('data-product-id');
    addReleaseAlert(product_id);
});

$('.addRestockAlert').live('click',function(event){
    var element = $(event.target);
    var product_id = element.attr('data-product-id');
    addRestockAlert(product_id);
});


function makePost(endPoint,formData){

 var results = "";

 $.ajax({
        type: "POST",
        url: serviceURL+endPoint,
        async: false,
        cache: false,
        data: formData,
        success: function(data) {
			results = jQuery.parseJSON(data);
		} // end sucess
    });

  return results;
}

function getReleases(){
	 var releases = makePost("releaseDates",'');
     $( "#releasesTemplate" ).tmpl( releases ).appendTo("#releases")
     //$("#releases").trigger("create");
     $(".button").button();

  }

  function getProducts(){
     var releases = makePost("productsChecks",'');
     $( "#productsTemplate" ).tmpl( releases ).appendTo("#productChecks");

     $(".button").button();
  }

  function createAccount(username,password){
    var data = {
        'username' : username,
        'password' : password
    };

    var member_id = makePost("createAccount",data);

    if (status !== false){
        localStorage.setItem('username', username);
        localStorage.setItem('member_id',member_id);
        location.href = 'dashboard.html';
    }else{
        alert('This email address is ');
    }

  }

   function getNewsFeed(){
       var news = makePost("rssFeeds",'');
       $( "#newsTemplate" ).tmpl( news ).appendTo("#news");
       console.log(news);
  }

  function addReleaseAlert(product_id){
    var data = {
        'product_id' : product_id,
        'member_id' : member_id
    };

   // $( '#releasesPopup' ).popup('open');
   alert('You will be notified two hours before the shoe drops on release day.');
    makePost("addReleaseAlert",data);
  }

   function addRestockAlert(product_id){
    var data = {
        'product_id' : product_id,
        'member_id' : member_id
    };

    $( '#productChecksPopup' ).popup('open');
    makePost("addRestockAlert",data);
  }




function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}