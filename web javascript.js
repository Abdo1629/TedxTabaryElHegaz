document.addEventListener('DOMContentLoaded', function() {
    const langToggleBtn = document.getElementById('language-toggle');
    const englishContent = document.querySelectorAll('.english-content');
    const arabicContent = document.querySelectorAll('.arabic-content');
    const header = document.querySelector('.header');
    
    englishContent.forEach(content => content.style.display = 'none');
    arabicContent.forEach(content => content.style.display = 'block');
    englishContent.forEach(content => header.style.direction = 'ltr');
    arabicContent.forEach(content => header.style.direction= 'rtl');
    langToggleBtn.textContent = 'AR';

    langToggleBtn.addEventListener('click', () => {
        if (englishContent[0].style.display === 'none') {
            englishContent.forEach(content => content.style.display = 'block');
            arabicContent.forEach(content => content.style.display = 'none');
            englishContent.forEach(content => header.style.direction = 'ltr');
            langToggleBtn.textContent = 'ENG';
            header.classList.remove('arabic'); // إزالة Class اللغة العربية
        } else {
            englishContent.forEach(content => content.style.display = 'none');
            arabicContent.forEach(content => content.style.display = 'block');
            arabicContent.forEach(content => header.style.direction= 'rtl');
            langToggleBtn.textContent = 'AR';
            header.classList.add('arabic'); // إضافة Class اللغة العربية
        }

        document.querySelectorAll('.link').forEach(link => {
            const currentLanguage = langToggleBtn.textContent.trim();
            link.textContent = currentLanguage === 'AR' ? link.getAttribute('data-ar') : link.getAttribute('data-en');
        });
    });

const contents = document.querySelectorAll('.content');
let hasScrolled = false; 

window.addEventListener('scroll', () => {
    if (hasScrolled) return;

    contents.forEach(content => {
        const contentPosition = content.getBoundingClientRect().top; 
        const screenPosition = window.innerHeight;
        if (contentPosition < screenPosition) {
            content.classList.add('animate'); 
        }
    });

});

const links = document.querySelectorAll('.header-links a');
links.forEach(link => {
    link.addEventListener('click', function() {
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});


    var eventDate = new Date("Feb 15, 2025 10:00:00").getTime();
var countdown = setInterval(function() {
  var now = new Date().getTime();
  var distance = eventDate - now;
  
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // إذا كان أكثر من 72 ساعة
  if (distance > (72 * 60 * 60 * 1000)) {
    document.getElementById("countdown").innerHTML = "باقي : " + days + " يوم و " + hours + " ساعة";
  }
  // إذا كانت أقل من 72 ساعة
  else if (distance > 0) {
    document.getElementById("countdown").innerHTML = "باقي " + hours + " ساعة و " + minutes + " دقيقة";
  }

  // عند انتهاء العد التنازلي
  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "الحدث بدأ!";
  }
}, 1000);

                    const images = [
                        'images/landing_photo2.jpg',
                        'images/landing_photo3.jpg'
                    ];
            
                    let currentIndex = 0;
                    const imageElement = document.getElementById('carousel-image');
            
                    function showImage(index) {
                        imageElement.classList.remove('show'); 
                        setTimeout(() => {
                            imageElement.src = images[index];
                            imageElement.classList.add('show'); 
                        }, 200);
                    }
            
                    function nextImage() {
                        currentIndex = (currentIndex + 1) % images.length;
                        showImage(currentIndex);
                    }
            
                    function prevImage() {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        showImage(currentIndex);
                    }
            
                    setInterval(nextImage, 7000);
            
                    const cards = document.querySelectorAll('.card, .card1');
            
                    cards.forEach(card => {
                        card.addEventListener('mouseenter', function() {
                            const details = this.querySelector('.more-details');
                            if (details) {
                                details.classList.add('active');
                            }
                        });
            
                        card.addEventListener('mouseleave', function() {
                            const details = this.querySelector('.more-details');
                            if (details) {
                                details.classList.remove('active');
                            }
                        });
                    });
                });

                

                const scriptURL2 = 'https://script.google.com/macros/s/AKfycbzuQOWcYNvfbqeGgBeeHio9u3_Q0aI5nidxipFug3bVkxK0Wmn5wPL-m66HdkYlNsPB/exec'

const form2 = document.forms['registerform']


form2.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL2, { method: 'POST', body: new FormData(form2)})
  .then(response => alert("Thank You! Your Form Is Submitted Successfully And We Will Contact You Soon." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
                const scriptURL = 'https://script.google.com/macros/s/AKfycby38gcV1O0cE2aSWwCrAtKcCsRAsVp9KZLqM9FTEx1U_L50GwZUUh6bQvvGP0qWTr6S/exec'


const form = document.forms['contactform']


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

    document.getElementById('payment-method').addEventListener('change', function() {
        var paymentMethod = this.value;
        var screenshotField = document.getElementById('payment-screenshot');
        var screenshotRow = document.getElementById('payment-screenshot-row');

        if (paymentMethod === 'promocode') {
            screenshotField.required = false;
        } else {
            screenshotField.required = true;
        }
    });

        const validPromoCodes = ["AhmedTEDxPromo100", "50%PromoPPM", "10%VPromo"];

    const promoInput = document.getElementById('Promocode');
    const promoError = document.getElementById('promo-error');
    promoInput.addEventListener('input', function() {
        if (!validPromoCodes.includes(promoInput.value)) {
            promoError.style.display = 'inline'; 
        } else {
            promoError.style.display = 'none';
        }
    });




