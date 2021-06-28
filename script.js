const container = document.querySelector('.container')
const form = document.querySelector('form')
const search = document.getElementById('search')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const randomSearch = 'random'


API_URL = `https://api.unsplash.com/search/photos?per_page=20&page=1&query=${randomSearch}&client_id=CyoIzVmV6-Zoi6WDS8iouT1PkEYe4tr9axS8LeZRBPg`

let currentpage = 1
prev.disabled = true


async function getImages(url){
    const response = await fetch(API_URL)
    const data = await response.json()
    results = data.results
    makeImage(results)
}
function makeImage (Imgages) {
    container.innerHTML = ''

    Imgages.forEach(image => {
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('image-container')
        imgContainer.innerHTML = `
        <img src="http://source.unsplash.com/${image.id}/300x500">
        <p class="upload-by">Uploaded by ${image.user.first_name}</p>
        `
        container.appendChild(imgContainer)
    }); 
}

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

function scrollToTop () {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"

    })
}
getImages(API_URL)
