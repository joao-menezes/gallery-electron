let favorites = JSON.parse(localStorage.getItem('favorites')) || []
const imgContainer = document.querySelector('.image')
const button = document.querySelector('button')
const gallery = document.querySelector('.gallery')
const showGalleryBtn = document.getElementById('showGalleryBtn')
const preview = document.querySelector('.preview')
const fullscreen = document.querySelector('.fullscreen')

button.onclick = () => updateImage()
    
imgContainer.onclick = () => updateAll()

fullscreen.onclick = () => setFullscreen()

showGalleryBtn.onclick = () => showAllGallery()

function getState(){
    const imageSource = document.querySelector('.image img').src
    const index = favorites.indexOf(imageSource)
    const existsInLocalStorage = index !== -1

    return {imageSource, index, existsInLocalStorage}
}

function updateAll(){
    updateFav()
    updateClasses()
}

function updateFav(){
    const {existsInLocalStorage,index,imageSource} = getState()
    existsInLocalStorage
    ? favorites.splice(index, 1)
    : favorites.push(imageSource)

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses(){
    const {existsInLocalStorage} = getState()
    imgContainer.classList.remove('fav')
    if(existsInLocalStorage) imgContainer.classList.add('fav')
    
}

async function updateImage(){
    await getExternalImage()
    updateClasses()
}

let getExternalImageURL;
async function getExternalImage(){
    // const res = await fetch('https://source.unsplash.com/random')
    const res = await fetch('https://source.unsplash.com/featured')
    imgContainer.innerHTML = `<img src="${res.url}" alt=""/>`
    getExternalImageURL = res.url
}

function setFullscreen() {
    PreviewImg(getExternalImageURL)
}

getExternalImage();

function reverseGallery(){
    favorites.reverse()
    showAllGallery()
}

function showAllGallery(){
    gallery.innerHTML = ""
    favorites.forEach((fav,index) => {
        gallery.innerHTML += `
        <div class="img-container">
            <div class="zoom">
                <img src="${fav}" onclick="PreviewImg('${fav}')" alt=""/>
            </div>
            <p class="counter">${index + 1}</p>
           <div class="buttons">
                <button class="delete" onclick="deleteImage(${index})" title="Delete"></button>
                <button class="setBg" onclick="PreviewImg('${fav}')" title="Preview"></button>
                <button class="download" onclick="downloadImg('${fav}')" title="Download"></button>
           </div>
        </div>
        `
       })

}

function downloadImg(fav){
    fetch(`${fav}`, {mode: 'no-cors'})   
    .then(res => res.blob())
    .then(blob => {
        let blobUrl = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.download = fav.replace(/^.*[\\\/]/, '');
        a.href = blobUrl
        document.body.appendChild(a)
        a.click()
        a.remove()
    })
}

function closePreview(){
    preview.style.display = 'none'
    document.body.style.overflow = 'auto'
}

function PreviewImg(fav){
    document.getElementById('bg').style.backgroundImage = `linear-gradient(to top,rgb(19, 15, 13) 5%, rgba(0, 0, 0, 0) 98%),url(${fav})`
    preview.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    preview.innerHTML = `        
        <div class="action-button-preview">
        <button type="button" class="closePreview" onclick="closePreview()"></button>
            <button class="download" onclick="downloadImg('${fav}')" title="Download"></button>
        </div>
        <img src="${fav}" alt=""/>
  `
}

function deleteImage(index){
    favorites.splice(index, 1)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    closePreview()
    showAllGallery()
}