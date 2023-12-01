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
