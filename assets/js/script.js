// Index 
// check whether html file is called 'index.html', if so, set index to its initial state
if (window.location.pathname == '/index.html' || window.location.pathname == '/about_us.html') {
    document.addEventListener('DOMContentLoaded', (event) => {
        // Get the button
        let button = document.getElementById('scrollToTopButton');
    
        if(button) {
            // When the user scrolls down a third of the page, show the button
            window.onscroll = function() {
                if (document.body.scrollTop > window.innerHeight / 3 || document.documentElement.scrollTop > window.innerHeight / 3) {
                    button.style.display = "block";
                } else {
                    button.style.display = "none";
                }
            };
    
            // When the user clicks on the button, scroll to the top of the document smoothly
            button.onclick = function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    });
}

// Gallery
// check whether html file is called 'gallery.html', if so, set gallery to its initial state
if (window.location.pathname == '/gallery.html') {
    window.addEventListener('load', () => {
        let cards = document.querySelectorAll('.card');
        let card_images = document.querySelectorAll('.card-img-top');
    
        // When picture is clicked, show card body wrapped in a modal; when modal is closed, hide card body
        card_images.forEach((image, index) => {
            image.addEventListener('click', () => {
                // Clone the card body before it's shown in the modal
                let card_body = cards[index].querySelector('.card-body.card-hide').cloneNode(true);
    
                // Remove the .card-hide class from the cloned card body
                card_body.classList.remove('card-hide');
    
                // Show the corresponding card in a modal
                let modal = new bootstrap.Modal(document.getElementById('imageModal'));
                let modalBody = document.querySelector('#imageModal .modal-body');
                
                // Create an img element and set its src to the clicked image's src
                let img = document.createElement('img');
                img.src = image.src;
                img.classList.add('img-fluid'); // Add Bootstrap class for responsive images
    
                // Clear the modal content and append the image and card body
                modalBody.innerHTML = '';
                modalBody.appendChild(img);
                modalBody.appendChild(card_body);
    
                modal.show();
    
                // When the modal is hidden, add the .card-hide class back to the cloned card body
                modal._element.addEventListener('hidden.bs.modal', function () {
                    card_body.classList.add('card-hide');
                });
            });
        });
    });
}

// Sign up form
// check whether html file is called 'sign_up.html', if so, set form validation
if (window.location.pathname == '/sign_up.html') {
    window.addEventListener('load', () => {
        (function () {
            'use strict'
            
            // Fetch all the forms to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')
            
            // Loop over them and prevent submission
            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    } else {
                        alert('Thank you for signing up!');
                    }
            
                    form.classList.add('was-validated')
                }, false)
                })
            })
        ()

        // Canvas modal
        // Define an array of yoga positions
        let yogaPositions = ['Mountain', 'Downward Dog', 'Warrior', 'Triangle', 'Tree', 'Bridge', 'Crow', 'Pigeon', 'Child', 'Sphinx'];

        // Function to get a random yoga position
        function getRandomYogaPosition() {
            let randomIndex = Math.floor(Math.random() * yogaPositions.length);
            return yogaPositions[randomIndex];
        }

        // Add an event listener to the modal
        document.getElementById('exampleModal').addEventListener('show.bs.modal', function () {
            // Set the text content of the #random-position element to a random yoga position
            document.getElementById('random-position').textContent = getRandomYogaPosition();
        });
    });
}


// Canvas element
// check whether html file is called 'canvas.html', if so, set canvas
if (window.location.pathname == '/canvas.html') {
    window.addEventListener('load', () => {
        const canvas = document.getElementById('canvas');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        // Canvas context
        const ctx = canvas.getContext('2d');

        // Previous mouse positions
        let prevX = null;
        let prevY = null;

        // Line configuration for default stroke line
        ctx.lineWidth = 5;

        let draw = false;

        // Select color
        let clrs = document.querySelectorAll('.clr');
        
        clrs.forEach((clr) => {
            clr.addEventListener('click', () => {
                ctx.strokeStyle = clr.dataset.clr;
            });
        });

        // Clear canvas
        let clearBtn = document.querySelector('.clear');
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        // Save canvas
        let saveBtn = document.querySelector('.save');
        saveBtn.addEventListener('click', () => {
            let data = canvas.toDataURL('image/png');
            let a = document.createElement('a');
            a.href = data;
            a.download = 'canvas.png';
            a.click();
        });

        // Start drawing
        window.addEventListener('mousedown', (e) => {
            draw = true;
        });

        // Stop drawing
        window.addEventListener('mouseup', (e) => {
            draw = false;
        });

        // Track mouse position
        window.addEventListener('mousemove', (e) => {
            
            if(prevX == null || prevY == null || !draw) {
                prevX = e.clientX;
                prevY = e.clientY;
                return
            }

            // Current mouse position
            let currentX = e.clientX;
            let currentY = e.clientY;

            // Draw line
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();

            // Update previous mouse position
            prevX = currentX;
            prevY = currentY;
        });
    });
}
