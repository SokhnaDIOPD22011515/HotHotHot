const hamburgerButton = document.querySelector(".hamburger")
const navigation = document.querySelector("nav")

hamburgerButton.addEventListener ("click", toggleNav)

function toggleNav() {
    hamburgerButton.classList.toggle("active")
    navigation.classList.toggle("active")
}

const image = document.getElementById('user');
image.addEventListener('click', function() {
    alert('Bonjour cher utilisateur !');
});