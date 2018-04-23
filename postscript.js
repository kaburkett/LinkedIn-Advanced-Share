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

});
