
var button = document.getElementById('counter');

button.onclick = function(){
    
    //Create a request object
    var request= new XMLHttpRequest();
    
    //capture the responce and store it in the a variable
    requesst.onreadystatechange=function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responceText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    //make the request
    request.open('GET','http://masterkaushikrao.imad.hasura-app.io/counter',true);
    request.send(null);
};