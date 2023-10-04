console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

window.addEventListener('load', function(){
    fetch(imgUrl)
        .then(res => res.json())
        .then(dogs => appendDogs(dogs))
        .catch(e => console.log(e));

    fetch(breedUrl)
        .then(res => res.json())
        .then(breeds => appendBreeds(breeds))
        .catch(e => console.log(e));
});

function appendDogs(dogs){
    let imageContainer = document.querySelector('#dog-images');

    for(image of dogs['message']){
        let dogsList = document.createElement('li');
        dogsList.innerHTML = `
            <img src=${image}/>
        `;
        imageContainer.appendChild(dogsList);
    }
}

function appendBreeds(breeds){
    let breedList = document.querySelector('#dog-breeds');

    for(breed in breeds['message']){
        let breedItem = document.createElement('li');
        breedItem.textContent = breed;
        breedList.appendChild(breedItem);
    }

    breedList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.style.color = 'red';
        }
    });

    const filterDropdown = document.querySelector('#filter-dropdown');

    filterDropdown.addEventListener('change', function(event) {
        const selectedLetter = event.target.value.toLowerCase();
        filterBreedsByLetter(selectedLetter);
    });
}

function filterBreedsByLetter(letter) {
    const breedList = document.querySelector('#dog-breeds');
    const breedItems = breedList.getElementsByTagName('li');

    for (let i = 0; i < breedItems.length; i++) {
        const breedName = breedItems[i].textContent.toLowerCase();
        if (breedName.startsWith(letter)) {
            breedItems[i].style.display = 'list-item';
        } else {
            breedItems[i].style.display = 'none';
        }
    }
}
