$(function (){
    var $url = $('#url');
    var $type = $('#type');
    var $tags = $('#tags');

    $('#edit').on('click',function(){
    
        
 

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance  
         //xmlhttp.withCredentials = true;
         xmlhttp.onreadystatechange = function(){
             if(this.readyState == 4 && this.status == 200){
                 console.log(xmlhttp.responseText);

             }else{
                 console.log("error")
             }
         };
        var url = "https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/putimage";
        xmlhttp.open("PUT", url, true);
      
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({"url":$('#url').val(),
                                    "type":$('#type').val(),
                                    "tags":$('#tags').val()}));                        
    })

});