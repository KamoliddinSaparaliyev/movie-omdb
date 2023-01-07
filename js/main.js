let omdbapi = "https://www.omdbapi.com/?&apikey=cf44afca&";
let searchResults = document.querySelector('#searchResults');
const formSearch = document.querySelector('#form-search'),
    searchInput = document.querySelector('#searchInput'),
    messageFond = document.querySelector('#resultsFond'),
    modalFilm = document.querySelector('#modal-body'),
    pageItem = document.querySelector('.page-item'),
    pagination = document.querySelector('#pagination');

let inputValue = "world";
let page = 1;


formSearch.onsubmit = (e) => {
    e.preventDefault();
    inputValue = searchInput.value.trim()

    if (inputValue) {
        fetch(`${omdbapi}s=${inputValue}`)
            .then(response => response.json())
            .then(data => renderFilms(data))
            .catch(err => console.log(err))
    } else {
        alert("Enter text")
    }
    e.target.reset()

}


function handleClick(id) {
    modalFilm.innerHTML = `
     <div class="lds-default ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>`
    fetch(`${omdbapi}i=${id}`)
        .then(response => response.json())
        .then(data =>
            modalFilm.innerHTML = `
                <div class="container">
                    <div class="row justify-content-center g-5 align-items-center">
                        <div class="col-md-6 ">
                            <img style="object-fil:cover;"  src="${data.Poster === 'N/A' ? "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" : data.Poster}" alt="${data.Title}" alt="${data.Title}" class=" shadow" width="400" height="600">
                        </div>
                        <div class="col-md-6  text-start">
                            <h5 class="fw-bold fs-1">${data.Title === "N/A" ? "Not found" : data.Title}</h5>
                            <hr class="w-75"/>
                            <div class="d-flex gap-3 ms-3 mb-0">
                                <p class=" bg-danger text-white d-inline p-1 rounded"> ${data.imdbRating === "N/A" ? "Not found" : data.imdbRating} </p>
                                <p class="bg-white text-dark rounded p-1 fw-semibold">${data.Type === "N/A" ? "Not found" : data.Type} </p>
                                <p class="bg-white text-dark rounded p-1 fw-semibold">${data.Year === "N/A" ? "Not found" : data.Year} </p>
                            </div>
                            <hr class="mt-0 w-75"/>
                            <p class="fs-5  mt-3" style= "font-famliy:sans-serif;">${data.Plot === "N/A" ? "Not found" : data.Plot}</p>
                            <hr class="mt-0 "/>
                            <ul class="list-unstyled mt-4">
                                <li class="fw-semibold ">Written by: <span class="fw-normal text-info">${data.Writer === "N/A" ? "Not found" : data.Writer}  </span> </li>
                                <li class="fw-semibold my-3">Directed by: <span class="fw-normal text-info">${data.Director === "N/A" ? "Not found" : data.Director} </span> </li>
                                <li class="fw-semibold">Starring: <span class=" text-info">${data.Actors === "N/A" ? "Not found" : data.Actors} </span> </li>
                                <li class="fw-semibold mt-3">Runtime: <span class=" text-success">${data.Runtime === "N/A" ? "Not found" : data.Runtime} </span> </li>
                                <li class=" fw-bold mt-3 " > Genre:<span class=" fw-semibold ms-2 bg-white d-inline text-dark rounded p-1 ${data.Genre.split(", ")[0] ? data.Genre.split(", ")[0] : "d-none"} ">${data.Genre.split(", ")[0] === "N/A" ? "Not found" : data.Genre.split(", ")[0]}</span ><span class=" fw-semibold ms-2 bg-white d-inline text-dark rounded p-1 ${data.Genre.split(", ")[1] ? data.Genre.split(", ")[1] : "d-none"} ">${data.Genre.split(", ")[1]}</span ><span class=" fw-semibold ms-2 ${data.Genre.split(", ")[2] ? data.Genre.split(", ")[2] : "d-none"} bg-white d-inline text-dark rounded p-1 ">${data.Genre.split(", ")[2]} </span ></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
        `)
        .catch(err => console.log(err))
}

function renderFilms(data) {

    searchResults.innerHTML = "";
    totalPages = Math.ceil(data.totalResults / 10)
    createPagination(totalPages, page = 1)
    searchArray = data.Search
    messageFond.textContent = `Results:${data.totalResults ? data.totalResults : "0"}`;

    for (let i = 0; i < searchArray.length; i++) {
        const element = searchArray[i];
        searchResults.innerHTML += `
        <div onclick="handleClick('${element.imdbID}')"  data-bs-toggle="modal" data-bs-target="#exampleModalLong" class="entity border rounded rounded-4 h-100 shadow">
            <img  class="rounded rounded-4  rounded-bottom" width="270" src="${element.Poster === 'N/A' ? "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" : element.Poster}" alt="${element.Title}" height="350" style="object-fit: cover;">
            <h5 class="title mt-2">${element.Title}</h5>
            <p class="type">${element.Type}</p>
        </div>
    `  }
    
}

//pagination


const element = document.querySelector(".pagination ul");


//calling function with passing parameters and adding inside element which is ul tag
element.innerHTML = "";

function createPagination(totalPages, page) {
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (totalPages) {
        
    
        if (page > 1) { //show the next button if the page value is greater than 1
            liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
        }
        if (page > 2) { //if page value is less than 2 then add 1 after the previous button
            liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
            if (page > 3) { //if page value is greater than 3 then add this (...) after the first li or page
                liTag += `<li class="dots"><span>...</span></li>`;
            }
        }

        // how many pages or li show before the current li
        // if (page == totalPages) {
        //     beforePage = beforePage - 2;
        // } else if (page == totalPages - 1) {
        //     beforePage = beforePage - 1;
        // }
        // how many pages or li show after the current li
        if (page == 1) {
            afterPage = afterPage + 2;
        } else if (page == 2) {
            afterPage = afterPage + 1;
        }
        for (var plength = beforePage; plength <= afterPage; plength++) {
            if (plength > totalPages) { //if plength is greater than totalPage length then continue
                continue;
            }
            if (plength == 0) { //if plength is 0 than add +1 in plength value
                plength = plength + 1;
            }
            if (page == plength) { //if page is equal to plength than assign active string in the active variable
                active = "active";
            } else { //else leave empty to the active variable
                active = "";
            }
            liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
        }
        if (page < totalPages - 1) { //if page value is less than totalPage value by -1 then show the last li or page
            if (page < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
                liTag += `<li class="dots"><span>...</span></li>`;
            }
            liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
        }
        if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
            liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
        }
    
        element.innerHTML = liTag; //add li tag inside ul tag
        fetch(`${omdbapi}s=${inputValue}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = " ";
          
                for (let i = 0; i < data.Search.length; i++) {
                    const element = data.Search[i];
                    searchResults.innerHTML += `
        <div onclick="handleClick('${element.imdbID}')"  data-bs-toggle="modal" data-bs-target="#exampleModalLong" class="entity border rounded rounded-4 h-100 shadow">
            <img  class="rounded rounded-4  rounded-bottom" width="270" src="${element.Poster === 'N/A' ? "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" : element.Poster}" alt="${element.Title}" height="350" style="object-fit: cover;">
            <h5 class="title mt-2">${element.Title}</h5>
            <p class="type">${element.Type}</p>
        </div>
    `  }
            })
            .catch(err => console.log(err))
    
        return liTag
    }
}


//body load
document.body.onload = () => {
    fetch(`${omdbapi}s=${inputValue}`)
        .then(response => response.json())
        .then(data => renderFilms(data))
        .catch(err => console.log(err))

}
