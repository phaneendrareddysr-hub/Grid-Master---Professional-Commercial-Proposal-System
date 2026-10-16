/* ===================================
   GRIDMASTER - MODERN JAVASCRIPT
   All Interactive Functionality
   ==================================== */

// ===================================
// SALES DATA IMPORT FROM WORK LOG
// ===================================

const OPPORTUNITIES_DATA = [
    {id: 1, date: '2024-09-03', title: 'Balfour Beatty Apollo ~ Primary AIS Equipment - 400kV', oppNumber: 'OPP-24-7121188', revision: 'R2', status: 'Submitted', type: 'SA', value: 193332, owner: 'James Bramwell', company: 'Balfour Beatty', endUser: 'Jaguar Landrover', dueDate: '2025-04-07'},
    {id: 2, date: '2024-09-13', title: 'Cable service - 3 x Q132-YV145E PEXLIM', oppNumber: 'OPP-24-7125723', revision: 'R0', status: 'Lost', type: 'SA', value: 4401, owner: 'Ben Kirby', company: 'Cable Service Ltd', endUser: 'Cable Service Ltd', dueDate: '2024-09-23'},
    {id: 3, date: '2024-09-18', title: 'KUS 3 x 132kV PEXLIM SA', oppNumber: 'OPP-24-7127322', revision: 'R0', status: 'Lost', type: 'SA', value: 6180, owner: 'Muhammad Abbas', company: 'KUS Power Engineering', endUser: 'KUS Power Engineering', dueDate: '2024-09-23'},
    {id: 4, date: '2024-09-17', title: 'Jointing Tech 132kV PEXLIM SA\'s', oppNumber: 'OPP-24-7120765', revision: 'R0', status: 'Lost', type: 'SA', value: 13242, owner: 'Muhammad Abbas', company: 'Jointing Technologies', endUser: 'Jointing Technologies', dueDate: '2024-09-23'},
    {id: 5, date: '2024-09-14', title: 'Omnia Projects-Rayleigh BESS Connection', oppNumber: 'OPP-24-7122032', revision: 'R0', status: 'Submitted', type: 'LTA', value: 84231, owner: 'Muhammad Abbas', company: 'Omnia Project', endUser: 'Rayleigh substation', dueDate: '2024-09-18'},
    {id: 6, date: '2024-09-19', title: 'OCU Service Ltd - Eccles 400kV Equipment', oppNumber: 'OPP-24-7128359', revision: 'R0', status: 'Won', type: 'LTB', value: 921817, owner: 'Muhammad Abbas', company: 'OCU Group', endUser: 'Private Customer', dueDate: '2024-09-30'},
    {id: 7, date: '2024-09-17', title: 'SSE- Farigaig SGT1 - LT000301', oppNumber: 'OPP-24-7127664', revision: 'R0', status: 'Won', type: 'LTB', value: 175400, owner: 'Ivan Watkinson', company: 'SSEN', endUser: 'SSE', dueDate: '2024-10-09'},
    {id: 8, date: '2024-09-17', title: 'SSE- Farigaig SGT2 - LT000195', oppNumber: 'OPP-24-7127314', revision: 'R0', status: 'Won', type: 'LTB', value: 175400, owner: 'Ivan Watkinson', company: 'SSEN', endUser: 'SSE', dueDate: '2024-10-09'},
    {id: 9, date: '2024-09-19', title: 'PN DALY LTD 3x 400kV PEXLIM', oppNumber: 'OPP-24-7128620', revision: 'R0', status: 'Lost', type: 'SA', value: 27000, owner: 'Muhammad Abbas', company: 'PN Daly Ltd', endUser: 'Highview Power', dueDate: '2024-09-26'},
    {id: 10, date: '2024-10-19', title: 'OCU Service Ltd - Eccles 400kV Equipment', oppNumber: 'OPP-24-7128359', revision: 'R0', status: 'Won', type: 'LTB', value: 921817, owner: 'Muhammad Abbas', company: 'OCU Group', endUser: 'Zenobe', dueDate: '2024-12-12'},
    {id: 11, date: '2024-11-12', title: 'Jointing Tech NGED 132kV Bridgend', oppNumber: 'OPP-24-7153766', revision: 'R0', status: 'Revalidated', type: 'SA', value: 26484, owner: 'Moses Irungu', company: 'Jointing Technologies', endUser: 'NG', dueDate: '2024-11-12'},
    {id: 12, date: '2024-12-02', title: 'Hitachi Energy PGTR - RWE 132kV SA\'s', oppNumber: 'OPP-24-7164246', revision: 'R3', status: 'Won', type: 'SA', value: 12360, owner: 'Jordan Ashton', company: 'Hitachi Energy-PGTR', endUser: 'RWE', dueDate: '2024-12-06'},
    {id: 13, date: '2024-12-05', title: 'OCU Group -Eccles- 9x PEXLIM Q033-YV036', oppNumber: 'OPP-24-7165065', revision: 'R0', status: 'Won', type: 'SA', value: 13500, owner: 'Muhammad Abbas', company: 'OCU Group', endUser: 'Zenobe', dueDate: '2024-12-12'},
    {id: 14, date: '2025-01-20', title: 'OCU-NG-Eggborough Harmonic filters', oppNumber: 'OPP-25-7337057', revision: 'R1', status: 'Won', type: 'Harmonic Filters', value: 1146388, owner: 'James Bramwell', company: 'OCU Group', endUser: 'NG-Eggborough', dueDate: '2026-01-21'},
    {id: 15, date: '2025-02-13', title: 'NG -GAS filling kit', oppNumber: 'OPP-25-7206204', revision: 'R0', status: 'Won', type: 'LTA', value: 4067, owner: 'Sarah Baines', company: 'NGET', endUser: 'NG', dueDate: '2025-02-24'},
    {id: 16, date: '2025-02-18', title: 'Laing O\'Rourke-NGET - High Marnham-16xLTA420', oppNumber: 'OPP-25-7328716', revision: 'R0', status: 'Won', type: 'LTA', value: 6132409, owner: 'James Bramwell', company: 'Laing O\'Rourke', endUser: 'NG', dueDate: '2025-11-21'},
    {id: 17, date: '2025-03-05', title: 'Greenfrog-NGED-Ipswich Road-6xPEXLIMQ132-YV145E', oppNumber: 'OPP-25-7262974', revision: 'R1', status: 'Won', type: 'SA', value: 12000, owner: 'Muhammad Abbas', company: 'Green Frog Connect Ltd', endUser: 'NGED', dueDate: '2026-03-17'},
    {id: 18, date: '2025-03-11', title: 'SSEN Distribution-project EYZ272-12xPEXLIM Q1332-YV145E', oppNumber: 'OPP-26-7464565', revision: 'R3', status: 'Won', type: 'SA', value: 30240, owner: 'Ivan Watkinson', company: 'SSEN', endUser: 'SSEN', dueDate: '2026-03-11'},
    {id: 19, date: '2025-03-25', title: 'Balfour Beatty-Peterhead SGT Replacement', oppNumber: 'OPP-25-7204404', revision: 'R4', status: 'Won', type: 'SA', value: 66000, owner: 'James Bramwell', company: 'Balfour Beatty', endUser: 'SSEN', dueDate: '2026-03-27'},
    {id: 20, date: '2025-04-15', title: 'Green Engineering Ltd-West Burton-132kV DBB PASS M0', oppNumber: 'OPP-25-7350302', revision: 'R3', status: 'Won', type: 'PASS', value: 361250, owner: 'Warren Margolis', company: 'Green Engineering Ltd', endUser: 'NGET', dueDate: '2026-04-15'},
    {id: 21, date: '2025-05-18', title: 'TMS Grid-UKPN -Highwood solar-1xLTA145D1', oppNumber: 'OPP-25-7300565', revision: 'R0', status: 'Won', type: 'LTA', value: 100500, owner: 'Laura Churchus', company: 'TMS Grid', endUser: 'UKPN', dueDate: '2025-08-26'},
    {id: 22, date: '2025-06-10', title: 'NG-SAM 3.0 Surge counter 35Mcable', oppNumber: 'OPP-25-7265179', revision: 'R0', status: 'Won', type: 'SA', value: 4038, owner: 'Sarah Baines', company: 'NGET', endUser: 'NG', dueDate: '2025-06-27'},
    {id: 23, date: '2025-08-18', title: 'TMS Grid-UKPN -Highwood solar-1xLTA145D1', oppNumber: 'OPP-25-7300565', revision: 'R0', status: 'Won', type: 'LTA', value: 100500, owner: 'Laura Churchus', company: 'TMS Grid', endUser: 'UKPN', dueDate: '2025-08-26'},
    {id: 24, date: '2025-09-24', title: 'NGED-Rugeley substation-132kV SA\'s', oppNumber: 'OPP-25-7337127', revision: 'R0', status: 'Won', type: 'SA', value: 60480, owner: 'Omar Helal', company: 'NGED', endUser: 'NGED', dueDate: '2025-10-30'},
    {id: 25, date: '2025-09-28', title: 'Success Connnections-Qair-UKPN-LTA 145 D1', oppNumber: 'OPP-25-7263209', revision: 'R1', status: 'Won', type: 'LTA', value: 99919, owner: 'Warren Margolis', company: 'Success Connections', endUser: 'Qair-UKPN', dueDate: '2025-10-10'},
    {id: 26, date: '2025-10-16', title: 'OMEXOM-Spennymoor-132kV Disc', oppNumber: 'OPP-25-7330496', revision: 'R0', status: 'Won', type: 'DS', value: 18167, owner: 'Muhammad Abbas', company: 'OMEXOM', endUser: 'NPG', dueDate: '2025-10-23'},
    {id: 27, date: '2025-10-31', title: 'Kempston Controls-EXCOUNT-I counters -PO398582', oppNumber: 'OPP-25-7355939', revision: 'R0', status: 'Won', type: 'SA', value: 1394, owner: 'Moses Irungu', company: 'Kempston Controls', endUser: 'Unknown', dueDate: '2025-10-31'},
    {id: 28, date: '2026-01-26', title: 'Omexom-400kV UGC Replacement West Burton - Radcliffe-3x400KV SA\'s', oppNumber: 'OPP-26-7385758', revision: 'R1', status: 'Won', type: 'SA', value: 32184, owner: 'Muhammad Abbas', company: 'OMEXOM', endUser: 'MACLE', dueDate: '2026-01-27'},
    {id: 29, date: '2026-01-26', title: 'NGED-WORCESTER-66kV SA\'s- POP2661162', oppNumber: 'OPP-26-7395756', revision: 'R0', status: 'Won', type: 'SA', value: 6300, owner: 'Omar Helal', company: 'NGET', endUser: 'NG', dueDate: '2026-02-02'},
    {id: 30, date: '2026-02-04', title: 'OCU group_PO012828/ PO040977 Eccles VO-gas filling', oppNumber: 'OPP-26-7395791', revision: 'R0', status: 'Won', type: 'LTB', value: 5000, owner: 'Muhammad Abbas', company: 'OCU Group', endUser: 'Eccles', dueDate: '2026-02-11'},
];

