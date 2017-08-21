//console.log('Loaded!');
var button = document.getElementById('counter');
var counter =0;

button.onclick = function(){
    
    //make request to end-point
    var request= new XMLHttpRequest();
    
    //capture the responce and store it in the a variable
    
    //render the variable in correct span
    counter = counter+1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};