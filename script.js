const canvas = document.getElementById('frostCanvas');
const ctx = canvas.getContext('2d');
const greetingEl = document.getElementById('greeting');
const subGreetingEl = document.getElementById('sub-greeting');
const audio = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
const handGuide = document.getElementById('hand-guide');

// 1. Setup Canvas
let lastWidth = window.innerWidth;
function resizeCanvas() {
    // Only reset if width changes significantly (mobile rotate)
    if (Math.abs(window.innerWidth - lastWidth) > 50) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fillFrost();
        lastWidth = window.innerWidth;
    }
}

// 2. Initial Frost Fill
function fillFrost() {
    ctx.globalCompositeOperation = 'source-over'; 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.90)'; 
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

// 3. Wiping Logic (with Soft Edge & Hand Removal)
let isDrawing = false;
let lastX = 0; 
let lastY = 0;

function removeGuide() {
    if (handGuide) {
        handGuide.style.transition = "opacity 0.5s";
        handGuide.style.opacity = "0";
        setTimeout(() => { if(handGuide.parentNode) handGuide.remove(); }, 500);
    }
}

function wipe(x, y) {
    ctx.globalCompositeOperation = 'destination-out'; 
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    
    // Soft Ice Edge
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'black';
    
    ctx.fill();
    ctx.shadowBlur = 0; // Reset
    
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.lineWidth = 80;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

// Events
canvas.addEventListener('mousedown', (e) => { isDrawing = true; removeGuide(); lastX = e.clientX; lastY = e.clientY; wipe(e.clientX, e.clientY); });
canvas.addEventListener('mousemove', (e) => { if (isDrawing) wipe(e.clientX, e.clientY); });
canvas.addEventListener('mouseup', () => isDrawing = false);

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; removeGuide(); lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; wipe(lastX, lastY); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isDrawing) wipe(e.touches[0].clientX, e.touches[0].clientY); });
canvas.addEventListener('touchend', () => isDrawing = false);

// 4. Sound & Share
function toggleSound() {
    if (audio.paused) {
        audio.play().then(() => { musicBtn.textContent = "🔊 Music On"; }).catch(e => alert("Please interact with the page first!"));
    } else {
        audio.pause(); musicBtn.textContent = "🔇 Music Off";
    }
}

function loadMessage() {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get('msg');
    const from = params.get('from');
    if (msg) {
        try { greetingEl.textContent = atob(msg); } catch(e) { greetingEl.textContent = msg; }
        greetingEl.classList.add('special-wish');
        if (from) {
            const decodedFrom = atob(from);
            const badge = document.getElementById('from-badge');
            badge.textContent = `FROM: ${decodedFrom.toUpperCase()}`;
            badge.style.display = 'inline-block';
            subGreetingEl.textContent = `${decodedFrom} sent you a warm wish!`;
            document.title = `🎁 New Wish from ${decodedFrom}!`;
        } else {
            subGreetingEl.textContent = "Someone sent you a special wish!";
        }
        const shareBtn = document.querySelector('button[onclick="shareWish()"]');
        if(shareBtn) shareBtn.textContent = "✍️ Write Your Own";
    }
}

function shareWish() {
    const userMsg = prompt("Enter your holiday wish:");
    if (userMsg) {
        const userName = prompt("What is your name? (Optional)");
        const encodedMsg = btoa(userMsg);
        let newUrl = `${window.location.origin}${window.location.pathname}?msg=${encodedMsg}`;
        if (userName) newUrl += `&from=${btoa(userName)}`;
        navigator.clipboard.writeText(newUrl).then(() => alert("Link copied! Send it to a friend."));
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Init
loadMessage(); // Check URL
