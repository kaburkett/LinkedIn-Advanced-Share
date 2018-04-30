$("#submit_button").click(function organizeinput(){
	if($('#post_content')[0].checkValidity() === false){
		alert ("All fields are required");
		return null;
	}
	if (typeof IN.User === "undefined"){
		alert ("You have to login first. If you don't see a login button, check the developer console for an error message.");
		return null;
	}
	if (IN.User.isAuthorized() != true){
		alert ("You have to login to linkedin before you can post content.");
		return null;
	}

	var values = new Array();
	//comment, title, description, image-content, image-url
	// Get the parameters as an array
	values = $(":input").serializeArray();
	var postcontent = new Array();
	postcontent = {"comment": values[1].value, "content": {"title": values[0].value,"description": values[3].value,"submitted-url": values[2].value,"submitted-image_url": values[4].value},"visibility": {"code": "anyone"} };
	postcontent = JSON.stringify(postcontent);
	shareContent(postcontent);
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