const PRODUCTS_DATA = [
    {id: 1, name: '33kV AIS Switchgear', category: 'AIS', voltage: '33kV', specs: '3-Bay, 5-Step', status: 'Active', registered: '2024-03-15'},
    {id: 2, name: '132kV GIS Module', category: 'GIS', voltage: '132kV', specs: '2-Module, Compact', status: 'Active', registered: '2024-05-20'},
    {id: 3, name: '230kV GIS System', category: 'GIS', voltage: '230kV', specs: 'Single-Line, Advanced', status: 'Under Review', registered: '2024-08-10'},
    {id: 4, name: 'PEXLIM Q132-YV145E', category: 'SA', voltage: '132kV', specs: 'Surge Arrester', status: 'Active', registered: '2023-01-01'},
    {id: 5, name: 'TEXLIM P360-CH420E', category: 'SA', voltage: '400kV', specs: 'Surge Arrester', status: 'Active', registered: '2023-01-01'},
    {id: 6, name: 'HPL 300B1', category: 'CB', voltage: '300kV', specs: 'Circuit Breaker', status: 'Active', registered: '2023-01-01'},
    {id: 7, name: 'HPL 420B2', category: 'CB', voltage: '420kV', specs: 'Circuit Breaker', status: 'Active', registered: '2023-01-01'},
    {id: 8, name: 'LTA 145 D1', category: 'LTA', voltage: '145kV', specs: 'Live Tank Breaker', status: 'Active', registered: '2023-01-01'},
];

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 GRIDMASTER INITIALIZATION');
    console.log('='.repeat(60));
    
    console.log('\n✨ TAB DIAGNOSTICS - STARTING\n');
    
    // Immediate DOM verification before any init
    const allSections = document.querySelectorAll('section.tab-content');
    const allButtons = document.querySelectorAll('button.nav-tab');
    
    console.log(`📊 DOM STRUCTURE:`);
    console.log(`   ✓ Found ${allButtons.length} nav buttons`);
    console.log(`   ✓ Found ${allSections.length} content sections`);
    
    if (allButtons.length === 0 || allSections.length === 0) {
        console.error('❌ CRITICAL: Buttons or sections not found in DOM!');
    }
    
    console.log(`\n📋 MATCHING CHECK:`);
    let allMatch = true;
    allButtons.forEach((btn, idx) => {
        const dataTab = btn.getAttribute('data-tab');
        const section = document.querySelector(`section.tab-content[data-tab="${dataTab}"]`);
        const match = section ? '✅' : '❌';
        if (!section) allMatch = false;
        console.log(`   [${idx + 1}] Button "${dataTab}" → Section ${match}`);
    });
    
    if (allMatch) {
        console.log('\n✅ ALL BUTTONS HAVE MATCHING SECTIONS');
    } else {
        console.error('\n❌ SOME BUTTONS ARE MISSING MATCHING SECTIONS');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('Creating visible debug indicator...\n');
    
    // Call initialization after a short delay
    setTimeout(() => {
        initializeApp();
    }, 100);
});

