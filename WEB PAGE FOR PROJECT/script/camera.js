var fileByteArray = [];

//using webcam API
//configuring webcam and allowing access
function configure(){
	document.getElementById("instruct").style.display = "none";
	document.getElementById("my_camera").style.display = "flex";

    Webcam.set({
		height: '300',
		width: '400',
     image_format: 'jpeg',
     jpeg_quality: 90
    });
    Webcam.attach( '#my_camera' );
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
    Webcam.snap( function(data_uri) {
    // display results in page
    document.getElementById('results').innerHTML = 
     '<img id="imageprev" src="'+data_uri+'"/>';
    } );
    
    Webcam.reset();

    var byteArray;
    var base64image = document.getElementById("imageprev").src;
    console.log(base64image);
    
    var uintArray = Base64Binary.decode(base64image);  
    var byteArray = Base64Binary.decodeArrayBuffer(base64image); 

    console.log(uintArray);
	console.log(byteArray);
	
	return;

}

//clearing image
function clearImg(){
	
	document.getElementById("results").style.display = "none";
	document.getElementById("image").style.display = "flex";
	
}

// function for converting base_64_image to byte array
var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = (input.length/4) * 3;
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);
		
		return ab;
	},

	removePaddingChars: function(input){
		var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
		if(lkey == 64){
			return input.substring(0,input.length - 1);
		}
		return input;
	},

	decode: function (input, arrayBuffer) {
		//get last chars to see if are valid
		input = this.removePaddingChars(input);
		input = this.removePaddingChars(input);

		var bytes = parseInt((input.length / 4) * 3, 10);
		
		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;
		
		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));
	
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
	
			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}
	
		return uarray;	
	}
}

