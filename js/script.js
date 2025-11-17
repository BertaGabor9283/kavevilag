// 1. Mobil menü kezelése
const menuButton = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuButton) {
    menuButton.addEventListener('click', function() {
        navMenu.classList.toggle('open');
    });
}

// 2. Barista Kalkulátor (Interaktív program - 8 pont)
const calculateButton = document.getElementById('calculate');
if (calculateButton) {
    calculateButton.addEventListener('click', calculateCoffee);
}

function calculateCoffee() {
    // HTML elemek lekérése
    const cups = parseInt(document.getElementById('cups').value);
    const strength = parseInt(document.getElementById('strength').value);
    const method = document.getElementById('brewing-method').value;
    const resultDiv = document.getElementById('result');

    // Biztonsági ellenőrzés
    if (isNaN(cups) || cups < 1) {
        alert('Kérjük, adj meg legalább 1 csészét!');
        return;
    }

    // Logika: Switch elágazás a vízigényhez
    let waterPerCup;
    let methodText;

    switch (method) {
        case 'espresso':
            waterPerCup = 30;
            methodText = "Espresso (Rövid)";
            break;
        case 'filter':
            waterPerCup = 150;
            methodText = "Filter kávé";
            break;
        case 'french':
            waterPerCup = 200;
            methodText = "French Press";
            break;
        case 'aeropress':
            waterPerCup = 220;
            methodText = "Aeropress";
            break;
        default:
            waterPerCup = 150;
            methodText = "Általános";
    }

    // Számítás
    const totalCoffee = cups * strength;
    const totalWater = cups * waterPerCup;
    const estimatedCaffeine = totalCoffee * 11; // kb. 11mg/g

    // Eredmény kiírása
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="background:#FFF8F0; padding:15px; border-left:4px solid #D4AF37; margin-top:15px;">
            <h3>☕ Recept: ${methodText}</h3>
            <p><strong>${cups}</strong> csésze elkészítéséhez:</p>
            <ul>
                <li>Kávé: <strong>${totalCoffee}g</strong></li>
                <li>Víz: <strong>${totalWater}ml</strong></li>
            </ul>
            <p style="font-size:0.9em; color:#666; margin-top:10px;">
                <em>Becsült koffein: ~${estimatedCaffeine} mg</em>
            </p>
        </div>
    `;
}

// 3. Űrlap Validáció (5 mezőre - 10 pont)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Range slider érték kijelzése
    const rangeInput = document.getElementById('strength-range');
    const rangeValue = document.getElementById('range-value');
    if(rangeInput) {
        rangeInput.addEventListener('input', function() {
            rangeValue.textContent = this.value;
        });
    }

    // Validációs logika
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Megállítjuk a beküldést
        
        let errors = [];

        // 1. Név validáció
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) errors.push("A név túl rövid!");

        // 2. Email validáció
        const email = document.getElementById('email').value.trim();
        if (!email.includes('@') || !email.includes('.')) errors.push("Érvénytelen email cím!");

        // 3. Select validáció (Kávétípus)
        const type = document.getElementById('coffee-type').value;
        if (type === "") errors.push("Válassz kávétípust!");

        // 4. Checkbox validáció (Ízvilág)
        const tastes = document.querySelectorAll('input[name="taste"]:checked');
        if (tastes.length === 0) errors.push("Jelölj be legalább egy ízvilágot!");

        // 5. Üzenet validáció
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) errors.push("Az üzenet minimum 10 karakter legyen!");

        // Kiértékelés
        if (errors.length > 0) {
            alert("Hiba:\n- " + errors.join("\n- "));
        } else {
            alert("Sikeres küldés! Köszönjük.");
            contactForm.reset();
            if(rangeValue) rangeValue.textContent = '5';
        }
    });
}