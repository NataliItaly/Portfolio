const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-img');
const portfolioBtnWrapper = document.querySelector('.portfolio-btn-wrapper');




portfolioBtnWrapper.addEventListener('click', changeImage);


function changeImage(event) {

    if (event.target.classList.contains('portfolio-btn')) {
        for (let i = 0; i < portfolioBtn.length; i++) {
            portfolioBtn[i].classList.remove('active-btn');
        }
        
        event.target.classList.add('active-btn');

        let dataValue = event.target.getAttribute("data-season");
        portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio/${dataValue}/${index + 1}.jpg`);
                     
    }

}






