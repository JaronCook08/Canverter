"use strict";

// ========================================
// 1. DOM ELEMENTS
// It's alive
// ========================================

const elements = {
    calculateButton: document.querySelector("#calculate"),
    priceInput: document.querySelector("#price"),
    currencySelect: document.querySelector("#currency"),
    chatbox: document.querySelector("#chatbox"),
    verdictCheckbox: document.querySelector("#include-verdict"),
    body: document.body
};

const requiredElements = [
    elements.calculateButton,
    elements.priceInput,
    elements.currencySelect,
    elements.chatbox,
    elements.verdictCheckbox
];

if (requiredElements.some(element => element === null)) {
    throw new Error(
        "Canverter could not start because one or more required HTML elements are missing."
    );
}
// ========================================
// 2. CONSTANTS & PRICES
// Makes the math mathable
// ========================================

const PRICES = {
    monster: 2.79,
    redbull: 3.29,
    hotdog: 1.50
};

const THEMES = {
    monster: "monster-theme",
    redbull: "redbull-theme",
    hotdog: "hotdog-theme"
};

const PLACEHOLDERS = {
    monster: "Should I buy a $3,000 gaming PC?",
    redbull: "Is a $7,000 motorcycle worth it?",
    hotdog: "How many hot dogs is $25,000 tuition?"
};

// ========================================
// 3. BOT PERSONALITY
//    If the bot speaks, this section is to blame.
// ========================================