function initializeApp() {
    try {
        console.log('🚀 Initializing GridMaster...');
        
        // FIRST: Setup tab navigation - this MUST work
        console.log('1️⃣ Setting up tab navigation...');
        setupTabNavigation();
        console.log('   ✓ Tab navigation setup complete\n');
        
        // Setup other features with error catching
        try { setupCollapsibleSections(); } catch(e) { console.warn('  ⚠️ Collapsible sections error:', e.message); }
        try { setupProductTable(); } catch(e) { console.warn('  ⚠️ Product table error:', e.message); }
        try { setupSearch(); } catch(e) { console.warn('  ⚠️ Search error:', e.message); }
        try { setupAutoCalculations(); } catch(e) { console.warn('  ⚠️ Auto calculations error:', e.message); }
        try { loadDataFromStorage(); } catch(e) { console.warn('  ⚠️ Data storage error:', e.message); }
        try { populateOpportunitiesData(); } catch(e) { console.warn('  ⚠️ Opportunities data error:', e.message); }
        try { populateDashboardMetrics(); } catch(e) { console.warn('  ⚠️ Dashboard metrics error:', e.message); }
        try { populateProductsData(); } catch(e) { console.warn('  ⚠️ Products data error:', e.message); }
        try { setupButtonEventListeners(); } catch(e) { console.warn('  ⚠️ Button listeners error:', e.message); }
        
        console.log('\n✅ GridMaster Initialization Complete!');
    } catch (error) {
        console.error('❌ CRITICAL ERROR during initialization:', error);
        alert('GridMaster failed to initialize. Check console (F12) for details.');
    }
}

