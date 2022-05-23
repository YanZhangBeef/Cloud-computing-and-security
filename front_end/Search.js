const database=[
  {
      name:"f",
      p: "20",
  },
  {
      name:"ac",
      p: "23",
  },
  {
      name:"sv",
      p: "21",
  },
  {
      name:"a",
      p: "23553",
  },
  {
      name:"app",
      p: "123",
  },
];

function selectElement(selector){
  return document.querySelector(selector);

}
function clearResults(){
  selectElement('.search-results').innerHTML = "";
}

function getResults(){
  const search = selectElement('.searchbar').value;

  clearResults();
  if(search.length>0){
      for (let i=0; i< database.length; i++){
          if(
              database[i].name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              ){
                selectElement('.search-results').innerHTML += `
                <div class = "search-results-item">
                    <span class = "search-item">${database[i].name}</span>
                    <span class = "search-item">${database[i].p}</span>
                </div>
                ` 
          }
    }
  }
 
}

selectElement('.searchbar').addEventListener('keyup', getResults); 