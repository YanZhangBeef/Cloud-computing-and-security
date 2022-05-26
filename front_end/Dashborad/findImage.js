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
        var url = "https://gg5utofzpg.execute-api.us-east-1.amazonaws.com/dev/getbyimage";
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {

                if(xmlhttp.getResponseHeader('content-type')==='application/json'){
                var result = JSON.parse(xmlhttp.responseText);
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
        }
        xmlhttp.open("POST", url, true);

      
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({"base64":reader.result})); 
      };
      
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
    
  }
 
  