// ===================================
// TAB NAVIGATION
// ===================================

function setupTabNavigation() {
    // Get all tab buttons and content sections
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log(`\n📍 TAB NAVIGATION SETUP:`);
    console.log(`   Found ${navTabs.length} nav buttons`);
    console.log(`   Found ${tabContents.length} content sections\n`);
    
    if (navTabs.length === 0 || tabContents.length === 0) {
        console.error('❌ CRITICAL: Missing tabs or content sections!');
        return;
    }
    
    // Log all buttons found
    Array.from(navTabs).forEach((btn, i) => {
        console.log(`   [${i+1}] Button: ${btn.getAttribute('data-tab')}`);
    });
    
    // Log all sections found
    Array.from(tabContents).forEach((section, i) => {
        console.log(`   [${i+1}] Section: ${section.getAttribute('data-tab')}`);
    });
    
    // Add click handler to each nav tab
    navTabs.forEach((button) => {
        button.addEventListener('click', handleTabClick);
    });
    
    console.log(`✅ Added click listeners to ${navTabs.length} tabs\n`);
    
    function handleTabClick(event) {
        // Prevent any default behavior
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        // Get the clicked button and its tab name
        const clickedButton = event.currentTarget;
        const tabName = clickedButton.getAttribute('data-tab');
        
        console.log(`🔵 CLICKED: ${tabName}`);
        
        // Step 1: Deactivate ALL buttons
        navTabs.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Step 2: Deactivate ALL content sections
        tabContents.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Step 3: Activate the clicked button
        clickedButton.classList.add('active');
        console.log(`   ✓ Button '${tabName}' activated`);
        
        // Step 4: Find and activate the matching content section
        const targetSection = Array.from(tabContents).find(section => 
            section.getAttribute('data-tab') === tabName
        );
        
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            console.log(`   ✓ Section '${tabName}' activated`);
        } else {
            console.error(`   ❌ Could not find section for '${tabName}'`);
        }
    }
}

// ===================================
// COLLAPSIBLE SECTIONS
// ===================================

function setupCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.closest('.collapsible-section');
            const isExpanded = section.classList.contains('expanded');
            
            if (isExpanded) {
                section.classList.remove('expanded');
                section.classList.add('collapsed');
            } else {
                section.classList.add('expanded');
                section.classList.remove('collapsed');
            }
            
            // Save state to localStorage
            const sectionKey = this.querySelector('h2').textContent.trim();
            const states = JSON.parse(localStorage.getItem('sectionStates') || '{}');
            states[sectionKey] = !isExpanded;
            localStorage.setItem('sectionStates', JSON.stringify(states));
        });
    });
    
    // Restore states from localStorage
    const states = JSON.parse(localStorage.getItem('sectionStates') || '{}');
    document.querySelectorAll('.collapsible-section').forEach(section => {
        const header = section.querySelector('.section-header h2');
        if (header) {
            const sectionKey = header.textContent.trim();
            if (sectionKey in states && !states[sectionKey]) {
                section.classList.remove('expanded');
                section.classList.add('collapsed');
            }
        }
    });
}

// ===================================
// PRODUCT TABLE CALCULATIONS
// ===================================

function setupProductTable() {
    const productTable = document.querySelector('.products-table');
    
    if (!productTable) return;
    
    // Add event listeners to all product rows
    document.querySelectorAll('.product-row').forEach(row => {
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                calculateProductRow(row);
                calculateTotals();
            });
        });
    });
    
    // Delete button functionality
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('.product-row');
            row.remove();
            calculateTotals();
            showNotification('Product removed from table', 'success');
        });
    });
    
    // Add Product button
    const addProductBtn = document.querySelector('.section-header .btn-small');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addNewProductRow();
        });
    }
    
    // Initial calculation
    calculateTotals();
}

function calculateProductRow(row) {
    const factoryPriceInput = row.querySelector('.factory-price');
    const marginInput = row.querySelector('.margin-percent');
    const quantityInput = row.querySelector('.quantity');
    const sellingPriceInput = row.querySelector('.selling-price');
    const totalPriceInput = row.querySelector('.total-price');
    
    if (!factoryPriceInput || !marginInput || !quantityInput) return;
    
    const factoryPrice = parseFloat(factoryPriceInput.value) || 0;
    const margin = parseFloat(marginInput.value) || 0;
    const quantity = parseFloat(quantityInput.value) || 0;
    
    // Calculate selling price: factory price * (1 + margin%)
    const sellingPrice = factoryPrice * (1 + margin / 100);
    sellingPriceInput.value = Math.round(sellingPrice);
    
    // Calculate total: selling price * quantity
    const total = sellingPrice * quantity;
    totalPriceInput.value = Math.round(total);
}

