const container = document.querySelector('.container')
const form = document.querySelector('form')
const search = document.getElementById('search')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const randomSearch = 'random'


API_URL = `https://api.unsplash.com/search/photos?per_page=20&page=1&query=${randomSearch}&client_id=CyoIzVmV6-Zoi6WDS8iouT1PkEYe4tr9axS8LeZRBPg`

let currentpage = 1
prev.disabled = true

//-----------------------------------------------
// Getting Images Object/Array From unsplash.com
//------------------------------------------------

async function getImages(url){
    const response = await fetch(API_URL)
    const data = await response.json()
    results = data.results
    makeImage(results)
    console.log(results[1])
}

//-------------------------------------------------------------------
// Creating HTML images div from the Object from getImage() function
//-------------------------------------------------------------------

function makeImage (Imgages) {
    container.innerHTML = ''

    Imgages.forEach(image => {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('image-container')
        imgContainer.innerHTML = `
            <div class="loading-effect"></div>
            <img src="http://source.unsplash.com/${image.id}/300x500" onload="endLoadEffect()">
            <div class="upload-by">
                <img src="${image.user.profile_image.small}">
                <p>${image.user.first_name}</p>
            </div>
            <a href="https://www.instagram.com/${image.user.instagram_username}" target="blank" class="insta"><img src="insta.png"></a>
            <a href="${image.links.download}?force=true" download="dddd" target="_blank" class="download"><i class="fas fa-arrow-down"></i></a>
        `
        container.appendChild(imgContainer)
    }); 
}

//-----------------------------------------------
// Getting Images By search
//------------------------------------------------


form.addEventListener('submit', (event) => {
    event.preventDefault()
    currentpage = 1
    prev.disabled = true
    
    const searchInput = search.value
    if (searchInput && searchInput!== '') {
        // search.value = ''
        API_URL = `https://api.unsplash.com/search/photos?per_page=20&page=${currentpage}&query=${searchInput}&client_id=CyoIzVmV6-Zoi6WDS8iouT1PkEYe4tr9axS8LeZRBPg`
        getImages(API_URL)
        scrollToTop()
    }else{
        window.location.reload()
    } 
})

//-----------------------------------------------
// Pagination Functions
//------------------------------------------------


next.addEventListener('click', () => {
    currentpage++
    API_URL = `https://api.unsplash.com/search/photos?per_page=20&page=${currentpage}&query=${search.value && search.value !== '' ? `${search.value}`: randomSearch}&client_id=CyoIzVmV6-Zoi6WDS8iouT1PkEYe4tr9axS8LeZRBPg`
    getImages(API_URL)
    prev.disabled = false
})
prev.addEventListener('click', () => {
    currentpage--
    if(currentpage === 1){
        prev.disabled = true
    }else{
        prev.disabled = false
    }
    API_URL = `https://api.unsplash.com/search/photos?per_page=20&page=${currentpage}&query=${search.value && search.value !== '' ? `${search.value}`: randomSearch}&client_id=CyoIzVmV6-Zoi6WDS8iouT1PkEYe4tr9axS8LeZRBPg`
    getImages(API_URL)
})

//---------------------------------------------------------------
// Scroll to Top Function after clicking next/ prev or searching
//-----------------------------------------------------------------

function scrollToTop () {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"

    })
}

//-----------------------------------------------
// Loading Effect Function
//------------------------------------------------

function endLoadEffect() {
    const imgs = document.querySelectorAll('.loading-effect')
    imgs.forEach(img => {
        setTimeout(() => {
            img.classList.remove('loading-effect')
        }, 1000);
        
    })
}

//Default Function Call
getImages(API_URL)
