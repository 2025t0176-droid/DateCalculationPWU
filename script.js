// --- RAINBOW ENGINE ---
function getRandomHSL() {
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}, 75%, 60%)`;
}

function randomizeBlobs() {
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach(blob => {
        blob.style.background = getRandomHSL();
        // Randomize movement slightly
        const moveX = (Math.random() - 0.5) * 400;
        const moveY = (Math.random() - 0.5) * 400;
        blob.style.transform = `translate(${moveX}px, ${moveY}px) scale(${0.8 + Math.random()})`;
    });
}

// Update colors every 4 seconds
setInterval(randomizeBlobs, 4000);
randomizeBlobs();

// --- DATE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const fromInput = document.getElementById('fromDate');
    const toInput = document.getElementById('toDate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    // Default to Today
    const today = new Date().toISOString().split('T')[0];
    fromInput.value = today;
    toInput.value = today;

    calculateBtn.addEventListener('click', () => {
        const d1 = new Date(fromInput.value);
        const d2 = new Date(toInput.value);

        if (isNaN(d1) || isNaN(d2)) {
            resultDiv.innerHTML = "Select valid dates";
            return;
        }

        const diffTime = Math.abs(d2 - d1);
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (totalDays === 0) {
            resultDiv.innerHTML = `<span class="res-val">Today</span><span class="res-sub">No difference between dates</span>`;
            return;
        }

        // Calculation breakdown
        const start = d1 < d2 ? d1 : d2;
        const end = d1 < d2 ? d2 : d1;
        
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const weeks = Math.floor(totalDays / 7);
        const remDays = totalDays % 7;

        resultDiv.innerHTML = `
            <span class="res-val">${totalDays.toLocaleString()} Days</span>
            <span class="res-sub">
                ${years > 0 ? years + 'y ' : ''}${months > 0 ? months + 'm ' : ''}${days > 0 ? days + 'd' : ''} 
                • ${weeks}w ${remDays}d
            </span>
        `;
    });
});