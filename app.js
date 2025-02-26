// Emoji category data
const emojiCategories = {
    "faces": {
        icon: "😊",
        name: "Faces",
        color: "#FF9500",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
                "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚"]
    },
    "animals": {
        icon: "🐶",
        name: "Animals",
        color: "#FF2D55",
        emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
                "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣"]
    },
    "food": {
        icon: "🍎",
        name: "Food",
        color: "#5AC8FA",
        emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍒", "🍍",
                "🥭", "🍑", "🍈", "🍌", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌"]
    },
    "activities": {
        icon: "⚽️",
        name: "Activities",
        color: "#4CD964",
        emojis: ["⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱",
                "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🥅", "⛳️", "🪁"]
    },
    "travel": {
        icon: "🚗",
        name: "Travel",
        color: "#007AFF",
        emojis: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐",
                "🚚", "🚛", "🚜", "🦯", "🦽", "🦼", "🛴", "🚲", "🛵", "🏍"]
    },
    "objects": {
        icon: "🎮",
        name: "Objects",
        color: "#5856D6",
        emojis: ["📱", "💻", "⌚️", "📷", "🎥", "🎮", "🕹", "🔋", "🔌", "💡",
                "🔦", "🕯", "🪔", "🧯", "🛢", "💸", "💵", "💴", "💶", "💷"]
    }
};

// Message history
let messageHistory = [
    {
        id: 1,
        emojis: ["😀", "👋", "🌈"],
        createdAt: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
        id: 2,
        emojis: ["🐶", "🦮", "🦴"],
        createdAt: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
        id: 3,
        emojis: ["🚗", "🚦", "🏠"],
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
    }
];

// Current message
let currentMessage = [];

// Current category
let currentCategory = "faces";

// DOM Elements
const emojiGrid = document.getElementById("emoji-grid");
const currentMessageEl = document.getElementById("current-message");
const deleteBtn = document.getElementById("delete-btn");
const newBtn = document.getElementById("new-btn");
const historyBtn = document.getElementById("history-btn");
const saveBtn = document.getElementById("save-btn");
const categoryTabs = document.querySelectorAll(".tab");
const historyModal = document.getElementById("history-modal");
const closeModal = document.querySelector(".close-modal");
const historyList = document.getElementById("history-list");

// Initialize the app
function initApp() {
    // Load initial emoji grid
    loadEmojiGrid(currentCategory);
    
    // Initialize event listeners
    initEventListeners();
    
    // Update message display
    updateMessageDisplay();

    // Add vibration feedback
    addVibrationFeedback();
}

// Load emojis into the grid for a given category
function loadEmojiGrid(category) {
    // Clear existing grid
    emojiGrid.innerHTML = "";
    
    // Get emojis for the category
    const emojis = emojiCategories[category].emojis;
    
    // Create emoji buttons
    emojis.forEach(emoji => {
        const emojiBtn = document.createElement("div");
        emojiBtn.className = "emoji-btn";
        emojiBtn.textContent = emoji;
        emojiBtn.dataset.emoji = emoji;
        emojiBtn.addEventListener("click", () => {
            addEmojiToMessage(emoji);
            playHapticFeedback();
        });
        emojiGrid.appendChild(emojiBtn);
    });
}

// Update the message display
function updateMessageDisplay() {
    if (currentMessage.length === 0) {
        currentMessageEl.innerHTML = "<span style='color: #999; font-size: 18px;'>👆</span>";
    } else {
        currentMessageEl.innerHTML = "";
        currentMessage.forEach(emoji => {
            const emojiSpan = document.createElement("span");
            emojiSpan.textContent = emoji;
            emojiSpan.className = "message-emoji";
            currentMessageEl.appendChild(emojiSpan);
        });
    }
}

