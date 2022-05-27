// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/getbytags?${userData}`;
            //webLink = `${userData}`
            //console.log(userData);
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        //console.log(userData);
       
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box

        
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
    //console.log(userData);
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance  
         //xmlhttp.withCredentials = true;
        var url = "https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/getbytags?"+ userData;
        //console.log(url)
        xmlhttp.open("GET", url, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {  
                if(xmlhttp.getResponseHeader('content-type')==='application/json'){
                var result = JSON.parse(xmlhttp.responseText);               
                console.log(result);       
                var details = result['links'];
                //console.log(a);
                var list = 	"List:"+"<br>";
                    console.log(details);
                    for(let i = 0; i<details.length;i++){
                        list += details[i]+ "<br>";
                    }
                    document.getElementById("list").innerHTML = list;        
              if(result.code===-1){
                        alert('error!!!');
              }
                } else {
                    console.log(xmlhttp.responseText);
                }            
            }
        };
        var id_token ="eyJraWQiOiJqazA1bU1OTGpUQVNmUWxoNTZFbDZJT0ZhT0dkYUY3WmF6Z3lUaThQS3p3PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiV2xEYUp5LTV6X0tjZnpjTjMxQTB5ZyIsInN1YiI6IjEyNDM2ZDY4LTU2OWQtNGZiNS05MmE2LWMwZmQ0NzYwMjA1MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9HZDVWeU9ZVHciLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbiIsImF1ZCI6IjcyMzc3bm8zMzNpYzNnNHVqN3JvMWU4cmE2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTM2MzA2MDYsInBob25lX251bWJlciI6IisxMjM0NTYiLCJleHAiOjE2NTM2Mzc4MDYsImlhdCI6MTY1MzYzMDYwNiwianRpIjoiYTUzMjQ3Y2QtZjI3OS00MDc4LWIyZWMtNDdkYWNlYjFlYjdjIiwiZW1haWwiOiJ5emhhMDgwMEBzdHVkZW50Lm1vbmFzaC5lZHUifQ.ePRUTGOFNi6ncY94sIlNHlNGwRDpZvPn0bAeAtTVRHZz0JjrrLY2M9OXdyPDUOT3f2WcsSRJ8_EB2h4x9LDYsUOWAhwW9yt3PbHg4L3bd_dA7wrjERIQFtnpOlSh-XWHOAqJNIo1XGAQd3GyHsGHwmcyJn96-CGHYUKl5YsEi8ZeeMiYd8HXx-5xRTWxL7q9lWlnV_-ChUdL8XhWfWFT51EQYadEuomnT0aBVg5RgI7M0uxiDKabZLaT97elT6eJUogm2QEtxERQJ6eJtRzReUK3eKN5oCnqe4CiHLb92bHc3QAlP_Y9r4U3E7UKmwVZhV8LWYon_OjHWplfVFO20Q";
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Authorization", id_token);
        xmlhttp.send(JSON.stringify({"search":userData}));
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/getbytags?${selectData}`;
        //webLink = `${userData}`
        linkTag.setAttribute("href", webLink);
        linkTag.click();
        console.log(JSON.stringify(selectData));

    }
    searchWrapper.classList.remove("active");
   
}