const PERSONALITY = {
    welcome: [
    `Welcome to <strong>Canverter</strong>.<br><br>
    Tell me what you're thinking about buying and I'll convert it into something far more financially responsible.`,

    `Welcome to <strong>Canverter</strong>.<br><br>
    Where financial decisions go to be measured in Monster Energy drinks.`,

    `Welcome!<br><br>
    I specialize in converting questionable purchases into even more questionable units.`,

    `Need financial advice?<br><br>
    Good news: I don't provide any. I do provide incredibly useful conversions.`,

    `Every purchase tells a story.<br><br>
    Mine usually ends with caffeine.`,

    `Welcome to the most useful financial calculator on the internet.<br><br>
    Let's do some tasty math.`,

    `Give me a price.<br><br>
    I'll tell you how many Monsters, Red Bulls, or Costco hot dogs your money could've bought instead.`,

    `My accountants are standing by...<br><br>
    They're deeply concerned about your upcoming purchase.`
],
    monster: {
        flavors: [
            "Ultra White",
            "Pipeline Punch",
            "Mango Loco",
            "Ultra Peachy Keen",
            "Pacific Punch",
            "Ultra Paradise"
        ],

        intros: [
            "After extensive caffeine economics research...",
            "The Monster Energy financial department has reviewed your purchase...",
            "According to the highly scientific Monster calculator...",
            "My caffeine analysts have finished their calculations...",
            "After consulting the Canverter 9000..."
        ],

        verdicts: [
            "That is enough caffeine to make sleep feel like an optional subscription.",
            "You could power a concerning number of all-night gaming sessions instead.",
            "At one can per day, this could support a very long caffeine dependency.",
            "That much Monster could make your heartbeat eligible for track and field.",
            "The purchase is temporary. The caffeine economics are forever.",
            "Your bloodstream has formally requested that you reconsider.",
            "That is less of a drink supply and more of an energy reserve."
        ]
    },

    redbull: {
        flavors: [
            "Original",
            "Blue Edition",
            "Peach Edition",
            "Watermelon Edition",
            "Coconut Berry Edition"
        ],

        intros: [
            "After calculating the wings required for this purchase...",
            "The Red Bull accounting department has completed the analysis...",
            "According to premium energy economics...",
            "My team of extremely awake accountants has done the math...",
            "After reviewing the situation with a concerning amount of caffeine..."
        ],

        verdicts: [
            "That is enough Red Bull to provide wings to a small metropolitan area.",
            "You could remain unnecessarily alert for an irresponsible amount of time.",
            "The wing-based economy strongly recommends reconsidering.",
            "That amount of Red Bull could sponsor several questionable life choices.",
            "Your purchase may be expensive, but apparently wings are not cheap either.",
            "This would keep a college library awake through several finals weeks.",
            "The Red Bull reserves are concerned about your spending habits."
        ]
    },

    hotdog: {
        toppings: [
            "mustard and onions",
            "ketchup and relish",
            "sauerkraut and mustard",
            "jalapeños and onions",
            "extra relish",
            "mustard, relish, and a suspicious amount of onions"
        ],

        intros: [
            "After consulting the world's most reliable currency...",
            "The Costco food court has approved this calculation...",
            "According to the hot dog financial index...",
            "My team of warehouse economists has finished counting...",
            "After serious research involving mustard and questionable decisions..."
        ],

        verdicts: [
            "That is enough hot dogs to make your Costco membership a public-health concern.",
            "You could feed an alarming number of people near the food court.",
            "At one hot dog per day, lunch would be handled for a deeply unreasonable time.",
            "Your financial plan now smells faintly of mustard and warehouse lighting.",
            "The Costco food court considers this generational wealth.",
            "That is enough hot dogs to become a minor regional distributor.",
            "Your purchase has officially been outperformed by the food court."
        ]
    },

    general: {
        verdicts: [
            "Financially questionable, but emotionally understandable.",
            "Your bank account has requested a moment of silence.",
            "The numbers say no. Your heart will probably ignore them.",
            "This is less of a purchase and more of a character-development event.",
            "Proceed carefully. Your wallet has already started sweating.",
            "An economist would say no, which honestly makes it more tempting.",
            "You can technically afford anything if you stop checking your balance.",
            "This purchase has been classified as a premium bad decision.",
            "Responsible? Debatable. Memorable? Almost certainly.",
            "Your financial future has left the group chat.",
            "This has been officially classified as financially bold.",
            "Your wallet just sighed.",
            "I support your terrible financial decisions.",
            "I've seen worse. Somehow."
        ]
    },

    errors: {
        emptyInput: [
            "You have to give me something to calculate first. 😭",
            "I'm good, but I'm not a mind reader.",
            "Type literally anything and we'll start there.",
            "My calculator is currently staring into the void.",
            "I'm ready whenever you are."
        ],

        noPrice: [
            `I couldn't find a price in that message.<br><br>
            Try something like <strong>"$3,000 gaming PC"</strong>.`,

            "I'm gonna need a price somewhere in there before I can perform my highly scientific calculations.",

            "That sounded important, but I couldn't find a dollar amount.",

            "Financial analysis requires one tiny thing: the price. 😭",

            "Tell me what it costs and I'll tell you whether your wallet should be concerned."
        ],

        quantity: [
            `I think you accidentally gave me a quantity instead of a price.<br><br>
            Tell me how much it costs.`,

            `You told me <strong>how many</strong>, not <strong>how much</strong>.`,

            `I already know what <strong>23 AirPods</strong> means.<br><br>
            I need the price.`,

            `That's definitely a quantity.<br><br>
            Give me the total cost instead.`,

            "Unfortunately, my finance degree only works with prices.",

            `I can count things.<br>
            I just can't convert them until I know the price.`,

            `That appears to be a number of objects, not a dollar amount.<br><br>
            My accountants need a price before they can panic.`
        ],

        invalidMath: [
            "That price appears to have violated several laws of mathematics.",
            "Even my calculator refused to process that.",
            "I'm gonna pretend I didn't see that number.",
            "That doesn't look like a price from this universe.",
            "Congratulations. You confused the Canverter."
        ],

        followUp: [
            "I'm still learning conversational finance. 😭",
            "I don't think I understood that follow-up.",
            "Try asking me to change the flavor or give me another price.",
            "I understood approximately 37% of that.",
            "We're close, but I need a little more information.",
            "My financial intuition failed me on that one.",
            "I lost the plot somewhere in that sentence."
        ]
    }
};

// ========================================
// 4. MEMORY
// I'll thank myself later
// ========================================

const memory = {
   
    // Which converter is currently selected.
    currentConverter: "monster",

    // The user's most recent successful conversion.
    lastCalculation: null,

    // Prevents immediate repetition.
    lastIntro: null,
    lastVerdict: null,
    lastVariant: null, 
    
    //Welcome message roullete
    welcomeIsSpinning: false,

    // Reserved for future conversational features.
    // Stores previous messages for future AI and follow-up features.
conversationHistory: []
};

// ========================================
// 5. GENERAL UTILITIES
// You can tell they're important by the way that they are
// ========================================

function randomItem(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    return items[Math.floor(Math.random() * items.length)];
}

function randomItemExcept(items, excludedItem) {
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    if (items.length === 1) {
        return items[0];
    }

    const availableItems = items.filter(item => item !== excludedItem);

    return randomItem(availableItems);
}

function formatNumber(number) {
    return number.toLocaleString("en-US", {
        maximumFractionDigits: 2
    });
}

