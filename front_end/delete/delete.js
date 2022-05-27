// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/deletebyurl${userData}`;

            linkTag.setAttribute("href", webLink);
            linkTag.click();

        }
        //console.log(userData);
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
           
        } 
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
        
    }

}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/deletebyurl${selectData}`;
        //webLink = `${userData}`
        linkTag.setAttribute("href", webLink);
        linkTag.click();
        //console.log(JSON.stringify(selectData));

    }
    searchWrapper.classList.remove("active");
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance  

            var url = "https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/deletebyurl";
            //console.log(url)
            xmlhttp.open("DELETE", url, true);
            xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {  
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
            }
        };
        var id_token ="eyJraWQiOiJqazA1bU1OTGpUQVNmUWxoNTZFbDZJT0ZhT0dkYUY3WmF6Z3lUaThQS3p3PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiV2xEYUp5LTV6X0tjZnpjTjMxQTB5ZyIsInN1YiI6IjEyNDM2ZDY4LTU2OWQtNGZiNS05MmE2LWMwZmQ0NzYwMjA1MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9HZDVWeU9ZVHciLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbiIsImF1ZCI6IjcyMzc3bm8zMzNpYzNnNHVqN3JvMWU4cmE2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTM2MzA2MDYsInBob25lX251bWJlciI6IisxMjM0NTYiLCJleHAiOjE2NTM2Mzc4MDYsImlhdCI6MTY1MzYzMDYwNiwianRpIjoiYTUzMjQ3Y2QtZjI3OS00MDc4LWIyZWMtNDdkYWNlYjFlYjdjIiwiZW1haWwiOiJ5emhhMDgwMEBzdHVkZW50Lm1vbmFzaC5lZHUifQ.ePRUTGOFNi6ncY94sIlNHlNGwRDpZvPn0bAeAtTVRHZz0JjrrLY2M9OXdyPDUOT3f2WcsSRJ8_EB2h4x9LDYsUOWAhwW9yt3PbHg4L3bd_dA7wrjERIQFtnpOlSh-XWHOAqJNIo1XGAQd3GyHsGHwmcyJn96-CGHYUKl5YsEi8ZeeMiYd8HXx-5xRTWxL7q9lWlnV_-ChUdL8XhWfWFT51EQYadEuomnT0aBVg5RgI7M0uxiDKabZLaT97elT6eJUogm2QEtxERQJ6eJtRzReUK3eKN5oCnqe4CiHLb92bHc3QAlP_Y9r4U3E7UKmwVZhV8LWYon_OjHWplfVFO20Q";
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Authorization", id_token);
        xmlhttp.send(JSON.stringify({"url":selectData}));
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