// Add emoji to current message
function addEmojiToMessage(emoji) {
    currentMessage.push(emoji);
    updateMessageDisplay();
    
    // Scroll to bottom of message container to show the latest emoji
    setTimeout(() => {
        const messageContainer = document.getElementById("current-message");
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 100);
}

// Delete last emoji from message
function deleteLastEmoji() {
    if (currentMessage.length > 0) {
        currentMessage.pop();
        updateMessageDisplay();
        playHapticFeedback();
    }
}

// Clear current message
function newMessage() {
    currentMessage = [];
    updateMessageDisplay();
    playHapticFeedback();
}

// Save current message to history
function saveMessage() {
    if (currentMessage.length === 0) {
        showToast("Cannot save an empty message");
        return;
    }
    
    const newMessage = {
        id: Date.now(),
        emojis: [...currentMessage],
        createdAt: new Date()
    };
    
    messageHistory.unshift(newMessage);
    showToast("Message saved!");
    playHapticFeedback();
}

// Switch category
function switchCategory(category) {
    currentCategory = category;
    
    // Update active tab
    categoryTabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
    
    // Load emojis for the new category
    loadEmojiGrid(category);
    playHapticFeedback();
}

// Show history modal
function showHistoryModal() {
    historyList.innerHTML = "";
    
    if (messageHistory.length === 0) {
        historyList.innerHTML = "<div class='no-history'>No saved messages yet</div>";
    } else {
        messageHistory.forEach(message => {
            const historyItem = document.createElement("div");
            historyItem.className = "history-item";
            
            const emojis = document.createElement("div");
            emojis.className = "history-emojis";
            emojis.textContent = message.emojis.join("");
            
            const date = document.createElement("div");
            date.className = "history-date";
            date.textContent = formatDate(message.createdAt);
            
            historyItem.appendChild(emojis);
            historyItem.appendChild(date);
            
            historyItem.addEventListener("click", () => {
                loadMessageFromHistory(message);
            });
            
            historyList.appendChild(historyItem);
        });
    }
    
    historyModal.style.display = "block";
    playHapticFeedback();
}

// Load message from history
function loadMessageFromHistory(message) {
    currentMessage = [...message.emojis];
    updateMessageDisplay();
    closeHistoryModal();
    showToast("Message loaded!");
    playHapticFeedback();
}

// Close history modal
function closeHistoryModal() {
    historyModal.style.display = "none";
}

// Format date for display
function formatDate(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return "Just now";
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Show toast message
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector(".toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
        
        // Add toast styles
        const style = document.createElement("style");
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 16px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            }
            .toast.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    toast.textContent = message;
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// Add haptic feedback using Vibration API if available
function addVibrationFeedback() {
    if ('vibrate' in navigator) {
        document.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.vibrate(20); // Short vibration
            });
        });
        
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.vibrate(30); // Medium vibration
            });
        });
    }
}

// Play haptic feedback
function playHapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(20);
    }
}

// Initialize event listeners
function initEventListeners() {
    // Control buttons
    deleteBtn.addEventListener("click", deleteLastEmoji);
    newBtn.addEventListener("click", newMessage);
    historyBtn.addEventListener("click", showHistoryModal);
    saveBtn.addEventListener("click", saveMessage);
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            switchCategory(tab.dataset.category);
        });
    });
    
    // Close modal
    closeModal.addEventListener("click", closeHistoryModal);
    
    // Modal backdrop
    historyModal.addEventListener("click", (e) => {
        if (e.target === historyModal) {
            closeHistoryModal();
        }
    });
    
    // Home button - simulate going back to home screen
    document.querySelector(".home-button").addEventListener("click", () => {
        showToast("Exiting app...");
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
}

// PWA functionality
let deferredPrompt;

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Handle 'beforeinstallprompt' event - occurs when the app can be installed
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser install prompt
    e.preventDefault();
    // Save the event for later
    deferredPrompt = e;
    
    // Show the install button
    const installContainer = document.getElementById('install-container');
    if (installContainer) {
        installContainer.style.display = 'block';
    }
    
    // After 3 seconds, show a toast suggesting installation
    setTimeout(() => {
        showToast("Add this app to your Home Screen! 📱✨");
    }, 3000);
    
    // Add click handler for install button
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            // Hide the install container
            installContainer.style.display = 'none';
            
            // Show the default browser installation prompt
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const choiceResult = await deferredPrompt.userChoice;
            
            // Reset the deferred prompt variable
            deferredPrompt = null;
            
            // Show feedback based on user's choice
            if (choiceResult.outcome === 'accepted') {
                showToast("Thanks for installing! 🎉");
                playHapticFeedback();
            } else {
                // If user declines, show the button again after 1 minute
                setTimeout(() => {
                    if (installContainer) installContainer.style.display = 'block';
                }, 60000);
            }
        });
    }
});

// When app is successfully installed
window.addEventListener('appinstalled', () => {
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Show success message
    showToast("Thanks for installing Happy Faces! 🎉");
});

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);