function clearInput() {
    elements.priceInput.value = "";
}

function focusInput() {
    elements.priceInput.focus();
}

function scrollChatToBottom() {
    elements.chatbox.scrollTop = elements.chatbox.scrollHeight;
}

function normalizeText(text) {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

// ========================================
// 6. CHAT DISPLAY FUNCTIONS
// Sentence factory for canverter
// ========================================

function createMessageElement(sender, message) {
    const messageElement = document.createElement("div");

    messageElement.classList.add("message", `${sender}-message`);

    if (sender === "user") {
        messageElement.textContent = message;
    } else {
        messageElement.innerHTML = message;
    }

    return messageElement;
}

function addUserMessage(message) {
    const messageElement = createMessageElement("user", message);

    elements.chatbox.appendChild(messageElement);
    scrollChatToBottom();
}

function addBotMessage(message) {
    const messageElement = createMessageElement("bot", message);

    elements.chatbox.appendChild(messageElement);
    scrollChatToBottom();
}

function clearChat() {
    elements.chatbox.innerHTML = "";
}

function getDifferentWelcome(currentWelcome) {
    return randomItemExcept(
        PERSONALITY.welcome,
        currentWelcome
    );
}

function spinWelcomeMessage(messageElement) {
    if (memory.welcomeIsSpinning) {
        return;
    }

    memory.welcomeIsSpinning = true;
    messageElement.classList.add("welcome-spinning");
    messageElement.classList.remove("welcome-landed");

    let currentWelcome = messageElement.innerHTML;

    const spinDelays = [
        40,
        45,
        50,
        60,
        75,
        95,
        120,
        155,
        200
    ];

    function runSpin(spinIndex) {
        if (spinIndex >= spinDelays.length) {
            const finalWelcome =
                getDifferentWelcome(currentWelcome);

            messageElement.innerHTML = finalWelcome;
            messageElement.classList.remove("welcome-spinning");
            messageElement.classList.add("welcome-landed");

            memory.welcomeIsSpinning = false;
            return;
        }

        const nextWelcome =
            getDifferentWelcome(currentWelcome);

        messageElement.innerHTML = nextWelcome;
        currentWelcome = nextWelcome;

        window.setTimeout(
            () => runSpin(spinIndex + 1),
            spinDelays[spinIndex]
        );
    }

    runSpin(0);
}

function displayWelcomeMessage() {
    clearChat();

    const messageElement = createMessageElement(
        "bot",
        randomItem(PERSONALITY.welcome)
    );

    messageElement.classList.add("welcome-message");

    messageElement.addEventListener("mouseenter", () => {
        spinWelcomeMessage(messageElement);
    });

    elements.chatbox.appendChild(messageElement);
    scrollChatToBottom();

    spinWelcomeMessage(messageElement);
}

// ========================================
// 7. THEME FUNCTIONS
// It's a switch basically
// ========================================

function getSelectedConverter() {
    return elements.currencySelect.value;
}

function updateTheme(converter) {
    elements.body.classList.remove(
        THEMES.monster,
        THEMES.redbull,
        THEMES.hotdog
    );

    const selectedTheme = THEMES[converter];

    if (selectedTheme) {
        elements.body.classList.add(selectedTheme);
    }
}

function updatePlaceholder(converter) {
    const selectedPlaceholder = PLACEHOLDERS[converter];

    if (selectedPlaceholder) {
        elements.priceInput.placeholder = selectedPlaceholder;
    }
}

function updateConverterDisplay() {
    const selectedConverter = getSelectedConverter();

    memory.currentConverter = selectedConverter;

    updateTheme(selectedConverter);
    updatePlaceholder(selectedConverter);
}

// ========================================
// 8. INPUT PARSING
// The customer is always right
// ========================================

function containsMoneyIndicator(text) {
    const moneyPattern =
        /(?:\$|\b(?:dollar|dollars|buck|bucks|usd|cost|costs|priced|price|worth)\b)/i;

    return moneyPattern.test(text);
}

function extractNumber(text) {
    const numberMatch = text.match(/-?\d[\d,]*(?:\.\d+)?/);

    if (!numberMatch) {
        return null;
    }

    const cleanedNumber = numberMatch[0].replace(/,/g, "");
    const parsedNumber = Number(cleanedNumber);

    return Number.isFinite(parsedNumber) ? parsedNumber : null;
}

function isQuantityInsteadOfPrice(text) {
    const normalizedInput = normalizeText(text);

    if (containsMoneyIndicator(normalizedInput)) {
        return false;
    }

    /*
     * Matches a number followed by an object:
     * "23 AirPods"
     * "50 cars"
     * "6 Lamborghinis"
     *
     * A number by itself, such as "3000", is still accepted as a price.
     */
    const quantityPattern =
        /^\s*\d[\d,]*(?:\.\d+)?\s+[a-z][a-z0-9'-]*(?:\s+[a-z][a-z0-9'-]*)*\s*$/i;

    return quantityPattern.test(normalizedInput);
}

