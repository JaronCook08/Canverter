const button = document.querySelector("#calculate");
const priceInput = document.querySelector("#price");
const currency = document.querySelector("#currency");
const chatbox = document.querySelector("#chatbox");
const verdictCheckbox = document.querySelector("#include-verdict");
const body = document.body;

const monsterPrice = 2.79;
const redbullPrice = 3.29;
const hotdogPrice = 1.5;

const monsterFlavors = [
    "Ultra White",
    "Pipeline Punch",
    "Mango Loco",
    "Ultra Peachy Keen",
    "Pacific Punch",
    "Ultra Paradise"
];

const redbullFlavors = [
    "Original",
    "Blue Edition",
    "Peach Edition",
    "Watermelon Edition",
    "Coconut Berry Edition"
];

const toppings = [
    "mustard and onions",
    "ketchup and relish",
    "sauerkraut and mustard",
    "jalapeños and onions",
    "extra relish",
    "mustard, relish, and a suspicious amount of onions"
];

const monsterIntros = [
    "After extensive caffeine economics research...",
    "The Monster Energy financial department has reviewed your purchase...",
    "According to the highly scientific Monster calculator...",
    "My caffeine analysts have finished their calculations...",
    "After consulting the Canverter 9000..."
];

const redbullIntros = [
    "After calculating the wings required for this purchase...",
    "The Red Bull accounting department has completed the analysis...",
    "According to premium energy economics...",
    "My team of extremely awake accountants has done the math...",
    "After reviewing the situation with a concerning amount of caffeine..."
];

const hotdogIntros = [
    "After consulting the world's most reliable currency...",
    "The Costco food court has approved this calculation...",
    "According to the hot dog financial index...",
    "My team of warehouse economists has finished counting...",
    "After serious research involving mustard and questionable decisions..."
];

const generalVerdicts = [
    "Financially questionable, but emotionally understandable.",
    "Your bank account has requested a moment of silence.",
    "The numbers say no. Your heart will probably ignore them.",
    "This is less of a purchase and more of a character-development event.",
    "Proceed carefully. Your wallet has already started sweating.",
    "An economist would say no, which honestly makes it more tempting.",
    "You can technically afford anything if you stop checking your balance.",
    "This purchase has been classified as a premium bad decision.",
    "Responsible? Debatable. Memorable? Almost certainly.",
    "Your financial future has left the group chat."
];

const monsterVerdicts = [
    "That is enough caffeine to make sleep feel like an optional subscription.",
    "You could power a concerning number of all-night gaming sessions instead.",
    "At one can per day, this could support a very long caffeine dependency.",
    "That much Monster could make your heartbeat eligible for track and field.",
    "The purchase is temporary. The caffeine economics are forever."
];

const redbullVerdicts = [
    "That is enough Red Bull to provide wings to a small metropolitan area.",
    "You could remain unnecessarily alert for an irresponsible amount of time.",
    "The wing-based economy strongly recommends reconsidering.",
    "That amount of Red Bull could sponsor several questionable life choices.",
    "Your purchase may be expensive, but apparently wings are not cheap either."
];

const hotdogVerdicts = [
    "That is enough hot dogs to make your Costco membership a public-health concern.",
    "You could feed an alarming number of people near the food court.",
    "At one hot dog per day, lunch would be handled for a deeply unreasonable time.",
    "Your financial plan now smells faintly of mustard and warehouse lighting.",
    "The Costco food court considers this generational wealth."
];

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function addTextMessage(text, type) {
    const message = document.createElement("div");

    message.className = `message ${type}`;
    message.textContent = text;

    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function addBotMessage(html) {
    const message = document.createElement("div");

    message.className = "message bot";
    message.innerHTML = html;

    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getVerdict(type) {
    const useSpecialVerdict = Math.random() < 0.65;

    if (!useSpecialVerdict) {
        return randomItem(generalVerdicts);
    }

    if (type === "monster") {
        return randomItem(monsterVerdicts);
    }

    if (type === "redbull") {
        return randomItem(redbullVerdicts);
    }

    return randomItem(hotdogVerdicts);
}

function updateTheme() {
    body.classList.remove(
        "monster-theme",
        "redbull-theme",
        "hotdog-theme"
    );

    if (currency.value === "monster") {
        body.classList.add("monster-theme");

        priceInput.placeholder =
            "Should I buy a $3,000 gaming PC?";
    }

    if (currency.value === "redbull") {
        body.classList.add("redbull-theme");

        priceInput.placeholder =
            "Is a $7,000 motorcycle worth it?";
    }

    if (currency.value === "hotdog") {
        body.classList.add("hotdog-theme");

        priceInput.placeholder =
            "How many hot dogs is $25,000 tuition?";
    }
}

function showResult(intro, resultText, verdict) {
    let response = `
        ${intro}<br><br>

        That's about
        <strong class="result-number">
            ${resultText}
        </strong>.
    `;

    if (verdictCheckbox.checked) {
        response += `
            <div class="verdict">
                <strong>Official verdict:</strong>
                ${verdict}
            </div>
        `;
    }

    addBotMessage(response);
}

function calculateConversion() {
    const text = priceInput.value.trim();

    if (!text) {
        addBotMessage(
            "You have to give me something to calculate first 😭"
        );

        priceInput.focus();
        return;
    }

    addTextMessage(text, "user");

    const match = text.match(/\$?[\d,]+(?:\.\d{1,2})?/);

    if (!match) {
        addBotMessage(
            "I need a price somewhere in there to perform my highly scientific calculations."
        );

        priceInput.value = "";
        priceInput.focus();
        return;
    }

    const price = Number(
        match[0].replace(/[$,]/g, "")
    );

    if (!Number.isFinite(price) || price < 0) {
        addBotMessage(
            "That price appears to have violated several laws of mathematics."
        );

        priceInput.value = "";
        priceInput.focus();
        return;
    }

    const selectedCurrency = currency.value;
    const verdict = getVerdict(selectedCurrency);

    if (selectedCurrency === "monster") {
        const amount = Math.round(price / monsterPrice);
        const flavor = randomItem(monsterFlavors);
        const intro = randomItem(monsterIntros);

        const resultText =
            `${amount.toLocaleString()} ${flavor} Monsters`;

        showResult(intro, resultText, verdict);
    }

    if (selectedCurrency === "redbull") {
        const amount = Math.round(price / redbullPrice);
        const flavor = randomItem(redbullFlavors);
        const intro = randomItem(redbullIntros);

        const resultText =
            `${amount.toLocaleString()} ${flavor} Red Bulls`;

        showResult(intro, resultText, verdict);
    }

    if (selectedCurrency === "hotdog") {
        const amount = Math.round(price / hotdogPrice);
        const topping = randomItem(toppings);
        const intro = randomItem(hotdogIntros);

        const resultText =
            `${amount.toLocaleString()} Costco hot dogs with ${topping}`;

        showResult(intro, resultText, verdict);
    }

    priceInput.value = "";
    priceInput.focus();
}

currency.addEventListener("change", updateTheme);

button.addEventListener("click", calculateConversion);

priceInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        calculateConversion();
    }
});

updateTheme();