function addNewProductRow() {
    const productTable = document.querySelector('.products-table tbody');
    
    const newRow = document.createElement('tr');
    newRow.className = 'product-row';
    newRow.innerHTML = `
        <td>
            <input type="text" placeholder="Enter product name" class="product-input">
        </td>
        <td>
            <input type="text" placeholder="Enter description" class="product-input">
        </td>
        <td>
            <input type="number" value="0" class="product-input factory-price">
        </td>
        <td>
            <input type="number" value="0" class="product-input margin-percent" min="0" max="100">
        </td>
        <td>
            <input type="number" value="1" class="product-input quantity">
        </td>
        <td>
            <input type="number" value="0" class="product-input selling-price" readonly>
        </td>
        <td>
            <input type="number" value="0" class="product-input total-price" readonly>
        </td>
        <td><button class="btn-link btn-delete">Delete</button></td>
    `;
    
    productTable.appendChild(newRow);
    
    // Setup event listeners for new row
    const inputs = newRow.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateProductRow(newRow);
            calculateTotals();
        });
    });
    
    // Setup delete button
    newRow.querySelector('.btn-delete').addEventListener('click', function(e) {
        e.preventDefault();
        newRow.remove();
        calculateTotals();
        showNotification('Product removed from table', 'success');
    });
    
    showNotification('New product row added', 'success');
}

function calculateTotals() {
    const productRows = document.querySelectorAll('.product-row');
    let subtotal = 0;
    
    productRows.forEach(row => {
        const totalInput = row.querySelector('.total-price');
        if (totalInput) {
            subtotal += parseFloat(totalInput.value) || 0;
        }
    });
    
    // Tax calculation (18% GST for India)
    const tax = subtotal * 0.18;
    const grandTotal = subtotal + tax;
    
    // Update display
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const grandTotalEl = document.getElementById('grand-total');
    
    if (subtotalEl) subtotalEl.textContent = '₹' + formatNumber(Math.round(subtotal));
    if (taxEl) taxEl.textContent = '₹' + formatNumber(Math.round(tax));
    if (grandTotalEl) grandTotalEl.textContent = '₹' + formatNumber(Math.round(grandTotal));
}

// ===================================
// SEARCH & FILTER FUNCTIONALITY
// ===================================

function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableContainer = this.closest('.tab-content').querySelector('.table-container');
            
            if (!tableContainer) return;
            
            const rows = tableContainer.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    });
}

// ===================================
// AUTO-CALCULATIONS
// ===================================

function setupAutoCalculations() {
    // All calculations are done in setupProductTable and calculateTotals
}

// ===================================
// SAVE FUNCTIONALITY
// ===================================

function setupSaveDraft() {
    const saveDraftBtn = document.querySelector('.btn-secondary:first-of-type');
    
    if (saveDraftBtn && saveDraftBtn.textContent.includes('Save Draft')) {
        saveDraftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveFCMSheetDraft();
        });
    }
}

function saveFCMSheetDraft() {
    const draftData = {
        timestamp: new Date().toISOString(),
        customer: {
            company: document.querySelector('input[placeholder*="company name"]')?.value || '',
            name: document.querySelector('input[placeholder*="customer name"]')?.value || '',
            email: document.querySelector('input[placeholder*="customer email"]')?.value || '',
            phone: document.querySelector('input[placeholder*="customer phone"]')?.value || ''
        },
        engineer: {
            name: document.querySelector('input[placeholder*="engineer name"]')?.value || '',
            email: document.querySelector('input[placeholder*="engineer email"]')?.value || '',
            phone: document.querySelector('input[placeholder*="engineer phone"]')?.value || ''
        },
        quotation: {
            opportunityNumber: document.querySelector('input[placeholder*="OPP"]')?.value || '',
            projectName: document.querySelector('input[placeholder*="project name"]')?.value || '',
            endUser: document.querySelector('input[placeholder*="end user"]')?.value || '',
            accountManager: document.querySelector('input[placeholder*="account manager"]')?.value || ''
        },
        products: []
    };
    
    // Get product data
    document.querySelectorAll('.product-row').forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length >= 7) {
            draftData.products.push({
                product: inputs[0].value,
                description: inputs[1].value,
                factoryPrice: inputs[2].value,
                margin: inputs[3].value,
                quantity: inputs[4].value,
                sellingPrice: inputs[5].value,
                total: inputs[6].value
            });
        }
    });
    
    // Save to localStorage
    localStorage.setItem('fcmSheetDraft', JSON.stringify(draftData));
    showNotification('Draft saved successfully!', 'success');
}

