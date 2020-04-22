function myFunction(parameter) {

    var xmlHttp = new XMLHttpRequest();
    var ipaddr= document.getElementsByName('nodeMcuIp')[0].value
      xmlHttp.open( "GET", "http://"+ipaddr+parameter, false ); 
    xmlHttp.send( null );
    
}