const canvas = document.getElementById('frostCanvas');
const ctx = canvas.getContext('2d');
const greetingEl = document.getElementById('greeting');
const subGreetingEl = document.getElementById('sub-greeting');
const audio = document.getElementById('bgm');
const musicBtn = document.getElementById('musicBtn');
const handGuide = document.getElementById('hand-guide');

// --- 1. ROBUST CANVAS SIZING ---
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fillFrost();
}

// --- 2. DRAW THE FOG (With Safety Check) ---
function fillFrost() {
    // Safety: If canvas size is wrong (default 300x150), force resize
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    ctx.globalCompositeOperation = 'source-over'; 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.93)'; // High opacity for visibility
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Noise Texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)'; 
    for(let i=0; i<800; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- 3. WIPING LOGIC ---
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
    ctx.arc(x, y, 50, 0, Math.PI * 2); 
    
    // Soft Edge Effect
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'black';
    
    ctx.fill();
    ctx.shadowBlur = 0; 
    
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.lineWidth = 100;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

// --- EVENTS ---
// Mouse
canvas.addEventListener('mousedown', (e) => { isDrawing = true; removeGuide(); lastX = e.clientX; lastY = e.clientY; wipe(e.clientX, e.clientY); });
canvas.addEventListener('mousemove', (e) => { if (isDrawing) wipe(e.clientX, e.clientY); });
canvas.addEventListener('mouseup', () => isDrawing = false);

// Touch
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; removeGuide(); lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; wipe(lastX, lastY); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isDrawing) wipe(e.touches[0].clientX, e.touches[0].clientY); });
canvas.addEventListener('touchend', () => isDrawing = false);

// Resize Event
window.addEventListener('resize', resizeCanvas);

// --- 4. EXTRAS (Sound, Share, Load) ---
function toggleSound() {
    if (audio.paused) {
        audio.play().then(() => { musicBtn.textContent = "🔊 Music On"; }).catch(e => alert("Interact first!"));
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
        }
        const shareBtn = document.querySelector('button[onclick="shareWish()"]');
        if(shareBtn) shareBtn.textContent = "✍️ Write Your Own";
    }
}

function shareWish() {
    const userMsg = prompt("Enter your holiday wish:");
    if (userMsg) {
        const userName = prompt("What is your name? (Optional)");
        let newUrl = `${window.location.origin}${window.location.pathname}?msg=${btoa(userMsg)}`;
        if (userName) newUrl += `&from=${btoa(userName)}`;
        navigator.clipboard.writeText(newUrl).then(() => alert("Link copied!"));
    }
}

// --- 5. INITIALIZATION (Critical Fix) ---
// Using window.onload ensures screen size is calculated correctly before drawing
window.onload = function() {
    resizeCanvas();
    loadMessage();
}