function loadDataFromStorage() {
    const draft = localStorage.getItem('fcmSheetDraft');
    if (draft) {
        const data = JSON.parse(draft);
        // You can restore data here if needed
    }
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// UTILITY FUNCTIONS
// ===================================

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatCurrency(num) {
    return '₹' + formatNumber(Math.round(num));
}

// ===================================
// EVENT LISTENERS FOR BUTTONS
// ===================================

function setupButtonEventListeners() {
    // Save Draft button
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.includes('Save Draft')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                saveFCMSheetDraft();
            });
        }
        
        // Preview Offer button
        if (btn.textContent.includes('Preview Offer')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                previewOffer();
            });
        }
        
        // Generate Offer button
        if (btn.textContent.includes('Generate Offer')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                generateOffer();
            });
        }
        
        // New Opportunity button
        if (btn.textContent.includes('New Opportunity')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('New opportunity form would open here', 'info');
            });
        }
        
        // New Project, Register Product, etc.
        if (btn.textContent.includes('New Project')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('New project form would open here', 'info');
            });
        }
        
        if (btn.textContent.includes('Register Product')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Product registration form would open here', 'info');
            });
        }
        
        if (btn.textContent.includes('Analyze Tender')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Tender analysis form created', 'success');
            });
        }
        
        // AI Features buttons
        if (btn.textContent.includes('Launch Tool')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.closest('.ai-card').querySelector('h3').textContent;
                showNotification(`${title} would launch here (Placeholder)`, 'info');
            });
        }
    });
    
    // Approval Action Buttons
    document.querySelectorAll('.approval-actions .btn').forEach(btn => {
        if (btn.textContent.includes('Approve')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.approval-card');
                const header = card.querySelector('.approval-header');
                const badge = header.querySelector('.badge');
                badge.textContent = 'Approved';
                badge.className = 'badge badge-success';
                showNotification('Approval granted', 'success');
            });
        }
        
        if (btn.textContent.includes('Reject')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.approval-card');
                const header = card.querySelector('.approval-header');
                const badge = header.querySelector('.badge');
                badge.textContent = 'Rejected';
                badge.className = 'badge badge-danger';
                showNotification('Request rejected', 'success');
            });
        }
        
        if (btn.textContent.includes('Request Changes')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Change request sent to requestor', 'info');
            });
        }
    });
}

// ===================================
// PREVIEW & GENERATE OFFER
// ===================================

function previewOffer() {
    // Call the preview function from offer-pdf-generator.js
    if (typeof generateOfferFromFCMSheet !== 'function') {
        showNotification('Preview service not loaded. Please refresh the page.', 'error');
        return;
    }
    
    try {
        // Extract and map the data
        const fcmData = extractFCMFormData();
        if (!fcmData.products || fcmData.products.length === 0) {
            showNotification('Please add at least one product before previewing an offer.', 'error');
            return;
        }
        
        const customerOffer = mapFCMToCustomerOffer(fcmData);
        previewOfferModal(customerOffer);
    } catch (error) {
        showNotification(`Error previewing offer: ${error.message}`, 'error');
    }
}

function generateOffer() {
    // Call the comprehensive PDF generation function from offer-pdf-generator.js
    if (typeof generateOfferFromFCMSheet === 'function') {
        generateOfferFromFCMSheet();
    } else {
        showNotification('PDF generation service not loaded. Please refresh the page.', 'error');
    }
}

// ===================================
// RESPONSIVE MENU (Mobile)
// ===================================

function setupResponsiveMenu() {
    // Add mobile menu functionality if needed
    const headerNav = document.querySelector('.header-nav');
    
    if (window.innerWidth <= 768) {
        // Mobile-specific setup
    }
}

window.addEventListener('resize', function() {
    setupResponsiveMenu();
});

// ===================================
// DARK MODE (Already implemented in CSS)
// ===================================

// Initialize dark mode on load
document.body.style.colorScheme = 'dark';

// ===================================
// KEYBOARD SHORTCUTS
// ===================================

document.addEventListener('keydown', function(event) {
    // Ctrl+S to save draft
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab?.getAttribute('data-tab') === 'fcm-sheet') {
            saveFCMSheetDraft();
        }
    }
    
    // Escape to close any modals (if implemented)
    if (event.key === 'Escape') {
        // Handle escape key
    }
});

// ===================================
// THEME CUSTOMIZATION
// ===================================

function setTheme(themeName) {
    const themes = {
        dark: {
            '--bg-primary': '#0F172A',
            '--bg-cards': '#1E293B',
            '--bg-panels': '#334155',
            '--text-primary': '#F8FAFC'
        },
        light: {
            '--bg-primary': '#F8FAFC',
            '--bg-cards': '#F1F5F9',
            '--bg-panels': '#E2E8F0',
            '--text-primary': '#0F172A'
        }
    };
    
    if (themes[themeName]) {
        Object.entries(themes[themeName]).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
        localStorage.setItem('theme', themeName);
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// ===================================
// DATA EXPORT FUNCTIONALITY
// ===================================

function exportTableToCSV(tableName) {
    const table = document.querySelector(tableName);
    if (!table) return;
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        let csvRow = [];
        
        cols.forEach(col => {
            let text = col.textContent.trim();
            // Escape quotes and wrap in quotes if contains comma
            text = text.replace(/"/g, '""');
            if (text.includes(',')) {
                text = `"${text}"`;
            }
            csvRow.push(text);
        });
        
        csv.push(csvRow.join(','));
    });
    
    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `${tableName}-export.csv`);
    link.click();
}

