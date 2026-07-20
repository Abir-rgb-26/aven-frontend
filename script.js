let currentEngine = 'gemini';
let isSubscribed = false; // Tracks if the user has unlocked High Performance mode

function setEngine(engine) {
    if (currentEngine === engine) return;
    
    // If they try to switch to High Performance but aren't subscribed, block it and show the paywall
    if (engine === 'gpt' && !isSubscribed) {
        showSubscriptionModal();
        return;
    }
    
    currentEngine = engine;
    
    // Clear out the chat screen immediately so old messages disappear
    const chatBox = document.getElementById('chatBox');
    if (chatBox) chatBox.innerHTML = '';
    
    document.getElementById('btn-gemini').classList.toggle('active', engine === 'gemini');
    document.getElementById('btn-gpt').classList.toggle('active', engine === 'gpt');
    
    if (engine === 'gpt') {
        document.body.classList.add('gpt-mode');
    } else {
        document.body.classList.remove('gpt-mode');
    }
}

// Function to dynamically build and display your subscription tier layout
function showSubscriptionModal() {
    // Check if modal already exists to prevent duplicates
    if (document.getElementById('paywallModal')) return;

    const modal = document.createElement('div');
    modal.id = 'paywallModal';
    modal.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(5, 12, 22, 0.85); backdrop-filter: blur(8px);
        display: flex; justify-content: center; align-items: center; z-index: 9999;
    `;

    modal.innerHTML = `
        <div style="background: #0d1b2a; border: 2px solid #ff4757; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 0 20px rgba(255, 71, 87, 0.3); color: #ffffff; font-family: sans-serif;">
            <h2 style="color: #ff4757; margin-top: 0; font-size: 24px;">🚀 Unlock High Performance Core</h2>
            <p style="color: #8da2bb; font-size: 14px; line-height: 1.5;">Access ultra-smart gaming diagnostics, deeper tactical matrix scaling, and premium hardware response times.</p>
            
            <div style="margin: 20px 0; text-align: left; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                <div style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
                    <span>📅 4-Day Trial</span><strong>FREE</strong>
                </div>
                <div style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
                    <span>⚡ Weekly Pass</span><strong>₹10 / week</strong>
                </div>
                <div style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
                    <span>🔥 Monthly Pass</span><strong>₹55 / month</strong>
                </div>
                <div style="padding: 8px 0; display: flex; justify-content: space-between; color: #00ecff;">
                    <span>👑 Annual Elite</span><strong>₹660 / year</strong>
                </div>
            </div>

            <button id="activateTrialBtn" style="background: #ff4757; color: white; border: none; padding: 12px 24px; font-weight: bold; border-radius: 6px; cursor: pointer; width: 100%; font-size: 16px; margin-bottom: 10px; transition: 0.2s;">
                Start 4-Day Free Trial
            </button>
            <button id="closeModalBtn" style="background: transparent; color: #8da2bb; border: 1px solid #3a4b5c; padding: 8px 24px; border-radius: 6px; cursor: pointer; width: 100%; font-size: 14px;">
                Keep Using Balanced (Free)
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Wire up events inside the modal view interface
    document.getElementById('activateTrialBtn').addEventListener('click', () => {
        isSubscribed = true; // Simulates an active tier purchase
        document.body.removeChild(modal);
        setEngine('gpt'); // Auto-switch engine to High Performance mode now that it is unlocked
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}
