$(function (){
    var $url = $('#url');
    var $type = $('#type');
    var $tags = $('#tags');

    $('#edit').on('click',function(){
    
        
 

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance  
         //xmlhttp.withCredentials = true;
        var url = "https://6hyu9pfbw1.execute-api.us-east-1.amazonaws.com/dev/api";
        xmlhttp.open("PUT", url, true);
      
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({"url":$('#url').val(),
                                    "type":$('#type').val(),
                                    "tags":$('#tags').val()}));                        
    })

});