// ===================================
// PRINT FUNCTIONALITY
// ===================================

function printContent(elementId) {
    const printWindow = window.open('', '', 'height=400,width=800');
    const element = document.getElementById(elementId);
    
    if (element) {
        printWindow.document.write(element.innerHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
}

// ===================================
// FORM VALIDATION
// ===================================

function validateForm(formData) {
    const errors = [];
    
    if (!formData.company) errors.push('Company name is required');
    if (!formData.name) errors.push('Customer name is required');
    if (!formData.email) errors.push('Email is required');
    if (!formData.projectName) errors.push('Project name is required');
    
    return errors;
}

// ===================================
// DYNAMIC DATA LOADING
// ===================================

function loadDashboardData() {
    // In a real application, this would fetch data from an API
    const dashboardData = {
        opportunities: 14,
        offers: 23,
        winRate: 62,
        revenue: 28000000,
        pipeline: 52000000
    };
    
    return dashboardData;
}

// ===================================
// CHART GENERATION (Future Enhancement)
// ===================================

function generateChart(chartType, data, elementId) {
    // This is a placeholder for chart generation
    // In a real application, use Chart.js or similar library
    console.log(`Generating ${chartType} chart with data:`, data);
}

// ===================================
// REAL-TIME UPDATES
// ===================================

function setupRealtimeUpdates() {
    // In a real application, use WebSockets or polling
    // This is a placeholder for real-time functionality
    
    setInterval(() => {
        // Check for updates every 30 seconds
        // updateDashboard();
    }, 30000);
}

// Initialize real-time updates
setupRealtimeUpdates();

// ===================================
// DATA POPULATION FUNCTIONS
// ===================================

function populateOpportunitiesData() {
    const opportunitiesTab = document.querySelector('[data-tab="opportunities"]');
    if (!opportunitiesTab) return;
    
    const tbody = opportunitiesTab.querySelector('tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add all opportunities
    OPPORTUNITIES_DATA.forEach(opp => {
        const row = document.createElement('tr');
        const statusClass = opp.status.toLowerCase().replace(' ', '-');
        
        row.innerHTML = `
            <td>${opp.oppNumber}</td>
            <td>${opp.title}</td>
            <td>${opp.company}</td>
            <td>₹${formatNumber(opp.value)}</td>
            <td><span class="badge badge-${getStatusBadgeClass(opp.status)}">${opp.status}</span></td>
            <td>${formatDate(opp.dueDate)}</td>
            <td>${opp.owner}</td>
            <td><button class="btn-link">View</button></td>
        `;
        
        tbody.appendChild(row);
    });
    
    setupSearch();
}

function populateDashboardMetrics() {
    // Calculate real metrics from opportunities data
    const total = OPPORTUNITIES_DATA.length;
    const won = OPPORTUNITIES_DATA.filter(o => o.status === 'Won').length;
    const lost = OPPORTUNITIES_DATA.filter(o => o.status === 'Lost').length;
    const submitted = OPPORTUNITIES_DATA.filter(o => o.status === 'Submitted').length;
    const won_value = OPPORTUNITIES_DATA.filter(o => o.status === 'Won').reduce((sum, o) => sum + o.value, 0);
    const total_value = OPPORTUNITIES_DATA.reduce((sum, o) => sum + o.value, 0);
    const winRate = ((won / total) * 100).toFixed(1);
    
    // Revenue this year (estimated active deals)
    const activeRevenue = (won_value / 100000).toFixed(1);
    const pipelineValue = (total_value / 100000).toFixed(1);
    
    // Update metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    if (metricCards.length >= 5) {
        // Open Opportunities
        metricCards[0].querySelector('.metric-value').textContent = submitted;
        
        // Submitted Offers
        metricCards[1].querySelector('.metric-value').textContent = submitted;
        
        // Win Rate
        metricCards[2].querySelector('.metric-value').textContent = winRate + '%';
        
        // Revenue Generated
        metricCards[3].querySelector('.metric-value').textContent = '₹' + (won_value / 10000000).toFixed(1) + 'Cr';
        
        // Pipeline Value
        metricCards[4].querySelector('.metric-value').textContent = '₹' + (total_value / 10000000).toFixed(1) + 'Cr';
    }
    
    // Update status distribution chart
    updateStatusChart(won, lost, submitted, OPPORTUNITIES_DATA.filter(o => o.status === 'Revalidated').length);
}

function populateProductsData() {
    const productsTab = document.querySelector('[data-tab="product-registrations"]');
    if (!productsTab) return;
    
    const tbody = productsTab.querySelector('tbody');
    if (!tbody) return;
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add all products
    PRODUCTS_DATA.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>PROD-${product.id.toString().padStart(3, '0')}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.voltage}</td>
            <td>${product.specs}</td>
            <td><span class="badge badge-success">${product.status}</span></td>
            <td>${formatDate(product.registered)}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    setupSearch();
}

function getStatusBadgeClass(status) {
    switch(status.toLowerCase()) {
        case 'won': return 'success';
        case 'submitted': return 'info';
        case 'lost': return 'danger';
        case 'revalidated': return 'warning';
        case 'negotiation': return 'info';
        case 'cancelled': return 'danger';
        default: return 'info';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' });
}

function updateStatusChart(won, lost, submitted, revalidated) {
    const dashboard = document.querySelector('[data-tab="dashboard"]');
    if (!dashboard) return;
    
    // Update pie chart visualization
    const chartPlaceholder = dashboard.querySelector('.chart-placeholder');
    if (chartPlaceholder && chartPlaceholder.querySelector('canvas')) {
        const canvas = chartPlaceholder.querySelector('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawPieChart(ctx, [won, lost, submitted, revalidated], 
                        ['Won (Green)', 'Lost (Red)', 'Submitted (Blue)', 'Revalidated (Orange)']);
        }
    }
}

function drawPieChart(ctx, data, labels) {
    const total = data.reduce((a, b) => a + b, 0);
    const colors = ['#22C55E', '#EF4444', '#3B82F6', '#F59E0B'];
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
}

// ===================================
// FEATURE COMPLETE INITIALIZATION
// ===================================

console.log('GridMaster Application Initialized Successfully');
console.log('Version: 1.0.0 - With Real Sales Data');
console.log('Features: Opportunities, Dashboard, FCM Sheet, Projects, Products, Approvals, Tender Analysis, AI Features, Reference');
console.log('Sample Data Loaded: 30 Opportunities, 8 Products');

// ===================================
// DIAGNOSTIC UTILITIES (for troubleshooting)
// ===================================

/**
 * Run tab diagnostics to verify all tabs are working
 * Call this from console: runTabDiagnostics()
 */
window.runTabDiagnostics = function() {
    console.clear();
    console.log('🔍 RUNNING TAB DIAGNOSTICS...\n');
    
    // Check all nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    console.log(`✓ Found ${navTabs.length} navigation tabs:`);
    navTabs.forEach(tab => {
        const dataTab = tab.getAttribute('data-tab');
        const content = document.querySelector(`.tab-content[data-tab="${dataTab}"]`);
        const exists = content ? '✅' : '❌';
        console.log(`  ${exists} ${dataTab} → ${content ? 'FOUND' : 'MISSING'}`);
    });
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Check all content sections
    const contentSections = document.querySelectorAll('.tab-content');
    console.log(`✓ Found ${contentSections.length} content sections:`);
    contentSections.forEach(section => {
        const dataTab = section.getAttribute('data-tab');
        const isActive = section.classList.contains('active') ? '🟢' : '⚪';
        const display = window.getComputedStyle(section).display;
        console.log(`  ${isActive} ${dataTab} | display: ${display} | hasContent: ${section.innerHTML.length > 50 ? 'YES' : 'NO'}`);
    });
    
    console.log('\n' + '='.repeat(50) + '\n');
    console.log('✨ DIAGNOSTICS COMPLETE');
    console.log('Try clicking a tab and check the detailed logs above ☝️');
};

/**
 * Automatically test all tabs by clicking each one sequentially
 * Call this from console: autoTestAllTabs()
 */
window.autoTestAllTabs = function() {
    console.clear();
    console.log('🧪 STARTING AUTOMATIC TAB TEST...\n');
    
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabNames = Array.from(navTabs).map(tab => tab.getAttribute('data-tab'));
    
    console.log(`Testing ${tabNames.length} tabs: ${tabNames.join(', ')}\n`);
    
    let currentTest = 0;
    
    const testNextTab = () => {
        if (currentTest >= tabNames.length) {
            console.log('\n✅ ALL TESTS COMPLETE!');
            return;
        }
        
        const tabName = tabNames[currentTest];
        const btn = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
        const section = document.querySelector(`.tab-content[data-tab="${tabName}"]`);
        
        console.log(`\n📋 Test ${currentTest + 1}/${tabNames.length}: "${tabName}"`);
        console.log(`   Button found: ${btn ? '✅' : '❌'}`);
        console.log(`   Section found: ${section ? '✅' : '❌'}`);
        
        if (btn) {
            console.log(`   Clicking button...`);
            btn.click();
            
            // Check results after click
            setTimeout(() => {
                const isButtonActive = btn.classList.contains('active');
                const isSectionActive = section ? section.classList.contains('active') : false;
                const display = section ? window.getComputedStyle(section).display : 'N/A';
                
                console.log(`   ✓ Button active: ${isButtonActive ? '✅' : '❌'}`);
                console.log(`   ✓ Section active: ${isSectionActive ? '✅' : '❌'}`);
                console.log(`   ✓ Display style: ${display}`);
                
                currentTest++;
                testNextTab();
            }, 300);
        } else {
            currentTest++;
            testNextTab();
        }
    };
    
    testNextTab();
};

// Run diagnostics on page load
console.log('💡 Tip: Run "runTabDiagnostics()" in console to verify all tabs');

