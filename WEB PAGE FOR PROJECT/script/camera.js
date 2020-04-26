var fileByteArray = [];

//using webcam API
//configuring webcam and allowing access
function configure() {
	document.getElementById("instruct").style.display = "none";
	document.getElementById("my_camera").style.display = "flex";

	Webcam.set({
		height: '300',
		width: '400',
		image_format: 'jpeg',
		jpeg_quality: 90
	});
	Webcam.attach('#my_camera');
}


// preload shutter audio clip
var shutter = new Audio();
shutter.autoplay = false;
shutter.src = navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : '../audio/shutter.mp3';

function take_snapshot() {
	// play sound effect
	shutter.play();
	document.getElementById("image").style.display = "none";
	document.getElementById("results").style.display = "flex";

	// take snapshot and get image data
	Webcam.snap(function (data_uri) {
		// display results in page
		document.getElementById('results').innerHTML =
			'<img id="imageprev" src="' + data_uri + '"/>';
	});

	Webcam.reset();

	var byteArray;
	var base64image = document.getElementById("imageprev").src;
	console.log(base64image);

	var byteArray = convertDataURIToBinary(base64image);
	console.log(byteArray);

	var xmlHttp = new XMLHttpRequest();
	var ipaddr = document.getElementsByName('pythonServerIp')[0].value;
	xmlHttp.open("POST", "http://" + ipaddr + ":5000/image", true);


	xmlHttp.onload = function (e) {
		if (xmlHttp.readyState === 4) {
			if (xmlHttp.status === 200) {
				console.log("HELLO");
				console.log(xmlHttp.responseText);
				var result = JSON.parse(xmlHttp.responseText);
				var name = result.person;
				console.log(name);
				unlock_door(name);
			} else {
				console.log("NO");
				console.error(xmlHttp.statusText);

			}
		}
	};


	xmlHttp.send(byteArray);

	return;

}


// function for unlocking door.

function unlock_door(name) {

	var ipaddr = document.getElementsByName('nodeMcuIp')[0].value;

	if (name === "Arnav") {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", "http://" + ipaddr + "/doorunlock", false);
		xmlHttp.send(null);
		window.open("../html/IOT_Lock.html", "_self");
		window.alert("Welcome Arnav")
	}
	else {
		window.alert("wrong user");
	}
}


//clearing image
function clearImg() {

	document.getElementById("results").style.display = "none";
	document.getElementById("image").style.display = "flex";

}

// function for converting base_64_image to byte array

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Int8Array(new ArrayBuffer(rawLength));

	for (i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}



// function to expand 
function expand() {
	var element = document.getElementById("web_cam");
	element.style.maxWidth = "100%";
	element.style.overflow = "visible";
}