function parseUserInput(input) {
    const normalizedInput = normalizeText(input);

    if (!normalizedInput) {
        return {
            type: "empty",
            originalInput: input,
            normalizedInput,
            price: null
        };
    }

    if (isQuantityInsteadOfPrice(normalizedInput)) {
        return {
            type: "quantity",
            originalInput: input,
            normalizedInput,
            price: null
        };
    }

    const extractedPrice = extractNumber(normalizedInput);

    if (extractedPrice === null) {
        return {
            type: "no-price",
            originalInput: input,
            normalizedInput,
            price: null
        };
    }

    if (extractedPrice <= 0) {
        return {
            type: "invalid-price",
            originalInput: input,
            normalizedInput,
            price: extractedPrice
        };
    }

    return {
        type: "valid-price",
        originalInput: input,
        normalizedInput,
        price: extractedPrice
    };
}

// ========================================
// 9. CONVERSATION AND FOLLOW-UPS
// The customer is always right the sequel
// ========================================

function hasPreviousCalculation() {
    return memory.lastCalculation !== null;
}

function isFollowUpRequest(text) {
    const normalizedInput = normalizeText(text);

    const followUpPatterns = [
        /\banother\b/,
        /\bdifferent\b/,
        /\bchange\b/,
        /\bswap\b/,
        /\breroll\b/,
        /\btry again\b/,
        /\bnew flavor\b/,
        /\bnew topping\b/,
        /\bdon't like\b/,
        /\bdo not like\b/,
        /\bno like\b/,
        /\bnot that\b/
    ];

    return followUpPatterns.some(pattern => pattern.test(normalizedInput));
}

function getVariantList(converter) {
    if (converter === "monster") {
        return PERSONALITY.monster.flavors;
    }

    if (converter === "redbull") {
        return PERSONALITY.redbull.flavors;
    }

    if (converter === "hotdog") {
        return PERSONALITY.hotdog.toppings;
    }

    return [];
}

function getVariantLabel(converter) {
    return converter === "hotdog" ? "topping" : "flavor";
}

function chooseNewVariant(converter) {
    const variants = getVariantList(converter);

    const newVariant = randomItemExcept(
        variants,
        memory.lastVariant
    );

    memory.lastVariant = newVariant;

    return newVariant;
}

function buildFollowUpResponse(calculation, newVariant) {
    const variantLabel = getVariantLabel(calculation.converter);

    return `
        Fine, we'll switch the ${variantLabel}.<br><br>
        <strong>${formatNumber(calculation.amount)}</strong>
        ${calculation.displayName}
        with <strong>${newVariant}</strong>.
    `;
}

function handleFollowUp(input) {
    if (!isFollowUpRequest(input)) {
        return false;
    }

    if (!hasPreviousCalculation()) {
        addBotMessage(
            randomItem(PERSONALITY.errors.followUp)
        );

        return true;
    }

    const calculation = memory.lastCalculation;
    const newVariant = chooseNewVariant(calculation.converter);

    calculation.variant = newVariant;

    addBotMessage(
        buildFollowUpResponse(calculation, newVariant)
    );

    return true;
}

// ========================================
// 10. CONVERSION FUNCTIONS
// The actual calculator for the calculator website
// ========================================

function getConverterConfig(converter) {
    const configs = {
        monster: {
            price: PRICES.monster,
            displayName: "Monster Energy drinks",
            singularName: "Monster Energy drink",
            content: PERSONALITY.monster
        },

        redbull: {
            price: PRICES.redbull,
            displayName: "Red Bulls",
            singularName: "Red Bull",
            content: PERSONALITY.redbull
        },

        hotdog: {
            price: PRICES.hotdog,
            displayName: "Costco hot dogs",
            singularName: "Costco hot dog",
            content: PERSONALITY.hotdog
        }
    };

    return configs[converter] || null;
}

function calculateConversion(price, unitPrice) {
    if (
        !Number.isFinite(price) ||
        !Number.isFinite(unitPrice) ||
        price <= 0 ||
        unitPrice <= 0
    ) {
        return null;
    }

    return Math.ceil(price / unitPrice);
}

