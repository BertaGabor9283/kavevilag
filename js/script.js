
const menuButton = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuButton) {
    menuButton.addEventListener('click', function () {
        navMenu.classList.toggle('open');
    });
}

const calculateButton = document.getElementById('calculate');
if (calculateButton) {
    calculateButton.addEventListener('click', calculateCoffee);
}

function calculateCoffee() {
    const cups = parseInt(document.getElementById('cups').value);
    const strength = parseInt(document.getElementById('strength').value);
    const method = document.getElementById('brewing-method').value;
    const resultDiv = document.getElementById('result');
    if (isNaN(cups) || cups < 1) {
        alert('Kérjük, adj meg legalább 1 csészét!');
        return;
    }

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

    const totalCoffee = cups * strength;
    const totalWater = cups * waterPerCup;
    const estimatedCaffeine = totalCoffee * 11; // kb. 11mg/g
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

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const rangeInput = document.getElementById('strength-range');
    const rangeValue = document.getElementById('range-value');
    if (rangeInput) {
        rangeInput.addEventListener('input', function () {
            rangeValue.textContent = this.value;
        });
    }

    contactForm.addEventListener('submit', function (event) {
        let isValid = true;

        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(el => el.textContent = '');

        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(el => el.classList.remove('input-error'));

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const coffeeTypeInput = document.getElementById('coffee-type');
        const messageInput = document.getElementById('message');
        const errorName = document.getElementById('error-name');
        const errorEmail = document.getElementById('error-email');
        const errorCoffeeType = document.getElementById('error-coffee-type');
        const errorTaste = document.getElementById('error-taste');
        const errorMessage = document.getElementById('error-message');

        if (nameInput.value.trim().length < 2) {
            errorName.textContent = "A név túl rövid!";
            nameInput.classList.add('input-error');
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (!emailValue.includes('@') || !emailValue.includes('.')) {
            errorEmail.textContent = "Érvénytelen email cím!";
            emailInput.classList.add('input-error');
            isValid = false;
        }

        if (coffeeTypeInput.value === "") {
            errorCoffeeType.textContent = "Válassz kávétípust!";
            coffeeTypeInput.classList.add('input-error');
            isValid = false;
        }

        const tastes = document.querySelectorAll('input[name="taste"]:checked');
        if (tastes.length === 0) {
            errorTaste.textContent = "Jelölj be legalább egy ízvilágot!";
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            errorMessage.textContent = "Az üzenet minimum 10 karakter legyen!";
            messageInput.classList.add('input-error');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            console.log("Hiba az űrlapon!");
        } else {
            console.log("Minden adat rendben, küldés...");
            console.log("Minden adat rendben, küldés...");
        }
    });
}