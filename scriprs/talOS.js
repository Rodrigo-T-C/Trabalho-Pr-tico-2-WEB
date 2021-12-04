var body = document.querySelector("body");
body.addEventListener("load", PerfilOAD());

function PerfilOAD() {
  let requis = new XMLHttpRequest();

  requis.onload = function () {
    let data = JSON.parse(this.responseText);
    let profileintro = `
  
    <div class="col-12 col-sm-6 col-md-3 col-lg-3">

        <p>
            <img src="${data.avatar_url}" class="img-fluid">
            
        </p>
        
        
    </div>

    <div class="col-12 col-sm-6 col-md-9 col-lg-9">

        <p>
            <h2>${data.name}</h2>
            
            <b>Sobre Mim:</b>
            <p>
            ${data.bio}
            
            </p>
            <div>
                <p>
                    
                    <div class="row col-12 col-sm-6 col-lg-6">
                        
                        
                        
                        
                        
                        
                    </div>
                    
                    

                </p>
                </div>
            <div>
                <p>
                    
                    <div class="row col-12 col-sm-6 col-lg-6">
                        
                        <div><img src="imgs/layout (1).png" class="img-fluid"></div>
                        
                        
                        
                        
                    </div>
                    
                    

                </p>
                </div>

        </p>
        
        
        
    </div>
                
                        `;

    document.getElementById("intro").innerHTML = profileintro;
  };

  requis.onerror = function () {
    alert(`Erro na request, error: "  ${this.status} - ${this.statusText} `);
  };
  requis.open("GET", "https://api.github.com/users/Rodrigo-T-C");

  requis.send();

  replOAD();
}

function replOAD() {
    let req = new XMLHttpRequest();
  
    req.onload = () => {
      let dataJson = JSON.parse(req.responseText);
      let repoContainerEl = document.querySelector("#repoAll");
      let allReposArr = [];
  
      for (let data of dataJson) {
        let repoUnit = `
                          <div class="repoUnit">
                          <a
                          target="_blank"
                          href="${data.html_url}"
                          >
                          <img class="repoimg" src="imgs/25231.png"/>
                          </a>
                          <div class="repoDesc">
                          <h3>${data.name}</h3>
                          <p>
                              ${data.description}
                          </p>
                          
                          </div>
                      </div>
                      <hr style="width:100%;text-align:left;margin-left:0">
                      `;
  
        allReposArr.push(repoUnit);
      }
      repoContainerEl.innerHTML = allReposArr.join("");
    };
  
    req.onerror = function () {
      alert(`Erro na request, error: "  ${this.status} - ${this.statusText} `);
    };
    req.open("GET", "https://api.github.com/users/Rodrigo-T-C/repos");
  
    req.send();
  }

  function pesq(searchIn) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        const dataJson = JSON.parse(xhr.responseText);
        const responseItems = dataJson.items;
        let searchContainer = document.querySelector("#searchContainer");
        let allSearchArr = [];
  
        for (let data of responseItems) {
          let responseUnit = `
                  <a target="_blank" href="${data.html_url}" 
                    <div class="searchImgEl">
                          <img src="${data.avatar_url}" alt="resultado da pesquisa - imagem" />
                          <h4>Nome: ${data.login}</h4>
                    </div>
                  </a>
                  <hr style="width:100%;text-align:left;margin-left:0">
                  `;
          allSearchArr.push(responseUnit);
          if (allSearchArr.length == 5) {
            break;
          }
        }
        if (allSearchArr.length != 0 || allSearchArr.length != null) {
          searchContainer.innerHTML = allSearchArr.join("");
        } else {
          searchContainer.innerHTML = `
                    <div class="searchImgEl">
                          <h4>Nenhum resultado</h4>
                    </div>
        `;
        }
        document.querySelector(".containerSearch").style.display = "block";
      }
    });
  
    let searchQuery = "https://api.github.com/search/users?q=" + searchIn.value;
    xhr.open("GET", searchQuery);
    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
    xhr.onerror = function () {
      alert(`Erro na request, error: "  ${this.status} - ${this.statusText} `);
    };
    xhr.send();
  }
  
  let searchIn = document.querySelector("input[name=search]");
  let searchBtn = document.getElementById("searchBtn");
  
  searchIn.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      // Trigger the button element with a click
      searchBtn.click();
    }
  });
  
  searchBtn.addEventListener("click", function (event) {
    pesq(searchIn);
  });