function getDisplayName(config, amount) {
    return amount === 1
        ? config.singularName
        : config.displayName;
}

function chooseIntro(config) {
    const intro = randomItemExcept(
        config.content.intros,
        memory.lastIntro
    );

    memory.lastIntro = intro;

    return intro;
}

function chooseVerdict(config) {
    const availableVerdicts = [
        ...config.content.verdicts,
        ...PERSONALITY.general.verdicts
    ];

    const verdict = randomItemExcept(
        availableVerdicts,
        memory.lastVerdict
    );

    memory.lastVerdict = verdict;

    return verdict;
}

function buildConversionResponse(calculation) {

    let conversionText = "";

    switch (calculation.converter) {

        case "monster":
            conversionText = `
                <strong>${formatNumber(calculation.amount)}</strong>
                <strong>${calculation.variant}</strong> Monster Energy drinks
            `;
            break;

        case "redbull":
            conversionText = `
                <strong>${formatNumber(calculation.amount)}</strong>
                <strong>${calculation.variant}</strong> Red Bulls
            `;
            break;

        case "hotdog":
            conversionText = `
                <strong>${formatNumber(calculation.amount)}</strong>
                Costco hot dogs with
                <strong>${calculation.variant}</strong>
            `;
            break;

        default:
            conversionText = `
                <strong>${formatNumber(calculation.amount)}</strong>
                ${calculation.displayName}
            `;
    }

    let response = `
        ${calculation.intro}<br><br>

        <strong>$${formatNumber(calculation.price)}</strong>
        is equal to approximately<br><br>

        ${conversionText}
    `;

    if (
        elements.verdictCheckbox.checked &&
        calculation.verdict
    ) {
        response += `
            <br><br>
            <em>${calculation.verdict}</em>
        `;
    }

    return response;
}

function performConversion(price, converter) {
    const config = getConverterConfig(converter);

    if (!config) {
        return null;
    }

    const amount = calculateConversion(
        price,
        config.price
    );

    if (amount === null) {
        return null;
    }

    const variant = chooseNewVariant(converter);
    const intro = chooseIntro(config);
    const verdict = chooseVerdict(config);
    const displayName = getDisplayName(config, amount);

    const calculation = {
        price,
        converter,
        unitPrice: config.price,
        amount,
        displayName,
        variant,
        intro,
        verdict
    };

    memory.lastCalculation = calculation;

    return calculation;
}

// ========================================
// 11. MAIN SUBMISSION FUNCTION
// Traffic cop under your skin
// ========================================

function handleSubmission() {
    const userInput = elements.priceInput.value;
    const parsedInput = parseUserInput(userInput);

    if (parsedInput.type === "empty") {
        addBotMessage(
            randomItem(PERSONALITY.errors.emptyInput)
        );

        focusInput();
        return;
    }

    addUserMessage(userInput);
    clearInput();

    if (handleFollowUp(userInput)) {
        focusInput();
        return;
    }

    if (parsedInput.type === "quantity") {
        addBotMessage(
            randomItem(PERSONALITY.errors.quantity)
        );

        focusInput();
        return;
    }

    if (parsedInput.type === "no-price") {
        addBotMessage(
            randomItem(PERSONALITY.errors.noPrice)
        );

        focusInput();
        return;
    }

    if (parsedInput.type === "invalid-price") {
        addBotMessage(
            randomItem(PERSONALITY.errors.invalidMath)
        );

        focusInput();
        return;
    }

    const calculation = performConversion(
        parsedInput.price,
        memory.currentConverter
    );

    if (!calculation) {
        addBotMessage(
            randomItem(PERSONALITY.errors.invalidMath)
        );

        focusInput();
        return;
    }

    const response = buildConversionResponse(calculation);

    addBotMessage(response);
    focusInput();
}

// ========================================
// 12. EVENT LISTENERS
// Ants directing traffic
// ========================================

elements.calculateButton.addEventListener(
    "click",
    handleSubmission
);

elements.priceInput.addEventListener(
    "keydown",
    event => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmission();
        }
    }
);

elements.currencySelect.addEventListener(
    "change",
    updateConverterDisplay
);

// ========================================
// 13. INITIALIZATION
// Reverse lobotomy complete
// ========================================

function initializeCanverter() {
    updateConverterDisplay();
    displayWelcomeMessage();
    focusInput();
}

initializeCanverter();