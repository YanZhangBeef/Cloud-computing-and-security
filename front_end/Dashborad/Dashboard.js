document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
   
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    let filename = document.querySelector('#filename');
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;



        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance  
         //xmlhttp.withCredentials = true;
        var url = "https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/postimage";
        xmlhttp.open("POST", url, true);
        var id_token = "eyJraWQiOiJqazA1bU1OTGpUQVNmUWxoNTZFbDZJT0ZhT0dkYUY3WmF6Z3lUaThQS3p3PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiV2xEYUp5LTV6X0tjZnpjTjMxQTB5ZyIsInN1YiI6IjEyNDM2ZDY4LTU2OWQtNGZiNS05MmE2LWMwZmQ0NzYwMjA1MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9HZDVWeU9ZVHciLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJhZG1pbiIsImF1ZCI6IjcyMzc3bm8zMzNpYzNnNHVqN3JvMWU4cmE2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NTM2MzA2MDYsInBob25lX251bWJlciI6IisxMjM0NTYiLCJleHAiOjE2NTM2Mzc4MDYsImlhdCI6MTY1MzYzMDYwNiwianRpIjoiYTUzMjQ3Y2QtZjI3OS00MDc4LWIyZWMtNDdkYWNlYjFlYjdjIiwiZW1haWwiOiJ5emhhMDgwMEBzdHVkZW50Lm1vbmFzaC5lZHUifQ.ePRUTGOFNi6ncY94sIlNHlNGwRDpZvPn0bAeAtTVRHZz0JjrrLY2M9OXdyPDUOT3f2WcsSRJ8_EB2h4x9LDYsUOWAhwW9yt3PbHg4L3bd_dA7wrjERIQFtnpOlSh-XWHOAqJNIo1XGAQd3GyHsGHwmcyJn96-CGHYUKl5YsEi8ZeeMiYd8HXx-5xRTWxL7q9lWlnV_-ChUdL8XhWfWFT51EQYadEuomnT0aBVg5RgI7M0uxiDKabZLaT97elT6eJUogm2QEtxERQJ6eJtRzReUK3eKN5oCnqe4CiHLb92bHc3QAlP_Y9r4U3E7UKmwVZhV8LWYon_OjHWplfVFO20Q";
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Authorization", id_token);
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
      }
        xmlhttp.send(JSON.stringify({"filename":filename.value, "base64":reader.result})); 
      };
      
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
    
  }
 
  