// const btnAsk = document.getElementById('btn-ask');
// const queryInput = document.getElementById('user-query');
// const responseArea = document.getElementById('response-area');
// const statusBadge = document.getElementById('status-badge');

// // Check Connection Status
// window.addEventListener('online', () => updateStatus(true));
// window.addEventListener('offline', () => updateStatus(false));

// function updateStatus(isOnline) {
//     statusBadge.innerText = isOnline ? "Online" : "Offline Mode";
//     statusBadge.className = isOnline ? "badge bg-success" : "badge bg-danger";
// }

// // Initial check
// updateStatus(navigator.onLine);

// btnAsk.addEventListener('click', async () => {
//     const query = queryInput.value.trim();
//     if (!query) return;

//     document.getElementById('welcome-msg').style.display = 'none';
    
//     // 1. Try Local Search first (Simulated or via Service Worker Cache)
//     // 2. Fallback to API
//     try {
//         const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//         const data = await response.json();

// // Convert API response → card format
// const formattedResult = [{
//     title: "Answer",
//     content: data.reply,
//     category: data.mode
// }];

// renderResults(formattedResult);
//     } catch (err) {
//         renderResults([{ 
//             title: "Offline Search", 
//             content: "You are offline. I'm searching my local memory...",
//             category: "System" 
//         }]);
//     }
// });

// function renderResults(results) {
//     if (results.length === 0) {
//         responseArea.innerHTML = `<div class="alert alert-info">No info found. Try keywords like 'Kisan', 'Health', or 'Soil'.</div>`;
//         return;
//     }

//     let html = '';
//     results.forEach(item => {
//         html += `
//             <div class="card mb-3 border-start border-success border-4">
//                 <div class="card-body">
//                     <h6 class="text-uppercase text-success small fw-bold">${item.category}</h6>
//                     <h4 class="card-title">${item.title}</h4>
//                     <p class="card-text" style="white-space: pre-line;">${item.content}</p>
//                 </div>
//             </div>
//         `;
//     });
//     responseArea.innerHTML = html;
// }



























// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    const btnAsk = document.getElementById('btn-ask');
    const queryInput = document.getElementById('user-query');
    const responseArea = document.getElementById('response-area');
    const statusBadge = document.getElementById('status-badge');
    const welcomeMsg = document.getElementById('welcome-msg');

    // Check Connection Status
    window.addEventListener('online', () => updateStatus(true));
    window.addEventListener('offline', () => updateStatus(false));

    function updateStatus(isOnline) {
        if (statusBadge) {
            statusBadge.innerHTML = isOnline ? '<i class="bi bi-wifi"></i> Online' : '<i class="bi bi-wifi-off"></i> Offline Mode';
            statusBadge.className = isOnline ? "badge bg-success" : "badge bg-danger";
        }
    }

    // Initial status check
    updateStatus(navigator.onLine);

    // Local knowledge base for offline/quick responses
    const localKnowledge = {
        'pm kisan': {
            title: 'PM Kisan Samman Nidhi',
            content: 'PM Kisan is a Central Sector scheme with 100% funding from Government of India. It provides income support of ₹6000 per year to farmer families, payable in three equal installments of ₹2000 each every four months.',
            category: 'Government Scheme'
        },
        'kisan': {
            title: 'Kisan Credit Card (KCC)',
            content: 'Kisan Credit Card scheme provides farmers with timely access to credit for agricultural needs. Farmers can get loans up to ₹3 lakh at subsidized interest rates. Contact your nearest bank or CSC center for application.',
            category: 'Agricultural Scheme'
        },
        'fever': {
            title: 'Fever - Home Remedies',
            content: '1. Rest and stay hydrated\n2. Use cold compress\n3. Take paracetamol if temperature > 101°F\n4. Consult a doctor if fever persists beyond 3 days\n5. Monitor temperature regularly',
            category: 'Health Advisory'
        },
        'cough': {
            title: 'Cough Relief Tips',
            content: '1. Warm water with honey and ginger\n2. Steam inhalation with mint leaves\n3. Avoid cold drinks\n4. Gargle with warm salt water\n5. Use turmeric milk at bedtime',
            category: 'Health Advisory'
        },
        'soil': {
            title: 'Soil Health Card Scheme',
            content: 'Soil Health Card scheme aims to issue soil cards to farmers which carry crop-wise recommendations of nutrients and fertilizers. Get your soil tested at nearest agriculture center for just ₹50-100.',
            category: 'Agricultural Scheme'
        },
        'crop': {
            title: 'Crop Insurance - PMFBY',
            content: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) provides affordable crop insurance. Farmers pay just 2% for Kharif, 1.5% for Rabi crops. The scheme covers all natural risks from sowing to harvest.',
            category: 'Government Scheme'
        }
    };

    // Main ask button click handler
    if (btnAsk) {
        btnAsk.addEventListener('click', handleAsk);
    }

    // Handle Enter key in input
    if (queryInput) {
        queryInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleAsk();
            }
        });
    }

    async function handleAsk() {
        if (!queryInput || !responseArea) return;
        
        const query = queryInput.value.trim().toLowerCase();
        if (!query) {
            alert('Please type your question');
            return;
        }

        // Hide welcome message
        if (welcomeMsg) {
            welcomeMsg.style.display = 'none';
        }

        // Show loading state
        responseArea.innerHTML = `
            <div class="text-center my-5">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Searching for answer...</p>
            </div>
        `;

        // First try local knowledge base (instant response)
        let result = null;
        for (let key in localKnowledge) {
            if (query.includes(key)) {
                result = localKnowledge[key];
                break;
            }
        }

        if (result) {
            // Local result found - show immediately
            setTimeout(() => {
                renderResults([result]);
            }, 500); // Small delay for better UX
        } else {
            // Try API call
            try {
                const apiUrl = `/api/search?q=${encodeURIComponent(query)}`;
                const response = await fetch(apiUrl);
                
                if (response.ok) {
                    const data = await response.json();
                    // Convert API response to our format
                    const apiResult = [{
                        title: data.title || "Search Result",
                        content: data.reply || data.message || "No specific information found.",
                        category: data.mode || "Information"
                    }];
                    renderResults(apiResult);
                } else {
                    // Fallback to offline mode
                    renderResults([{ 
                        title: "Offline Search Result", 
                        content: `I couldn't find specific information about "${query}" in my local database. Try these keywords: PM Kisan, fever, cough, soil, crop, kisan.`,
                        category: "System Message" 
                    }]);
                }
            } catch (err) {
                console.log('API error:', err);
                // Network error - show offline message
                renderResults([{ 
                    title: "Offline Mode", 
                    content: `You are currently offline. I searched my local memory but couldn't find information about "${query}".\n\nTry asking about: PM Kisan, fever, cough, soil, crop`,
                    category: "System Message" 
                }]);
            }
        }

        // Clear input after search (optional)
        // queryInput.value = '';
    }

    function renderResults(results) {
        if (!responseArea) return;

        if (!results || results.length === 0) {
            responseArea.innerHTML = `<div class="alert alert-info">No information found. Try different keywords.</div>`;
            return;
        }

        let html = '';
        results.forEach(item => {
            html += `
                <div class="card mb-3 border-start border-success border-4 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                                <i class="bi bi-tag"></i> ${item.category || 'General'}
                            </span>
                            <small class="text-muted">
                                <i class="bi bi-clock"></i> ${new Date().toLocaleTimeString()}
                            </small>
                        </div>
                        <h4 class="card-title fw-bold mb-3">${item.title}</h4>
                        <p class="card-text" style="white-space: pre-line; font-size: 1.1rem; line-height: 1.6;">${item.content}</p>
                    </div>
                </div>
            `;
        });
        
        // Add animation class
        responseArea.innerHTML = html;
        
        // Scroll to response
        responseArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Export for debugging (optional)
    window.debug = {
        search: (term) => {
            queryInput.value = term;
            handleAsk();
        }
    };
});