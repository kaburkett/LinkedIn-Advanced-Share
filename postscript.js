$(document).ready(function(){

$("#submit_button").click(function organizeinput(){
	if (IN.User.isAuthorized() == true){
var values = new Array();
//comment, title, description, image-content, image-url
// Get the parameters as an array
values = $(":input").serializeArray();
// Find and replace `content` if there
var countinput=0;
for (index = 0; index < values.length; ++index) 
	{
	    if (values[index].name == "comment" && values[index].value != "") 
	    {
	        var comment;
	        comment = values[index].value;
	        countinput=countinput+1;
	    }
	    if (values[index].name == "title" && values[index].value != "") 
	    {
	        var title;
	        title = values[index].value;
	        countinput=countinput+1;
	    }
	    if (values[index].name == "description" && values[index].value != "") 
	    {
	       var description;
	       description = values[index].value;
	       countinput=countinput+1;
	    }
	    if (values[index].name == "image-content" && values[index].value != "") 
	    {
	        var imagecontent;
	        imagecontent = values[index].value;
	        countinput=countinput+1;
	    }
	    if (values[index].name == "image-url" && values[index].value != "") 
	    {
	        var imageurl;
	        imageurl = values[index].value;
	        countinput=countinput+1;
	    }
	}	

if (countinput == 5){
var postcontent = new Array();
postcontent = {"comment": values[1].value, "content": {"title": values[0].value,"description": values[3].value,"submitted-url": values[2].value,"submitted-image_url": values[4].value},"visibility": {"code": "anyone"} };
postcontent = JSON.stringify(postcontent);

shareContent(postcontent);
}
else alert("All the fields are required.");
}
else alert("You have to login to linkedin before you can post content.");
});


function onLinkedInLoad() {
	  IN.Event.on(IN, "auth", organizeinput);
	}

  // Handle the successful return from the API call
  function onSuccess(data) {
    console.log(data);
    alert("Post Successful!");
  }

  // Handle an error response from the API call
  function onError(error) {
    console.log(error);
    alert("Oh no, something went wrong. Check the console for an error log.");
  }

  // Use the API call wrapper to share content on LinkedIn
  function shareContent(pcontent) {

    IN.API.Raw("/people/~/shares?format=json")
  .method("POST")
  .body(pcontent)
  .result(onSuccess)
  .error(onError);
}


//function executepost (pcontent)
//{
	//$.post("https://api.linkedin.com/v1/people/~/shares?format=json", postcontent, function() {return null;});
	// Setup an event listener to make an API call once auth is complete
	
	
//}

});

/*
$.ajax({
    url: "https://api.linkedin.com/v1/people/~/shares?format=json",
    type: 'post',
    data: postcontent,
    headers: {
    	'Content-Type': 'application/json',
		'x-li-format': 'json'
    },
    dataType: 'json',
    success: function (data) {
        console.info(data);
    }
});*/

// Convert to URL-encoded string
//values = jQuery.param(values);
/*
if (crflag ==1)
{
	$.post("index.php", values, function(response) {processdata(response); return response;});
}
else
{
	alert("Sorry, looks like we are missing some input");
}
//$.post("db_insert.php", $(":input").serializeArray(), function(tabledata){$("#result").html(tabledata);});
*/
