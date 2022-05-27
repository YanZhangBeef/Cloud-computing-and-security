$(function (){
    $('#edit').on('click',function(){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance  
         //xmlhttp.withCredentials = true;
         xmlhttp.onreadystatechange = function(){
             if(this.readyState == 4 ){
                if(xmlhttp.getResponseHeader('content-type')==='application/json'){
                    var result = JSON.parse(xmlhttp.responseText);               
                            //console.log(result);
                            document.getElementById("json").innerHTML = JSON.stringify(result);
                    if(result.code===-1){
                            alert('error!!!');
                    }
                    } else {
                        console.log(xmlhttp.responseText);
                    } 

             }else{
                 console.log("error")
             }
         };
        var url = "https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/putimage";
        var id_token = "eyJraWQiOiJqazA1bU1OTGpUQVNmUWxoNTZFbDZJT0ZhT0dkYUY3WmF6Z3lUaThQS3p3PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiV2xEYUp5LTV6X0tjZnpjTjMxQTB5ZyIsInN1YiI6IjEyNDM2ZDY4LTU2OWQtNGZiNS05MmE2LWMwZmQ0NzYwMjA1MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9HZDVWeU9ZVHciLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbiIsImF1ZCI6IjcyMzc3bm8zMzNpYzNnNHVqN3JvMWU4cmE2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTM2MzA2MDYsInBob25lX251bWJlciI6IisxMjM0NTYiLCJleHAiOjE2NTM2Mzc4MDYsImlhdCI6MTY1MzYzMDYwNiwianRpIjoiYTUzMjQ3Y2QtZjI3OS00MDc4LWIyZWMtNDdkYWNlYjFlYjdjIiwiZW1haWwiOiJ5emhhMDgwMEBzdHVkZW50Lm1vbmFzaC5lZHUifQ.ePRUTGOFNi6ncY94sIlNHlNGwRDpZvPn0bAeAtTVRHZz0JjrrLY2M9OXdyPDUOT3f2WcsSRJ8_EB2h4x9LDYsUOWAhwW9yt3PbHg4L3bd_dA7wrjERIQFtnpOlSh-XWHOAqJNIo1XGAQd3GyHsGHwmcyJn96-CGHYUKl5YsEi8ZeeMiYd8HXx-5xRTWxL7q9lWlnV_-ChUdL8XhWfWFT51EQYadEuomnT0aBVg5RgI7M0uxiDKabZLaT97elT6eJUogm2QEtxERQJ6eJtRzReUK3eKN5oCnqe4CiHLb92bHc3QAlP_Y9r4U3E7UKmwVZhV8LWYon_OjHWplfVFO20Q";
        xmlhttp.open("PUT", url, true);
      
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Authorization", id_token);
        xmlhttp.send(JSON.stringify({"url":$('#url').val(),
                                    "type":$('#type').val(),
                                    "tags":$('#tags').val()}));                        
    })

});