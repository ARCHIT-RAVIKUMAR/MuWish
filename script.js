const canvas = document.getElementById('frostCanvas');
const ctx = canvas.getContext('2d');
const greetingEl = document.getElementById('greeting');
const subGreetingEl = document.getElementById('sub-greeting');
const audio = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');

// 1. Setup Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fillFrost();
}

// 2. Initial Frost Fill
function fillFrost() {
    ctx.globalCompositeOperation = 'source-over'; 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'; 
    for(let i=0; i<600; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 3. Wiping Logic
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function wipe(x, y) {
    ctx.globalCompositeOperation = 'destination-out'; 
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();
    
    // Smooth line drawing
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.lineWidth = 80;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

// Event Listeners
canvas.addEventListener('mousedown', (e) => { isDrawing = true; lastX = e.clientX; lastY = e.clientY; wipe(e.clientX, e.clientY); });
canvas.addEventListener('mousemove', (e) => { if (isDrawing) wipe(e.clientX, e.clientY); });
canvas.addEventListener('mouseup', () => isDrawing = false);

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    wipe(lastX, lastY);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawing) wipe(e.touches[0].clientX, e.touches[0].clientY);
});
canvas.addEventListener('touchend', () => isDrawing = false);

// 4. Re-freezing Effect
function startRefreezing() {
    setInterval(() => {
        if (!isDrawing) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'; // Slow refreeze speed
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, 100);
}

// 5. Sound Toggle
function toggleSound() {
    if (audio.paused) {
        audio.play().then(() => {
            musicBtn.textContent = "🔊 Music On";
        }).catch(e => alert("Please interact with the page first!"));
    } else {
        audio.pause();
        musicBtn.textContent = "🔇 Music Off";
    }
}

// 6. Share Logic
function loadMessage() {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get('msg');
    if (msg) {
        try {
            greetingEl.textContent = atob(msg);
            subGreetingEl.textContent = "A special wish for you.";
        } catch(e) { greetingEl.textContent = msg; }
    }
}

function shareWish() {
    const userMsg = prompt("Enter your holiday wish:");
    if (userMsg) {
        const encodedMsg = btoa(userMsg);
        const newUrl = `${window.location.origin}${window.location.pathname}?msg=${encodedMsg}`;
        navigator.clipboard.writeText(newUrl).then(() => alert("Link copied! Send it to a friend."));
    }
}

// Init
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
loadMessage();
startRefreezing();
