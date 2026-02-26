// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    const btnAsk = document.getElementById('btn-ask');
    const queryInput = document.getElementById('user-query');
    const responseArea = document.getElementById('response-area');
    const statusBadge = document.getElementById('status-badge');
    const refreshBtn = document.getElementById('refresh-status');
    const welcomeMsg = document.getElementById('welcome-msg');

    console.log('🚀 Desi Helper started');

    // Initial status check
    setTimeout(() => {
        checkNetworkStatus();
    }, 500);

    // Check Connection Status
    window.addEventListener('online', function() {
        console.log('🌐 Network: Online event triggered');
        checkNetworkStatus();
    });
    
    window.addEventListener('offline', function() {
        console.log('📴 Network: Offline event triggered');
        checkNetworkStatus();
    });

    // Refresh button click handler
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.add('spin');
            checkNetworkStatus();
            setTimeout(() => {
                icon.classList.remove('spin');
            }, 1000);
        });
    }

    // Main network check function
    function checkNetworkStatus() {
        const isOnline = navigator.onLine;
        console.log('🔍 Checking network... Online?', isOnline);
        
        if (!isOnline) {
            updateStatus(false);
            return;
        }

        fetch('https://www.google.com/favicon.ico', { 
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store'
        })
        .then(() => {
            console.log('✅ Really Online');
            updateStatus(true);
        })
        .catch((error) => {
            console.log('❌ Actually Offline', error);
            updateStatus(false);
        });
    }

    function updateStatus(isOnline) {
        if (!statusBadge) return;

        if (isOnline) {
            statusBadge.innerHTML = '<i class="bi bi-wifi"></i> Online';
            statusBadge.className = 'navbar-status online';
            if (statusBadge.getAttribute('data-status') !== 'online') {
                showStatusNotification(true);
                statusBadge.setAttribute('data-status', 'online');
            }
        } else {
            statusBadge.innerHTML = '<i class="bi bi-wifi-off"></i> Offline';
            statusBadge.className = 'navbar-status offline';
            if (statusBadge.getAttribute('data-status') !== 'offline') {
                showStatusNotification(false);
                statusBadge.setAttribute('data-status', 'offline');
            }
        }
    }

    function showStatusNotification(isOnline) {
        const existingToast = document.querySelector('.status-toast');
        if (existingToast) existingToast.remove();

        const notification = document.createElement('div');
        notification.className = `status-toast ${isOnline ? 'online-toast' : 'offline-toast'}`;
        notification.innerHTML = `
            <i class="bi ${isOnline ? 'bi-wifi' : 'bi-wifi-off'}"></i>
            <span>You are now ${isOnline ? 'Online' : 'Offline'}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    setInterval(checkNetworkStatus, 10000);

    // ==================== COMPLETE KNOWLEDGE DATABASE ====================
    const localKnowledge = {
        'pm kisan': {
            title: 'PM Kisan Samman Nidhi Yojana',
            content: `**Pradhan Mantri Kisan Samman Nidhi Yojana**

📌 **Description:** Central sector scheme with 100% funding from Government of India

💰 **Benefits:** ₹6000 per year in 3 installments of ₹2000 each
• Installment 1: April-July
• Installment 2: August-November
• Installment 3: December-March

👨‍🌾 **Eligibility:** All small and marginal farmers with land up to 2 hectares

📋 **Documents Required:**
• Aadhaar card
• Land documents
• Bank account details
• Mobile number

📝 **Application Process:** Apply online at pmkisan.gov.in or through CSC center

📞 **Helpline:** 1800-180-1551

✅ **Status Check:** Check beneficiary status on pmkisan.gov.in with Aadhaar number

❌ **Excluded:** Income tax payers, government employees, pensioners not eligible

✏️ **Correction:** Name or bank details correction available online`,
            category: 'Government Scheme'
        },
        
        'ayushman bharat': {
            title: 'Ayushman Bharat - PM Jan Arogya Yojana',
            content: `**Pradhan Mantri Jan Arogya Yojana (PMJAY) - World's largest health insurance scheme**

🏥 **Coverage:** ₹5 lakh per family per year on floater basis

👥 **Beneficiaries:** Over 10 crore poor and vulnerable families (approx 50 crore individuals)

📋 **Eligible Families:** Socio-Economic Caste Census (SECC) 2011 database based families

🩺 **Covered Treatments:** 1394 medical packages including 167 surgeries and 622 procedures

🏨 **Hospitals:** Over 27,000 empaneled hospitals (public and private)

⏱️ **Pre-existing:** Coverage from day one, no waiting period

🔄 **Portability:** Cashless treatment anywhere in India

💳 **Card Use:** Use PMJAY card for paperless admission

📞 **Helpline:** 14555 or 1800-180-1111

🌐 **Application:** Check eligibility at pmjay.gov.in

📄 **Documents Required:** PMJAY card, Aadhaar card, SECC ration card

❌ **Not Covered:** OPD, outpatient drugs, dental treatments (except accidental)`,
            category: 'Health Scheme'
        },
        
        'ration card': {
            title: 'Ration Card - Food Security',
            content: `**Official document for subsidized food grains under National Food Security Act**

📇 **Types of Ration Cards:**
• Priority Household (PHH)
• Antyodaya Anna Yojana (AAY)
• BPL card
• APL card

🍚 **Benefits:**
• Wheat @ ₹2/kg
• Rice @ ₹3/kg
• Coarse grains @ ₹1/kg

📦 **Quantity:**
• PHH: 5 kg per person per month
• AAY: 35 kg per family

✅ **Other Benefits:**
• Used as identity proof
• Address proof
• Linked to other schemes

📝 **Apply Online:** Through state food and civil supplies department website

📋 **Documents Required:**
• Aadhaar
• Residence proof
• Income certificate
• Passport size photo
• Bank details

📍 **New Ration Card:** Apply at nearest Fair Price Shop or Tehsil office

✏️ **Correction:** Name/address correction at ePDS portal or local food office

📊 **Ration Balance:** Check by SMS, call 1967, or state portal

🔄 **One Nation One Ration:** Get ration from any state using same card

📞 **Helpline:** 1967 (toll free)

💻 **Digitization:** ePoS machines at ration shops for transparent distribution`,
            category: 'Government Document'
        },
        
        'kisan credit card': {
            title: 'Kisan Credit Card (KCC)',
            content: `**Kisan Credit Card scheme for farmers**

💳 **About:** Provides farmers with timely access to credit for agricultural needs

💰 **Loan Amount:** Up to ₹3 lakh at subsidized interest rates

📋 **Benefits:**
• Easy access to credit
• Subsidized interest rates
• Flexible repayment options
• Covers all agricultural needs

✅ **Eligibility:** All farmers (small, marginal, large)

📝 **How to Apply:** Contact nearest bank branch or CSC center

📄 **Documents Required:**
• Aadhaar card
• Land records
• Passport size photo
• Bank account

🔄 **Renewal:** Can be renewed every 3-5 years

🌾 **Coverage:**
• Crop production
• Post-harvest expenses
• Farm maintenance
• Allied activities

📞 **Helpline:** Contact your bank's customer care`,
            category: 'Agricultural Scheme'
        },
        
        'kisan helpline': {
            title: 'Kisan Call Center / Helpline',
            content: `**Farmer Helpline Services**

📞 **Primary Number:** 1800-180-1551 (Toll free)

⏰ **Timing:** 24x7 service available

🗣️ **Languages:** Available in multiple regional languages

🛠️ **Services Provided:**
• Crop advice
• Pest management
• Government scheme information
• Market prices
• Weather updates
• Soil health
• Fertilizer recommendations

📱 **Alternative Numbers:**
• 1551 (short code from mobile)
• 1800-180-1552 (for fisheries)
• 1962 (animal husbandry)

🎧 **IVRS:** Interactive Voice Response System for quick information

👨‍🔬 **Expert Connect:** Connect directly to agriculture experts

📨 **SMS Service:** Get information via SMS by registering mobile number

📱 **WhatsApp Help:** Many states have agriculture WhatsApp helplines

🏢 **Operator:** Ministry of Agriculture, Government of India`,
            category: 'Helpline'
        },
        
        'soil health': {
            title: 'Soil Health Card Scheme',
            content: `**Soil Health Management**

🌱 **Definition:** Capacity of soil to function as a living ecosystem for plant growth

🔬 **Important Factors:**
• Organic matter content
• pH level
• Nutrient content (N,P,K)
• Microbial activity
• Soil texture
• Water holding capacity

✅ **Ideal Soil Characteristics:**
• Good structure and drainage
• Sufficient organic matter
• Neutral pH (6.5-7.5)
• Rich in essential nutrients
• Active beneficial microbes

⚠️ **Soil Degradation Causes:**
• Excessive chemical fertilizers
• Deforestation
• Overgrazing
• Improper irrigation
• Monocropping
• Burning crop residues

💚 **Improvement Methods:**
• Add organic manure/compost
• Practice crop rotation
• Use green manure
• Reduce chemical inputs
• Mulching
• Contour farming on slopes

🧪 **Soil Testing:** Test soil every 2-3 years at government lab (fee ₹50-100)

📋 **Soil Health Card:** Get personalized fertilizer recommendations

🟤 **Organic Carbon:** Should be minimum 0.5% for good soil health

🧫 **Micro-nutrients:** Zinc, Iron, Copper, Manganese, Boron essential`,
            category: 'Agriculture'
        },
        
        'dengue': {
            title: 'Dengue Fever - Symptoms & Treatment',
            content: `**Dengue Symptoms and Care**

⏱️ **Incubation Period:** 4-10 days after mosquito bite

⚠️ **Common Symptoms:**
• Sudden high fever (104°F)
• Severe headache
• Pain behind eyes
• Joint and muscle pain
• Fatigue
• Nausea/vomiting
• Skin rash (appears 2-5 days after fever)
• Mild bleeding (nose/gums)

🚨 **Warning Signs (Severe Dengue):**
• Severe abdominal pain
• Persistent vomiting
• Rapid breathing
• Bleeding gums
• Blood in vomit
• Extreme weakness
• Restlessness

📅 **Critical Phase:** Days 3-7 of illness - watch for warning signs

🔬 **Diagnosis:**
• NS1 antigen test (first 5 days)
• IgM antibody test (after 5 days)
• Complete blood count for platelet monitoring

💊 **Treatment:**
• No specific antiviral
• Paracetamol for fever (avoid aspirin/ibuprofen)
• Bed rest
• Oral rehydration
• Hospitalization if severe

📊 **Platelet Count:**
• Normal: 1.5-4.5 lakh
• Transfusion needed if below 10,000-20,000

⚠️ **Danger Signs:** Platelet drop, plasma leakage, organ failure

🔄 **Recovery:** Usually 2-7 days, fatigue may persist for weeks`,
            category: 'Health Advisory'
        },
        
        'malaria': {
            title: 'Malaria - Symptoms & Prevention',
            content: `**Malaria Information**

🦟 **Causative Agent:** Plasmodium parasite (P. falciparum, P. vivax, P. malariae)

🦟 **Transmission:** Female Anopheles mosquito bite

⏱️ **Incubation Period:** 7-30 days depending on parasite type

⚠️ **Classic Symptoms:**
• Cycles of fever with chills
• Profuse sweating
• Headache
• Muscle pain
• Fatigue
• Nausea/vomiting
• Anemia

🔄 **Malaria Paroxysm:**
• Cold stage (shivering)
• Hot stage (high fever)
• Sweating stage

⚠️ **Falciparum Malaria:** More severe, can cause cerebral malaria, organ failure

🔄 **Vivax Malaria:** Can relapse after months/years

🔬 **Diagnosis:**
• Rapid diagnostic test (RDT)
• Microscopy (blood smear)
• PCR test

💊 **Treatment:** Artemisinin-based combination therapy (ACT)

🛡️ **Prevention:**
• Mosquito nets (insecticide treated)
• Indoor residual spraying
• Antimalarial drugs for travelers
• Remove stagnant water

⚠️ **Complications:** Cerebral malaria, severe anemia, kidney failure

✅ **Free Treatment:** Available at all government health facilities under NVBDCP`,
            category: 'Health Advisory'
        },
        
        'covid': {
            title: 'COVID-19 - Symptoms & Care',
            content: `**COVID-19 Information**

⏱️ **Incubation Period:** 2-14 days (average 5-6 days)

⚠️ **Common Symptoms:**
• Fever or chills
• Dry cough
• Shortness of breath
• Fatigue
• Body aches
• Headache
• Loss of taste or smell
• Sore throat
• Congestion
• Nausea/vomiting
• Diarrhea

🚨 **Severe Symptoms (Emergency):**
• Difficulty breathing
• Persistent chest pain/pressure
• Confusion
• Bluish lips/face
• Inability to wake/stay awake

🦠 **Variants:** Delta, Omicron may have different presentation (more cold-like)

⏱️ **Long COVID:** Symptoms persisting for weeks/months

🔬 **Diagnosis:**
• RT-PCR (gold standard)
• Rapid Antigen Test
• Chest CT in severe cases

🏠 **Home Care:**
• Isolation
• Paracetamol for fever
• Steam inhalation
• Hydration
• Monitor oxygen saturation

💨 **Oxygen Level:** Seek help if SpO2 drops below 94%

💉 **Vaccination:** Free at government centers - Covaxin, Covishield

🛡️ **Prevention:** Mask, hand hygiene, social distancing, vaccination`,
            category: 'Health Advisory'
        },
        
        'crop insurance': {
            title: 'Pradhan Mantri Fasal Bima Yojana',
            content: `**Crop Insurance Scheme - PMFBY**

📋 **Scheme Name:** Pradhan Mantri Fasal Bima Yojana (PMFBY)

🎯 **Objective:** Provide insurance coverage to farmers in case of crop failure

✅ **Covered Risks:**
• Natural fire and lightning
• Storm, hailstorm, cyclone
• Flood, inundation, landslide
• Drought, dry spells
• Pests and diseases
• Post-harvest losses (up to 14 days)

💰 **Premium Rates:**
• Kharif crops: 2% of sum insured
• Rabi crops: 1.5% of sum insured
• Commercial crops: 5% of sum insured

🤝 **Balance Premium:** Shared equally by Central and State Government

📊 **Coverage:**
• Sowing/planting risk
• Standing crop risk
• Post-harvest risk
• Localized calamities
• Prevented sowing risk

📝 **Enrollment:** Through banks, CSC, insurance agents before cut-off dates

📄 **Documents Required:**
• Land records
• Bank account
• Aadhaar
• Crop sown declaration

📅 **Cut-off Dates:**
• Kharif: July 31
• Rabi: December 31 (varies by state)

📞 **Helpline:** 1800-180-1551

✅ **Compulsory:** For farmers availing crop loans
✅ **Voluntary:** Non-loanee farmers can also apply`,
            category: 'Government Scheme'
        },
        
        'crop rotation': {
            title: 'Crop Rotation - Guide for Farmers',
            content: `**Crop Rotation in Farming**

🌾 **Definition:** Growing different types of crops in same area in sequenced seasons

✅ **Benefits:**
• Improves soil fertility
• Reduces pest and disease buildup
• Controls weeds naturally
• Prevents soil erosion
• Increases crop yield
• Better nutrient utilization
• Reduces chemical dependency

📋 **Basic Principles:**
• Alternate deep rooted and shallow rooted crops
• Follow legumes with cereals
• Avoid same family crops consecutively
• Include cover crops
• Consider market demand

🔄 **Common Rotation Patterns:**
• Rice → Wheat → Green gram (1 year)
• Maize → Potato → Onion (2 years)
• Cotton → Sugarcane → Wheat (3 years)
• Groundnut → Wheat → Bajra (2 years)

🫘 **Legume Importance:** Legumes fix nitrogen in soil, benefit following cereal crops

🌿 **Cover Crops:** Grow sunhemp, dhaincha to protect and enrich soil

⚠️ **Rotation by Family:** Don't follow potato with tomato (both Solanaceae family)

🌱 **Green Manuring:** Incorporate crop residues/legumes into soil before planting

🇮🇳 **Traditional Indian:** Three crop rotation: Kharif → Rabi → Zaid`,
            category: 'Agriculture'
        },
        
        'drip irrigation': {
            title: 'Drip Irrigation - Water Saving Technology',
            content: `**Drip Irrigation System**

💧 **Definition:** Water application method where water drips slowly to plant roots

💦 **Water Saving:** 30-70% water saving compared to flood irrigation

📈 **Yield Increase:** 20-90% yield increase depending on crop

🔧 **Components:**
• Water source
• Pump and filter
• Mainline pipes
• Sub-main lines
• Laterals
• Drippers/emitters
• Valves and controllers

✅ **Advantages:**
• Water conservation
• Less weed growth
• Uniform water distribution
• Fertigation possible
• Less labor cost
• Works on all slopes
• Reduced disease incidence

⚠️ **Disadvantages:**
• High initial cost
• Clogging issues
• Sun damage to tubes
• Requires clean water

🌽 **Suitable Crops:**
• Fruits (banana, grapes, pomegranate)
• Vegetables (tomato, chilli, brinjal)
• Cash crops (sugarcane, cotton)
• Plantations (coffee, tea)

💰 **Subsidy:** Up to 80-90% subsidy for small farmers under PMKSY

💊 **Fertigation:** Apply fertilizers through drip system for efficiency

🔧 **Maintenance:** Regular filter cleaning, flush lines periodically

📋 **Types:**
• Surface drip
• Sub-surface drip
• Micro-sprinklers
• Bubbler system`,
            category: 'Agriculture Technology'
        },
        
        'wheat farming': {
            title: 'Wheat Farming - Complete Guide',
            content: `**Wheat Farming (Rabi Crop)**

🌾 **Scientific Name:** Triticum aestivum

📅 **Season:** Rabi (October-November to March-April)

🌡️ **Climate:** Cool growing season, warm ripening, 10-25°C ideal

🌱 **Soil:** Well-drained loamy soil, pH 6.0-7.5

🌽 **Popular Varieties:**
• HD 2967
• HD 3086
• PBW 343
• DBW 17
• GW 322
• LOK 1

🚜 **Land Preparation:** 2-3 ploughings followed by planking, level field

🌱 **Seed Rate:** 100-125 kg per hectare

💊 **Seed Treatment:** Treat with fungicide (Carbendazim @ 2g/kg seed)

🌱 **Sowing Method:** Drilling in rows at 20-22.5 cm spacing, depth 4-5 cm

📅 **Sowing Time:** October 25 to November 20 (optimal)

💧 **Irrigation:** 4-6 irrigations at critical stages: CRI, tillering, jointing, flowering, grain filling

🧪 **Fertilizer:** 120:60:40 kg NPK per hectare

🌿 **Weed Control:** Pre-emergence herbicide + one hand weeding

🐛 **Major Pests:** Aphids, termites, stem borer

🦠 **Major Diseases:** Rust, Karnal bunt, loose smut

🌾 **Harvesting:** When grains become hard and moisture below 25%

📦 **Yield:** 40-50 quintals per hectare (improved varieties)

💰 **Government Support:** MSP announced annually, procurement by FCI`,
            category: 'Agriculture'
        },
        
        'rice farming': {
            title: 'Rice Farming - Complete Guide',
            content: `**Rice Farming (Kharif Crop)**

🌾 **Scientific Name:** Oryza sativa

📅 **Season:** Kharif (June-July to October-November)

🌡️ **Climate:** Hot and humid, 20-35°C, high rainfall (100-200 cm)

🌱 **Soil:** Clay loam with good water retention, pH 5.5-7.0

🌽 **Popular Varieties:**
• Pusa Basmati 1121
• PB 1509
• PR 126
• MTU 7029
• Swarna
• IR 64

🌱 **Cultivation Methods:**
• Transplanting (common)
• Direct seeding
• SRI (System of Rice Intensification)
• Aerobic rice

🌱 **Nursery:** Prepare 25-30 days before transplanting

🌱 **Seed Rate:** 25-30 kg per hectare (transplanting)

💧 **Water Management:** Maintain 2-5 cm standing water during vegetative phase

🧪 **Fertilizer:** 120:60:40 kg NPK per hectare, split application

🌿 **Weed Control:** Pre-emergence herbicide + one hand weeding

🐛 **Major Pests:** Stem borer, Brown plant hopper, Leaf folder

🦠 **Major Diseases:** Blast, Bacterial leaf blight, Sheath rot

🌾 **Harvesting:** When grains turn golden yellow and moisture 20-25%

📦 **Yield:** 50-60 quintals per hectare (high yielding varieties)

💰 **Paddy Procurement:** Government purchases at MSP through FCI

🔄 **Byproducts:** Rice husk for fuel, rice bran for oil, straw for animal feed`,
            category: 'Agriculture'
        },
        
        'fertilizer': {
            title: 'Fertilizer Use Guide',
            content: `**Fertilizer Application Guide**

🌱 **Definition:** Substances added to soil to supply nutrients for plant growth

📋 **Types of Fertilizers:**

🟢 **Organic Fertilizers:**
• Compost
• Manure (FYM)
• Vermicompost
• Green manure

🔵 **Inorganic Fertilizers:**
• Urea (46% Nitrogen)
• DAP (18:46:0)
• MOP (60% Potash)
• SSP
• Complex fertilizers

🟡 **Biofertilizers:**
• Rhizobium
• Azotobacter
• Azospirillum
• PSB

🥦 **Primary Nutrients:**
• Nitrogen (N): Leaf growth, vegetative development
• Phosphorus (P): Root growth, flowering, fruiting
• Potassium (K): Disease resistance, quality

🧪 **Secondary Nutrients:** Calcium, Magnesium, Sulfur

🔬 **Micro-nutrients:** Zinc, Iron, Copper, Manganese, Boron

🧪 **Soil Testing:** Essential before fertilizer application

📊 **Fertilizer Calculation:** Based on soil test results

📝 **Application Methods:**
• Basal application (at sowing)
• Top dressing
• Foliar spray
• Fertigation

⚠️ **Deficiency Symptoms:**
• Yellowing (N)
• Purple tinge (P)
• Marginal burning (K)

⚠️ **Toxicities:** Excess fertilizer burns roots, pollutes water

💰 **Government Schemes:** Neem-coated urea mandatory, subsidy through DBT`,
            category: 'Agriculture'
        },
        
        'organic farming': {
            title: 'Organic Farming Guide',
            content: `**Organic Farming - Complete Information**

🌱 **Definition:** Farming without synthetic chemicals, using natural inputs

📋 **Core Principles:**
• Health
• Ecology
• Fairness
• Care

✅ **Key Practices:**
• Use of organic manure (FYM, compost, vermicompost)
• Green manuring
• Crop rotation
• Mixed cropping
• Biological pest control
• Mulching
• Weed management through mechanical methods

🌿 **Organic Inputs:**
• FYM: 10-15 tons/hectare
• Vermicompost: 5-10 tons/hectare
• Green manure: Sunhemp, Dhaincha
• Liquid manure: Jeevamrut, Panchagavya
• Neem-based pesticides

📋 **Certification Process:**
• Apply to APEDA or recognized body
• Conversion period: 2-3 years
• Inspection by certifying agency
• Documentation of all practices
• Annual renewal

✅ **Benefits:**
• Healthier food, no chemical residues
• Sustainable soil health
• Better water retention
• Higher prices in market
• Climate resilient
• Biodiversity conservation

⚠️ **Challenges:**
• Lower initial yields
• More labor intensive
• Knowledge intensive
• Certification cost

💰 **Government Schemes:**
• Paramparagat Krishi Vikas Yojana (PKVY)
• Mission Organic Value Chain Development (MOVCD)

🇮🇳 **Organic India:** Sikkim 100% organic state`,
            category: 'Agriculture'
        },
        
        'weather helpline': {
            title: 'Weather Helpline for Farmers',
            content: `**Weather Information Services**

📞 **Short Code:** 196 (toll free from mobile)

🏢 **Service Provider:** India Meteorological Department (IMD)

📋 **Information Provided:**
• Daily weather forecast (5 days)
• Rainfall warnings
• Temperature (max/min)
• Humidity levels
• Wind speed and direction
• Thunderstorm alerts
• Cyclone warnings
• Agricultural advisories based on weather

🗣️ **Languages:** Available in regional languages

📱 **SMS Service:** Register for weather alerts on mobile

🌐 **Alternative Access:**
• Website: mausam.imd.gov.in
• Mobile app: Meghdoot, Mausam
• TV/Radio bulletins
• Newspaper
• Kisan Call Centre (1800-180-1551)

📋 **Agromet Advisory:** Jointly issued by IMD and agriculture universities

📍 **District Level:** Forecast for every district

✅ **Farmers Benefit:** Plan farming operations based on weather forecast

⚠️ **Alerts:** Red/Orange/Yellow alerts for severe weather`,
            category: 'Helpline'
        },
        
        'jan dhan': {
            title: 'Pradhan Mantri Jan Dhan Yojana',
            content: `**PM Jan Dhan Yojana - Financial Inclusion**

📅 **Launched:** August 28, 2014

🎯 **Objective:** Ensure access to financial services for all households

✅ **Key Features:**
• Zero balance savings account
• RuPay debit card
• Accidental insurance cover of ₹2 lakh
• Life insurance cover of ₹30,000
• Overdraft facility up to ₹10,000
• Mobile banking facility
• Direct benefit transfer (DBT) eligible

👥 **Eligibility:** Any Indian citizen (one account per adult)

📋 **Documents Required:**
• Aadhaar
• PAN/Form 60
• Recent photograph

🏦 **Where to Open:** Any public/private sector bank, rural bank

💰 **Overdraft:** Available after 6 months of satisfactory operation

📊 **Current Status:** Over 45 crore accounts opened, deposits over ₹1.5 lakh crore

👩 **Beneficiaries:** Women accounts priority, 55% accounts of women

🌾 **Rural Focus:** Over 60% accounts in rural/semi-urban areas

🔄 **DBT Linkage:** Subsidies directly credited to Jan Dhan accounts

✅ **Financial Inclusion:** Part of government's financial inclusion mission`,
            category: 'Government Scheme'
        },
        
        'digital payments': {
            title: 'Digital Payments Guide',
            content: `**Digital Payments in India**

💳 **Definition:** Electronic transactions for payments without physical cash

📋 **Types of Digital Payments:**
• UPI (Unified Payments Interface)
• Debit/Credit cards
• Net banking
• Mobile wallets
• Aadhaar Pay
• BHIM app
• QR code scanning
• NEFT/RTGS
• IMPS

📱 **Popular UPI Apps:**
• BHIM
• Google Pay
• PhonePe
• Paytm
• Amazon Pay
• WhatsApp Pay

✅ **UPI Benefits:**
• 24x7 availability
• Immediate transfer
• No charges
• Single app for multiple banks
• Virtual payment address (VPA)
• QR code based payments

📝 **How to Start:**
• Link bank account to UPI app
• Create UPI PIN
• Add beneficiaries or scan QR code
• Enter PIN to pay

🔒 **Security Tips:**
• Never share UPI PIN
• Don't scan unknown QR codes
• Verify before paying
• Set transaction limits
• Use secure networks

💰 **Government Initiatives:**
• DigiDhan Mission
• Lucky Grahak Yojana
• Discount on digital payments
• Rupay card promotion

📊 **Limits:** UPI: ₹1 lakh per transaction`,
            category: 'Digital Services'
        },
        
        'bhim app': {
            title: 'BHIM App - Complete Guide',
            content: `**BHIM App (Bharat Interface for Money)**

📱 **Full Form:** Bharat Interface for Money

🏢 **Developed By:** National Payments Corporation of India (NPCI)

📅 **Launched:** December 30, 2016

🔄 **Based On:** UPI (Unified Payments Interface)

✅ **Features:**
• Send money using UPI ID, account number, Aadhaar, QR code
• Request money from others
• Scan and pay at shops
• Check transaction history
• Multiple bank accounts in one app
• Virtual payment address (@okbhim)
• No transaction charges

📝 **How to Use:**
• Download BHIM app
• Select language (14 languages)
• Register with mobile number
• Set app lock PIN
• Create UPI PIN for each bank
• Start transacting

🏦 **Supported Banks:** Over 200 banks in India

💰 **Daily Limit:** ₹20,000 per day

💰 **Per Transaction:** ₹5,000 to ₹1,00,000

🔒 **Security:**
• App lock with PIN
• UPI PIN for each transaction
• Device binding
• MPIN never shared

📞 **Helpline:** 1800-120-2255 (toll free)

✅ **Special Features:**
• Aadhaar Pay (biometric payments)
• Check balance
• Send money to Aadhaar number
• Collect money from multiple people`,
            category: 'Digital Services'
        },
        
        'aadhaar': {
            title: 'Aadhaar Update Guide',
            content: `**Aadhaar Card Update & Correction**

📋 **What is Update:** Update or correct information in Aadhaar database

✅ **Types of Updates:**
• Name correction
• Address change
• Date of birth correction
• Gender update
• Mobile number update
• Email ID addition
• Biometric update (photo, fingerprint, iris)

💻 **Online Update Process:**
• Visit myaadhaar.uidai.gov.in
• Login with Aadhaar number and OTP
• Select document update
• Upload supporting documents
• Pay fee (₹50 for demographic, ₹100 for biometric)
• Get Update Request Number (URN)

🏢 **Offline Update:**
• Visit nearest Aadhaar Seva Kendra
• Fill update form
• Submit original documents
• Biometric authentication
• Pay fee
• Collect acknowledgment with URN

📄 **Documents Accepted:**
• Passport
• Voter ID
• Driving license
• PAN card
• Bank passbook
• Ration card
• Electricity bill
• Birth certificate (for DOB)

⏱️ **Processing Time:** 90 days

✅ **Status Check:** Check using URN on myaadhaar.uidai.gov.in

📞 **Helpline:** 1947 (toll free)

✅ **Free Updates:** First update of name, address, DOB in first 10 years is free`,
            category: 'Government Document'
        },
        
        'voter id': {
            title: 'Voter ID Card Guide',
            content: `**Voter ID Card (EPIC)**

📋 **Official Name:** Electors Photo Identity Card (EPIC)

🏢 **Issued By:** Election Commission of India

🎯 **Purpose:** Identity proof for voting in elections

✅ **Eligibility:** Indian citizen, 18 years or above on January 1 of the year

📝 **How to Apply (Online):**
• Visit nvsp.in
• Form 6 for new registration
• Form 8 for correction/update
• Form 7 for objection/deletion
• Upload documents
• Submit, get reference number

📝 **Offline Application:**
• Visit nearest voter help center
• Fill Form 6
• Submit documents

📋 **Documents Required:**
• Proof of age (Birth certificate, School certificate, Passport)
• Proof of residence (Passport, Bank passbook, Ration card, Driving license, Utility bill)
• Passport size photograph

📊 **Status Check:** Check on nvsp.in with reference number

✅ **Voter List:** Check name at electoralsearch.in

🔢 **EPIC Number:** Unique alphanumeric voter ID number

✏️ **Correction:** Name/address/photo correction through Form 8

📞 **Helpline:** 1950 (toll free)

📱 **Voter Helpline App:** Mobile app from Election Commission

✅ **Voting Day:** Carry EPIC or alternative approved ID`,
            category: 'Government Document'
        },
        
        'pan card': {
            title: 'PAN Card Guide',
            content: `**PAN Card (Permanent Account Number)**

📋 **Full Form:** Permanent Account Number

🏢 **Issued By:** Income Tax Department

🔢 **Format:** 10 character alphanumeric (AAAAA0000A)

🎯 **Purpose:**
• Financial transactions above specified limits
• Income tax filing
• Identity proof
• Opening bank account
• Buying/selling property
• Demat account
• Credit/debit card application
• High value purchases

✅ **Eligibility:** Any Indian citizen including minors, NRIs

📝 **How to Apply (Online):**
• Visit nsdl.co.in or utiitsl.com
• Form 49A (for Indian citizens)
• Form 49AA (for foreign citizens)
• Upload documents
• Pay fee

📋 **Documents Required:**
• Proof of identity (Aadhaar, Voter ID, Passport)
• Proof of address (Aadhaar, Voter ID, Bank statement)
• Date of birth proof
• Passport size photograph

💰 **Application Fee:** ₹93 (including GST)

⏱️ **Processing Time:** 15-20 working days

📊 **Status Check:** Check on NSDL/UTI website

✅ **e-PAN:** Instant e-PAN through Aadhaar based process

🔄 **Link Aadhaar:** Mandatory to link PAN with Aadhaar

📞 **Helpline:** 1800-180-1961 (NSDL)`,
            category: 'Government Document'
        },
        
        'scholarship': {
            title: 'Scholarship Guide for Students',
            content: `**Scholarship Information**

📋 **Types of Scholarships:**
• Central government
• State government
• Private
• Institution based

🌐 **National Scholarship Portal:** scholarships.gov.in

📋 **Popular Central Schemes:**
• Pre-Matric Scholarship for SC/ST/OBC/Minority
• Post-Matric Scholarship for SC/ST/OBC
• Merit-cum-Means Scholarship
• National Means-cum-Merit Scholarship (NMMS)
• National Talent Search Examination (NTSE)
• Kishore Vaigyanik Protsahan Yojana (KVPY)
• AICTE Pragati Scholarship (for girls)
• AICTE Saksham Scholarship (for differently abled)

✅ **General Eligibility:**
• Indian citizenship
• Minimum educational qualification
• Income criteria (varies by scheme)
• Category specific
• Minimum marks requirement

📝 **Application Process:**
• Register on scholarships.gov.in
• Fill application form
• Upload required documents
• Submit to concerned authority
• Track application status

📋 **Documents Required:**
• Aadhaar card
• Income certificate
• Caste certificate
• Previous year mark sheets
• Fee receipt (for renewal)
• Bank account details
• Passport size photograph

🔄 **Renewal:** Many require annual renewal

📅 **Last Date:** Usually September-October

💰 **Disbursement:** Direct Benefit Transfer (DBT) to bank account

📞 **Helpline:** Scholarships portal helpline`,
            category: 'Education'
        },
        
        'girl education': {
            title: 'Beti Bachao Beti Padhao',
            content: `**Beti Bachao Beti Padhao - Girl Education**

📅 **Launched:** January 22, 2015

🎯 **Objectives:**
• Prevent gender biased sex selection
• Ensure survival and protection of girl child
• Ensure education and participation of girl child

📋 **Key Schemes for Girl Education:**
• Sukanya Samriddhi Yojana - Savings scheme for girl child
• Kasturba Gandhi Balika Vidyalaya - Residential schools for girls
• National Scheme of Incentives to Girls for Secondary Education
• CBSE Merit Scholarship Scheme for Girls
• State specific girl education schemes

💰 **Sukanya Samriddhi Yojana:**
• Interest: Highest among small savings (currently 8%)
• Opening: At post office or authorized banks
• Eligibility: Girl child below 10 years
• Deposit: Minimum ₹250, max ₹1.5 lakh per year
• Maturity: 21 years or marriage after 18

⚠️ **Challenges:**
• Child marriage
• Gender discrimination
• Safety concerns
• Financial constraints
• Distance to schools

✅ **Government Initiatives:**
• Free education for girls up to higher secondary
• Girls hostel scheme
• STEM education promotion
• Scholarships exclusively for girls
• Safe transport facilities

📞 **Helpline:** Childline 1098

📍 **Coverage:** 640+ districts across India`,
            category: 'Social Scheme'
        },
        
        'pregnancy care': {
            title: 'Pregnancy Care Guide',
            content: `**Pregnancy Care - Complete Information**

✅ **Importance:** Proper care ensures healthy mother and baby

📋 **Antenatal Care:** Regular checkups throughout pregnancy

📅 **Recommended Visits:**
• First trimester: First visit immediately
• Second trimester: Monthly visits
• Third trimester: Fortnightly visits (up to 36 weeks)
• Weekly visits (after 36 weeks)
• Minimum 4 visits as per government guidelines

💰 **Janani Suraksha Yojana:**
• Cash assistance for institutional delivery
• Amount: ₹1400 (rural), ₹1000 (urban) in low performing states
• Eligibility: Pregnant women 19 years+, BPL families

💰 **Pradhan Mantri Matru Vandana Yojana:**
• ₹5000 in three installments
• Eligibility: First live birth, 19 years+
• Installments: Early registration, After 6 months, After childbirth

🥗 **Nutrition During Pregnancy:**
• Iron and folic acid supplements (mandatory)
• Calcium supplements
• Protein rich diet (dal, eggs, milk, nuts)
• Fruits and vegetables
• Avoid alcohol, smoking, tobacco
• Drink plenty of water

🚨 **Danger Signs:**
• Severe abdominal pain
• Heavy bleeding
• Severe headache with blurred vision
• Convulsions
• High fever
• Reduced fetal movement

✅ **Government Services:**
• Free delivery at government hospitals
• Free medicines and diagnostics
• Janani Shishu Suraksha Karyakram - free transport

💉 **Vaccination:** TT (Tetanus) 2 doses

📞 **Helpline:** Maternal Health Helpline: 104`,
            category: 'Health'
        },
        
        'child vaccination': {
            title: 'Child Vaccination Schedule',
            content: `**Child Vaccination - Complete Guide**

📋 **Program:** Universal Immunization Programme (UIP)

🎯 **Mission:** Mission Indradhanush - accelerated vaccination

✅ **Importance:** Prevents life threatening diseases

📅 **Vaccination Schedule:**

👶 **At Birth:**
• BCG
• OPV-0
• Hepatitis B-0

👶 **6 Weeks:**
• OPV-1
• DPT-1
• Hepatitis B-1
• Rotavirus-1
• PCV-1
• IPV-1

👶 **10 Weeks:**
• OPV-2
• DPT-2
• Rotavirus-2
• PCV-2

👶 **14 Weeks:**
• OPV-3
• DPT-3
• Hepatitis B-3
• Rotavirus-3
• PCV-3
• IPV-2

👶 **9-12 Months:**
• Measles-Rubella-1
• Vitamin A dose

👶 **16-24 Months:**
• DPT booster-1
• Measles-Rubella-2
• OPV booster
• Vitamin A dose

🧒 **5-6 Years:**
• DPT booster-2

🧒 **10-16 Years:**
• Td vaccine

✅ **Diseases Prevented:**
• Tuberculosis, Polio, Diphtheria
• Pertussis, Tetanus, Hepatitis B
• Measles, Rubella, Rotavirus
• Pneumonia, Japanese Encephalitis

📍 **Where to Get:** Government hospitals, PHC, CHC, Anganwadi

✅ **All Free:** All vaccines under UIP are completely free

📞 **Helpline:** Child health helpline: 104`,
            category: 'Health'
        },
        
        'clean water': {
            title: 'Clean Water & Jal Jeevan Mission',
            content: `**Clean Water & Jal Jeevan Mission**

✅ **Importance:** Essential for health, prevents waterborne diseases

💧 **Jal Jeevan Mission:**
• **Objective:** Har Ghar Jal - Tap water to every rural household by 2024
• **Coverage:** Over 10 crore households already connected
• **Implementation:** Through Gram Panchayats
• **Funding:** Central and state share

⚠️ **Water Borne Diseases:**
• Diarrhea
• Cholera
• Typhoid
• Hepatitis A & E
• Giardiasis
• Amoebiasis

💧 **Water Purification Methods:**
• Boiling (10-15 minutes)
• Chlorination (1-2 drops per liter)
• Water filters (candle, UV, RO)
• Solar disinfection (6 hours in sun)
• Filtration through cloth

✅ **Safe Storage:**
• Clean covered containers
• Wide mouth containers
• Use ladle with long handle
• Don't dip fingers

🧪 **Water Testing:** Get water tested for arsenic/fluoride in affected areas

💧 **Rainwater Harvesting:** Collect and store rainwater

📞 **Helpline:** Jal Jeevan Mission: 1800-120-8040

✅ **Water Conservation:** Use water wisely, repair leaks, reuse greywater`,
            category: 'Health & Hygiene'
        },
        
        'toilet hygiene': {
            title: 'Toilet Hygiene & Swachh Bharat',
            content: `**Toilet Hygiene & Swachh Bharat Mission**

📋 **Campaign:** Swachh Bharat Mission (Clean India Mission)

📅 **Launched:** October 2, 2014

🎯 **Objective:** Make India open defecation free (ODF)

✅ **Achievements:**
• Over 10 crore toilets constructed
• All villages declared ODF (2019)
• Now moving towards ODF Plus

✅ **Importance of Toilet Use:**
• Prevents spread of diseases
• Protects dignity and safety, especially of women
• Clean environment
• Prevents water contamination
• Reduces child mortality

🧹 **Maintenance Tips:**
• Clean daily with water and cleaning agent
• Keep toilet dry
• Use dustbin for sanitary waste
• Ensure proper water supply
• Regular septic tank cleaning (2-3 years)
• Repair leaks promptly

👥 **Swachhagrahi:** Community motivator for toilet use

💰 **Individual Household Toilet:** Financial assistance under SBM

🚻 **Community Toilets:** In urban slums and public places

🏫 **School Toilets:** Separate for boys and girls

📞 **Helpline:** Swachh Bharat helpline: 1969

✅ **ODF Plus:** Villages with solid/liquid waste management`,
            category: 'Health & Hygiene'
        },
        
        'hand washing': {
            title: 'Hand Washing - Importance & Technique',
            content: `**Hand Washing - Life Saving Habit**

✅ **Importance:** Single most effective way to prevent infections

⏰ **Critical Times to Wash Hands:**
• Before eating or cooking
• After using toilet
• After cleaning child's bottom
• Before feeding child
• After coughing/sneezing
• After handling animals
• After coming from outside
• Before and after treating wounds
• After touching garbage

🧼 **Proper Technique (6 Steps):**
1. Wet hands with clean running water
2. Apply soap
3. Rub hands palm to palm
4. Rub back of both hands
5. Rub between fingers
6. Rub thumbs
7. Rub fingertips on palms
8. Rub wrists
9. Rinse thoroughly
10. Dry with clean cloth

⏱️ **Duration:** At least 40-60 seconds (20 seconds of rubbing)

🧴 **Soap vs Sanitizer:**
• **Soap & Water:** Best when hands visibly dirty
• **Sanitizer:** When soap not available, at least 60% alcohol

✅ **Disease Prevention:**
• Diarrhea (reduces by 40%)
• Respiratory infections (reduces by 20%)
• COVID-19 and other viruses
• Skin and eye infections

📅 **Global Handwashing Day:** October 15

📞 **Helpline:** Health helpline: 104`,
            category: 'Health & Hygiene'
        },
        
        'first aid': {
            title: 'First Aid - Essential Guide',
            content: `**First Aid - Emergency Guide**

📋 **Definition:** Immediate assistance before medical help arrives

✅ **Golden Rule:** Do no further harm

🧰 **First Aid Kit Contents:**
• Sterile gauze and bandages
• Adhesive tape
• Antiseptic solution
• Cotton
• Scissors and tweezers
• Disposable gloves
• Pain relievers (paracetamol)
• Antihistamines
• ORS
• Burn ointment
• Thermometer
• Safety pins
• Torch

🩹 **Wound Care:**
• Clean with clean water
• Apply antiseptic
• Cover with sterile dressing
• Change dressing daily
• Seek medical help if deep, bleeding heavily

🩸 **Bleeding Control:**
• Apply direct pressure
• Elevate injured part
• Apply pressure bandage
• Do not remove embedded object
• Seek immediate medical help

🔥 **Burns:**
• Cool under running water (10-20 minutes)
• Do not apply ice directly
• Do not apply butter/oil
• Cover with sterile dressing
• Seek medical help for severe burns

🦴 **Fracture:**
• Immobilize injured part
• Do not try to straighten
• Support with sling
• Seek medical help

😮 **Choking:**
• Heimlich maneuver: Stand behind, arms around waist, fist above navel, thrust inward/upward

🫀 **CPR Basics:**
• 30 chest compressions, 2 breaths
• 100-120 compressions per minute

📞 **Emergency Numbers:**
• Ambulance: 108
• Police: 100
• Fire: 101`,
            category: 'Health'
        },
        
        'snake bite': {
            title: 'Snake Bite - First Aid & Treatment',
            content: `**Snake Bite - Emergency Guide**

🐍 **Venomous Snakes in India:**
• Indian Cobra (Nag)
• Russell's Viper (Daboia)
• Saw-scaled Viper (Phoorsa)
• Krait (Karait)

🐍 **Non-venomous:** Rat snake, Python, Tree snake

⚠️ **Symptoms:**

**Cobra/Krait (Neurotoxic):**
• Paralysis
• Drooping eyelids
• Difficulty breathing
• Difficulty swallowing

**Viper (Hemotoxic):**
• Swelling
• Bleeding
• Pain
• Kidney damage

**General:**
• Pain, swelling
• Nausea, vomiting
• Dizziness

❌ **DO NOT:**
• DO NOT apply tourniquet
• DO NOT cut the wound
• DO NOT suck the venom
• DO NOT apply ice
• DO NOT use electric shock
• DO NOT waste time on traditional remedies
• DO NOT run or move excessively

✅ **DO:**
• Keep victim calm and still
• Immobilize bitten limb
• Remove jewelry/watches
• Transport to hospital immediately
• Keep bitten part below heart level
• Note snake appearance (if safely possible)
• Reassure victim - not all bites are venomous

💊 **Treatment:**
• Anti-snake venom (ASV) - only specific treatment
• Available free at government hospitals
• Most effective within 4 hours
• Minimum 24 hours observation

🛡️ **Prevention:**
• Wear shoes/boots at night
• Use torch at night
• Check shoes/clothes before wearing
• Keep surroundings clean
• Sleep on cot in snake prone areas
• Use mosquito nets

📞 **Helpline:** Call 108 for ambulance`,
            category: 'Health Emergency'
        },
        
        'heat stroke': {
            title: 'Heat Stroke - Prevention & First Aid',
            content: `**Heat Stroke - Complete Guide**

🌡️ **Definition:** Severe heat illness when body temperature rises above 40°C (104°F)

⚠️ **Causes:**
• Prolonged exposure to high temperatures
• Strenuous work in heat
• Dehydration
• Poor ventilation
• Certain medications

👥 **Risk Factors:**
• Elderly and infants
• Outdoor workers
• Athletes
• People with chronic illness
• Low socioeconomic status

⚠️ **Symptoms:**
• High body temperature (103°F+)
• Hot, dry skin (no sweating)
• Rapid strong pulse
• Headache
• Dizziness, confusion
• Nausea
• Loss of consciousness
• Seizures

🚨 **First Aid:**
• Move to cool, shaded area
• Remove excess clothing
• Cool rapidly - cold water immersion
• Cover with wet sheets and fan vigorously
• Apply ice packs to neck, armpits, groin
• If conscious, give cool water
• Monitor temperature
• Seek immediate medical help

✅ **Prevention:**
• Drink plenty of water
• Avoid alcohol, caffeine
• Wear light, loose, cotton clothes
• Use hat/umbrella in sun
• Avoid outdoor work during peak heat (12-3 PM)
• Use fans/coolers
• Never leave children in parked car
• Take breaks in shade
• ORS or lemon water

⚠️ **Heat Cramps:** Painful muscle spasms - rest, cool place, ORS

⚠️ **Heat Exhaustion:** Heavy sweating, weakness, cool clammy skin

📞 **Helpline:** 108 for emergency, 104 for health advice`,
            category: 'Health Emergency'
        },
        
        'winter care': {
            title: 'Winter Care - Health Tips',
            content: `**Winter Care Guide**

⚠️ **Cold Related Illnesses:**
• Hypothermia (low body temperature)
• Frostbite (freezing of skin)
• Cold, Flu, Pneumonia
• Asthma exacerbation
• Joint pain aggravation

⚠️ **Hypothermia Symptoms:**
• Shivering (early)
• Confusion, drowsiness (late)
• Slurred speech
• Slow breathing
• Weak pulse
• Loss of consciousness

🚨 **Hypothermia First Aid:**
• Move to warm place
• Remove wet clothing
• Warm gradually - blankets
• Warm drinks (non-alcoholic)
• CPR if unconscious
• Seek medical help

⚠️ **Frostbite Symptoms:**
• Cold, numb skin
• White/grayish-yellow skin
• Hard or waxy skin
• Blisters after rewarming

🚨 **Frostbite First Aid:**
• Move to warm place
• Warm in warm water (37-39°C)
• Do not rub/massage
• Do not use direct heat
• Do not break blisters
• Seek medical help

✅ **General Winter Care:**
• Wear multiple layers
• Cover head, ears, hands, feet
• Use woolen caps, gloves
• Stay dry
• Eat warm, nutritious food
• Drink adequate fluids
• Keep home warm but ventilated
• Avoid alcohol
• Check on elderly neighbors
• Care for livestock

👶 **Newborn Care in Winter:**
• Keep baby warm with layers
• Skin-to-skin contact
• Delay bathing in extreme cold

📞 **Helpline:** 108 for emergencies, 1098 for child`,
            category: 'Health'
        },
        
        'eye care': {
            title: 'Eye Care - Complete Guide',
            content: `**Eye Care Tips & Information**

⚠️ **Common Eye Problems:**
• Red eyes
• Irritation/itching
• Watering
• Dry eyes
• Stye (painful lump)
• Conjunctivitis (pink eye)
• Refractive errors

🩺 **Eye Infections:**

**Conjunctivitis:**
• Redness, discharge, itching
• Highly contagious
• Clean with cold water
• Use separate towel
• Consult doctor
• Wash hands frequently

**Stye:**
• Painful red lump on eyelid
• Warm compress 3-4 times daily
• Do not squeeze
• Consult if persistent

🚨 **First Aid for Eye Injury:**
• Foreign body: Do not rub, blink to remove, wash with clean water
• Chemical splash: Flood with water for 15-20 minutes, seek immediate help
• Blow to eye: Cold compress, consult if vision affected
• Cut: Cover gently, seek immediate help

✅ **Daily Eye Care:**
• Wash eyes with clean water daily
• Avoid rubbing eyes
• Take breaks during screen work (20-20-20 rule)
• Maintain distance while reading
• Use adequate lighting
• Wear sunglasses in strong sun
• Eat vitamin A rich foods

👓 **Vision Testing:**
• Regular eye checkup every 2 years
• Children: Before school entry
• Diabetics: Annual eye check

✅ **Free Services:**
• Eye checkup at government hospitals
• Cataract surgery free under NPCB`,
            category: 'Health'
        }
    };

    // Function to format content with bullet points
    function formatContent(content) {
        return content.replace(/\n/g, '<br>').replace(/•/g, '•');
    }

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

    function handleAsk() {
        if (!queryInput || !responseArea) return;
        
        const query = queryInput.value.trim().toLowerCase();
        if (!query) {
            alert('Kuch to likhiye!');
            return;
        }

        // Hide welcome message
        if (welcomeMsg) {
            welcomeMsg.style.display = 'none';
        }

        // Show loading
        responseArea.innerHTML = `
            <div class="loading-container">
                <div class="spinner-custom"></div>
                <p class="text-muted">Jawaab dhundh rahe hain...</p>
            </div>
        `;

        // Search for matches
        let results = [];
        let searchTerms = query.split(' ').filter(term => term.length > 2);
        
        // First try exact matches
        for (let key in localKnowledge) {
            if (query.includes(key) || key.includes(query)) {
                results.push(localKnowledge[key]);
            } else {
                // Try partial matches
                for (let term of searchTerms) {
                    if (key.includes(term) || term.includes(key)) {
                        results.push(localKnowledge[key]);
                        break;
                    }
                }
            }
        }

        // Remove duplicates
        results = results.filter((item, index, self) => 
            index === self.findIndex(t => t.title === item.title)
        );

        // If multiple results, limit to 3 most relevant
        if (results.length > 3) {
            results = results.slice(0, 3);
        }

        // Display results
        setTimeout(() => {
            if (results.length > 0) {
                renderResults(results);
            } else {
                // Show suggestions
                let suggestions = Object.keys(localKnowledge).slice(0, 8).join(', ');
                responseArea.innerHTML = `
                    <div class="result-card">
                        <div class="result-header">
                            <span class="result-category">
                                <i class="bi bi-info-circle"></i> Kuch nahi mila
                            </span>
                            <span class="result-time">
                                <i class="bi bi-clock"></i> ${new Date().toLocaleTimeString()}
                            </span>
                        </div>
                        <h3 class="result-title">"${query}" ke liye koi jawaab nahi mila</h3>
                        <div class="result-content">
                            <p>In keywords ke baare mein poochhein:</p>
                            <p><strong>${suggestions}</strong></p>
                            <p>Ya phir kuch aur try karein jaise: PM Kisan, Dengue, Crop Insurance, Aadhaar, Ration Card</p>
                        </div>
                    </div>
                `;
            }
            responseArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    }

    function renderResults(results) {
        if (!responseArea) return;

        let html = '';
        results.forEach(item => {
            html += `
                <div class="result-card">
                    <div class="result-header">
                        <span class="result-category">
                            <i class="bi bi-tag"></i> ${item.category || 'Information'}
                        </span>
                        <span class="result-time">
                            <i class="bi bi-clock"></i> ${new Date().toLocaleTimeString()}
                        </span>
                    </div>
                    <h3 class="result-title">${item.title}</h3>
                    <div class="result-content">
                        ${formatContent(item.content)}
                    </div>
                </div>
            `;
        });
        
        responseArea.innerHTML = html;
    }
});
