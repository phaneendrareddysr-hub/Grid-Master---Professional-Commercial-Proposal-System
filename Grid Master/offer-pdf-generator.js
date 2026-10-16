/* ===================================
   COMMERCIAL OFFER - PDF GENERATOR
   Extracts FCM data, maps to customer offer, generates PDF
   ==================================== */

/**
 * Extract FCM Sheet form data and convert to offer format
 * @returns {Object} FCM Data from form fields
 */
function extractFCMFormData() {
    const getFCMValue = (selector) => {
        const elem = document.querySelector(selector);
        return elem ? elem.value : '';
    };

    // Extract customer info
    const customerInfo = {
        company: document.querySelector('.cust-company')?.value || getFCMValue('input[placeholder*="company name"]'),
        customerName: document.querySelector('.cust-name')?.value || getFCMValue('input[placeholder*="customer name"]'),
        customerEmail: document.querySelector('.cust-email')?.value || getFCMValue('input[placeholder*="email"]'),
        customerPhone: document.querySelector('.cust-phone')?.value || getFCMValue('input[placeholder*="phone number"]')
    };

    // Project & Requirements Context
    const projectInfo = {
        projectName: document.querySelector('.proj-name')?.value || getFCMValue('input[placeholder*="project name"]'),
        endUser: document.querySelector('.proj-enduser')?.value || getFCMValue('input[placeholder*="end user"]'),
        industry: document.querySelector('.proj-industry')?.value || '',
        projectType: document.querySelector('.proj-type')?.value || '',
        location: document.querySelector('.proj-location')?.value || '',
        voltageLevel: document.querySelector('.proj-voltage')?.value || '',
        mainRequirement: document.querySelector('.proj-requirement')?.value || '',
        application: document.querySelector('.proj-application')?.value || '',
        deliveryDate: document.querySelector('.proj-delivery')?.value || '',
        specialRequirements: document.querySelector('.proj-special')?.value || '',
        priorities: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
    };

    // Executive Summary
    const executiveSummary = {
        headline: document.querySelector('.exec-headline')?.value || '',
        summary: document.querySelector('.exec-summary')?.value || '',
        valueProposition: document.querySelector('.exec-value')?.value || '',
        benefits: (document.querySelector('.exec-benefits')?.value || '').split('\n').filter(b => b.trim()) || []
    };

    // Tendering Engineer
    const tenderingEngineer = {
        name: document.querySelector('.eng-name')?.value || '',
        email: document.querySelector('.eng-email')?.value || '',
        phone: document.querySelector('.eng-phone')?.value || ''
    };

    // Quotation Information
    const quotationInfo = {
        opportunityNumber: document.querySelector('.quot-oppnumber')?.value || getFCMValue('input[placeholder*="OPP-"]'),
        revision: document.querySelector('.quot-revision')?.value || '',
        accountManager: document.querySelector('.quot-manager')?.value || '',
        tcTemplate: document.querySelector('.quot-tctemplate')?.value || 'Standard 2024',
        discount: parseFloat(document.querySelector('.comm-discount')?.value || 0),
        freight: parseFloat(document.querySelector('.comm-freight')?.value || 0),
        installation: parseFloat(document.querySelector('.comm-installation')?.value || 0),
        priceValidity: parseInt(document.querySelector('.comm-validity')?.value || 30),
        priceBasis: document.querySelector('.comm-basis')?.value || ''
    };

    // Commercial Terms
    const commercialTerms = {
        offerValidity: parseInt(document.querySelector('.terms-validity')?.value || 30),
        deliveryPeriod: parseInt(document.querySelector('.terms-delivery')?.value || 16),
        paymentTerms: document.querySelector('.terms-payment')?.value || '',
        warrantyPeriod: parseInt(document.querySelector('.terms-warranty')?.value || 24),
        installationResponsibility: document.querySelector('.terms-installation')?.value || '',
        testingScope: document.querySelector('.terms-testing')?.value || '',
        trainingIncluded: document.querySelector('.terms-training')?.value || '',
        documentation: document.querySelector('.terms-documentation')?.value || '',
        includedServices: document.querySelector('.terms-included')?.value || '',
        exclusions: document.querySelector('.terms-excluded')?.value || '',
        assumptions: document.querySelector('.terms-assumptions')?.value || ''
    };

    // Notes - Separated by Type (SECURITY: internal notes will NOT go to customer PDF)
    const notes = {
        customerFacing: document.querySelector('.notes-customer')?.value || '',
        internal: document.querySelector('.notes-internal')?.value || '',
        commercial: document.querySelector('.notes-commercial')?.value || '',
        technical: document.querySelector('.notes-technical')?.value || ''
    };

    // Extract Products from table
    const products = [];
    document.querySelectorAll('.product-row').forEach(row => {
        const textInputs = row.querySelectorAll('input[type="text"]');
        const numberInputs = row.querySelectorAll('input[type="number"]');
        const selects = row.querySelectorAll('select');
        
        if (textInputs[0]?.value?.trim()) {
            products.push({
                name: textInputs[0]?.value || '',
                description: textInputs[1]?.value || '',
                category: selects[0]?.value || '',
                scopeStatus: selects[1]?.value || 'Included',
                quantity: parseFloat(numberInputs[0]?.value) || 1,
                factoryPrice: parseFloat(numberInputs[1]?.value) || 0,
                marginPercent: parseFloat(numberInputs[2]?.value) || 0,
                sellingPrice: parseFloat(numberInputs[3]?.value) || 0,
                total: parseFloat(numberInputs[4]?.value) || 0
            });
        }
    });

    // Calculate totals
    const includedProducts = products.filter(p => p.scopeStatus === 'Included' || !p.scopeStatus);
    const optionalProducts = products.filter(p => p.scopeStatus === 'Optional');
    
    const subtotal = includedProducts.reduce((sum, p) => sum + p.total, 0);
    const subtotalOptional = optionalProducts.reduce((sum, p) => sum + p.total, 0);
    const subtotalBeforeTax = subtotal + quotationInfo.freight + quotationInfo.installation;
    const discountAmount = subtotalBeforeTax * (quotationInfo.discount / 100);
    const subtotalAfterDiscount = subtotalBeforeTax - discountAmount;
    const tax = subtotalAfterDiscount * 0.18; // 18% GST
    const grandTotal = subtotalAfterDiscount + tax;

    return {
        customerInfo,
        projectInfo,
        executiveSummary,
        tenderingEngineer,
        quotationInfo,
        commercialTerms,
        notes,
        products,
        includedProducts,
        optionalProducts,
        financials: {
            subtotal,
            subtotalOptional,
            discount: quotationInfo.discount,
            discountAmount,
            freight: quotationInfo.freight,
            installation: quotationInfo.installation,
            subtotalBeforeTax,
            subtotalAfterDiscount,
            tax,
            grandTotal,
            taxRate: 18,
            currency: 'INR'
        }
    };
}

/**
 * Map FCM data to customer-safe commercial offer
 * SECURITY: Filters out internal pricing, margins, costs, factory prices, internal notes
 * @param {Object} fcmData - Raw FCM form data
 * @returns {Object} CustomerCommercialOffer (safe for customer viewing)
 */
function mapFCMToCustomerOffer(fcmData) {
    if (!fcmData || !fcmData.products) {
        return null;
    }

    // SECURITY: Only map "Included" and "Optional" products to customer offer (filter out "Excluded" and internal items)
    const customerProducts = fcmData.products
        .filter(p => p.scopeStatus !== 'Excluded' && p.scopeStatus !== 'To Be Finalized')
        .map(p => ({
            name: sanitizeHTML(p.name),
            description: sanitizeHTML(p.description),
            category: p.category, // For grouping in PDF
            scopeStatus: p.scopeStatus || 'Included',
            quantity: p.quantity,
            unitPrice: p.sellingPrice, // SECURITY: Only customer-facing price (NOT factory price or margin)
            total: p.total,
            // DO NOT INCLUDE: factoryPrice, marginPercent - these are internal only
            currency: 'INR'
        }));

    // Security: Only include customer-safe fields
    const customerOffer = {
        metadata: {
            offerNumber: `OFFER-${fcmData.quotationInfo.opportunityNumber || Date.now()}`,
            offerDate: new Date().toLocaleDateString('en-IN'),
            validUntil: new Date(Date.now() + (fcmData.commercialTerms.offerValidity * 24 * 60 * 60 * 1000)).toLocaleDateString('en-IN'),
            currency: 'INR'
        },
        customer: {
            company: fcmData.customerInfo.company || 'Valued Customer',
            contactPerson: fcmData.customerInfo.customerName || '',
            email: fcmData.customerInfo.customerEmail || '',
            phone: fcmData.customerInfo.customerPhone || '',
            endUser: fcmData.projectInfo.endUser || ''
        },
        project: {
            projectName: fcmData.projectInfo.projectName || fcmData.customerInfo.company || 'Commercial Offer',
            opportunityNumber: fcmData.quotationInfo.opportunityNumber || '',
            revision: fcmData.quotationInfo.revision || 'Rev 1.0',
            // Include ALL customer-safe project context
            endUser: fcmData.projectInfo.endUser || '',
            industry: fcmData.projectInfo.industry || '',
            projectType: fcmData.projectInfo.projectType || '',
            location: fcmData.projectInfo.location || '',
            voltageLevel: fcmData.projectInfo.voltageLevel || '',
            mainRequirement: fcmData.projectInfo.mainRequirement || '',
            application: fcmData.projectInfo.application || '',
            deliveryDate: fcmData.projectInfo.deliveryDate || '',
            priorities: fcmData.projectInfo.priorities || [],
            specialRequirements: fcmData.projectInfo.specialRequirements || ''
        },
        // SECURITY: Only include customer-visible products and prices
        products: customerProducts,
        includedProducts: customerProducts.filter(p => p.scopeStatus === 'Included' || p.scopeStatus === ''),
        optionalProducts: customerProducts.filter(p => p.scopeStatus === 'Optional'),
        commercials: {
            subtotal: fcmData.financials.subtotal,
            subtotalOptional: fcmData.financials.subtotalOptional,
            discount: fcmData.financials.discount,
            discountAmount: fcmData.financials.discountAmount,
            freight: fcmData.financials.freight,
            installation: fcmData.financials.installation,
            subtotalBeforeTax: fcmData.financials.subtotalBeforeTax,
            subtotalAfterDiscount: fcmData.financials.subtotalAfterDiscount,
            tax: fcmData.financials.tax,
            taxRate: fcmData.financials.taxRate,
            grandTotal: fcmData.financials.grandTotal
        },
        // SECURITY: Only include customer-facing notes (NOT internal notes or commercial instructions)
        notes: sanitizeHTML(fcmData.notes.customerFacing || ''),
        executiveSummary: fcmData.executiveSummary,
        commercialTerms: {
            offerValidity: fcmData.commercialTerms.offerValidity,
            deliveryPeriod: fcmData.commercialTerms.deliveryPeriod,
            paymentTerms: fcmData.commercialTerms.paymentTerms,
            warrantyPeriod: fcmData.commercialTerms.warrantyPeriod,
            training: fcmData.commercialTerms.trainingIncluded,
            documentation: fcmData.commercialTerms.documentation
            // DO NOT INCLUDE: internal notes, commercial instructions
        },
        termsTemplate: fcmData.quotationInfo.tcTemplate || 'Standard 2024'
    };

    return customerOffer;
}

/**
 * Sanitize text to prevent XSS
 * @param {string} text - Text to sanitize
 * @returns {string} Safe text
 */
function sanitizeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format number as Indian currency (₹) with proper Indian numbering system
 * Examples: ₹31,25,000 or ₹1,26,90,000 (NOT ₹31,25,00,000)
 * @param {number} num - Number to format
 * @returns {string} Formatted currency string
 */
function formatIndianCurrency(num) {
    if (!num && num !== 0) return '₹0';
    
    // Convert to integer
    const n = Math.round(num);
    if (n === 0) return '₹0';
    
    // Convert to string and reverse for easier processing
    const str = n.toString();
    let result = '';
    
    // Process from right to left
    // Indian system: rightmost 3 digits, then 2-digit groups
    // Examples: 1234567 -> 12,34,567 and 123456789 -> 1,23,45,67,89
    
    for (let i = str.length - 1, count = 0; i >= 0; i--, count++) {
        if (count > 0) {
            if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
                result = ',' + result;
            }
        }
        result = str[i] + result;
    }
    
    return '₹' + result;
}

/**
 * Generate professional HTML for the offer document
 * Creates a customer-ready PDF-friendly HTML with multiple sections
 * @param {Object} customerOffer - Customer-safe offer object
 * @returns {string} HTML string of the offer
 */
function generateOfferHTML(customerOffer) {
    if (!customerOffer) {
        return '<h2>Error: Could not generate offer. Please check form data.</h2>';
    }

    // Generate product rows grouped by scope status
    const includedRows = customerOffer.includedProducts.map(p => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #d0d0d0;">
                <strong>${sanitizeHTML(p.name)}</strong><br>
                <small style="color: #666;">${sanitizeHTML(p.description)}</small>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #d0d0d0; text-align: center; font-weight: 500;">
                ${p.quantity}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 500;">
                ${formatIndianCurrency(p.unitPrice)}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #d0d0d0; text-align: right; font-weight: 600;">
                ${formatIndianCurrency(p.total)}
            </td>
        </tr>
    `).join('');

    const optionalRows = customerOffer.optionalProducts.map(p => `
        <tr style="background: #f9f9f9;">
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; color: #555;">
                <em>${sanitizeHTML(p.name)}</em><br>
                <small style="color: #888;">${sanitizeHTML(p.description)}</small>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center; color: #555;">
                ${p.quantity}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #555;">
                ${formatIndianCurrency(p.unitPrice)}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: right; color: #555;">
                ${formatIndianCurrency(p.total)}
            </td>
        </tr>
    `).join('');

    // Build comprehensive customer requirements section
    const requirementsSection = (customerOffer.project.projectType || customerOffer.project.industry) ? `
        <div style="page-break-inside: avoid; margin: 30px 0; background: #f5f5f5; padding: 20px; border-radius: 6px;">
            <h3 style="color: #1a3a52; margin-bottom: 15px; text-transform: uppercase; font-size: 14px; border-bottom: 2px solid #0066cc; padding-bottom: 8px;">
                Understanding of Customer Requirements
            </h3>
            
            <!-- Project Context Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
                ${customerOffer.project.industry ? `
                <div>
                    <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Industry/Segment:</p>
                    <p style="font-size: 12px; color: #555;">${sanitizeHTML(customerOffer.project.industry)}</p>
                </div>
                ` : ''}
                ${customerOffer.project.projectType ? `
                <div>
                    <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Project Type:</p>
                    <p style="font-size: 12px; color: #555;">${sanitizeHTML(customerOffer.project.projectType)}</p>
                </div>
                ` : ''}
                ${customerOffer.project.location ? `
                <div>
                    <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Location:</p>
                    <p style="font-size: 12px; color: #555;">${sanitizeHTML(customerOffer.project.location)}</p>
                </div>
                ` : ''}
                ${customerOffer.project.voltageLevel ? `
                <div>
                    <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Voltage Level:</p>
                    <p style="font-size: 12px; color: #555;">${sanitizeHTML(customerOffer.project.voltageLevel)}</p>
                </div>
                ` : ''}
                ${customerOffer.project.application ? `
                <div>
                    <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Application:</p>
                    <p style="font-size: 12px; color: #555;">${sanitizeHTML(customerOffer.project.application)}</p>
                </div>
                ` : ''}
                ${customerOffer.project.deliveryDate ? `
                <div>
                    <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Delivery Required:</p>
                    <p style="font-size: 12px; color: #555;">${customerOffer.project.deliveryDate}</p>
                </div>
                ` : ''}
            </div>
            
            <!-- Customer Priorities -->
            ${customerOffer.project.priorities && customerOffer.project.priorities.length > 0 ? `
            <div style="margin-top: 15px;">
                <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 8px; text-transform: uppercase;">Customer Priorities:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${customerOffer.project.priorities.map(p => `
                    <span style="background: #e3f2fd; color: #1a3a52; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 500;">
                        ✓ ${sanitizeHTML(p)}
                    </span>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <!-- Special Requirements -->
            ${customerOffer.project.specialRequirements ? `
            <div style="margin-top: 15px;">
                <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Special Requirements:</p>
                <p style="font-size: 12px; color: #555; line-height: 1.6; background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #0066cc;">
                    ${sanitizeHTML(customerOffer.project.specialRequirements)}
                </p>
            </div>
            ` : ''}
        </div>
    ` : '';

    // Build executive summary section if available
    const executiveSection = (customerOffer.executiveSummary && (customerOffer.executiveSummary.summary || customerOffer.executiveSummary.headline)) ? `
        <div style="page-break-inside: avoid; margin: 30px 0; background: linear-gradient(to right, #e8f2f7, #f5fafc); padding: 20px; border-left: 4px solid #0066cc; border-radius: 4px;">
            <h3 style="color: #1a3a52; margin-bottom: 12px; text-transform: uppercase; font-size: 14px; font-weight: bold;">
                Executive Summary
            </h3>
            ${customerOffer.executiveSummary.headline ? `<h4 style="color: #0066cc; margin-bottom: 10px; font-size: 13px; font-weight: 600;">${sanitizeHTML(customerOffer.executiveSummary.headline)}</h4>` : ''}
            <p style="font-size: 12px; line-height: 1.7; color: #333; margin-bottom: 12px;">
                ${sanitizeHTML(customerOffer.executiveSummary.summary)}
            </p>
            ${customerOffer.executiveSummary.valueProposition ? `
            <div style="background: white; padding: 12px; border-radius: 4px; margin-bottom: 12px; border-left: 3px solid #0066cc;">
                <p style="font-size: 11px; font-weight: bold; color: #1a3a52; margin-bottom: 6px;">VALUE PROPOSITION:</p>
                <p style="font-size: 12px; color: #555;">${sanitizeHTML(customerOffer.executiveSummary.valueProposition)}</p>
            </div>
            ` : ''}
            ${customerOffer.executiveSummary.benefits && customerOffer.executiveSummary.benefits.length > 0 ? `
                <div style="margin-top: 12px;">
                    <p style="font-size: 11px; font-weight: bold; color: #1a3a52; margin-bottom: 8px;">KEY BENEFITS:</p>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${customerOffer.executiveSummary.benefits.slice(0, 8).map(b => `
                        <li style="font-size: 12px; color: #555; margin: 6px 0; line-height: 1.5;">
                            ${sanitizeHTML(b)}
                        </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    ` : '';

    // Build pricing summary section
    const pricingSummary = `
        <div style="page-break-inside: avoid; margin: 30px 0;">
            <div class="totals-container" style="margin-left: auto; width: 420px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 1px solid #d0d0d0; font-size: 12px;">
                    <span style="text-align: left;">Base Subtotal:</span>
                    <span style="text-align: right; font-weight: 600;">${formatIndianCurrency(customerOffer.commercials.subtotal)}</span>
                </div>
                ${customerOffer.commercials.subtotalOptional > 0 ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 1px solid #d0d0d0; font-size: 12px; color: #666;">
                    <span style="text-align: left;">Optional Items:</span>
                    <span style="text-align: right; font-weight: 600;">${formatIndianCurrency(customerOffer.commercials.subtotalOptional)}</span>
                </div>
                ` : ''}
                ${customerOffer.commercials.freight > 0 ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 1px solid #d0d0d0; font-size: 12px;">
                    <span style="text-align: left;">Freight/Shipping:</span>
                    <span style="text-align: right;">${formatIndianCurrency(customerOffer.commercials.freight)}</span>
                </div>
                ` : ''}
                ${customerOffer.commercials.installation > 0 ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 1px solid #d0d0d0; font-size: 12px;">
                    <span style="text-align: left;">Installation:</span>
                    <span style="text-align: right;">${formatIndianCurrency(customerOffer.commercials.installation)}</span>
                </div>
                ` : ''}
                ${customerOffer.commercials.discount > 0 ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 2px solid #d0d0d0; font-size: 12px; color: #d17a1e;">
                    <span style="text-align: left;">Discount (${customerOffer.commercials.discount}%):</span>
                    <span style="text-align: right; font-weight: 600;">-${formatIndianCurrency(customerOffer.commercials.discountAmount)}</span>
                </div>
                ` : ''}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 1px solid #d0d0d0; font-size: 12px;">
                    <span style="text-align: left;">Subtotal (Before Tax):</span>
                    <span style="text-align: right; font-weight: 600;">${formatIndianCurrency(customerOffer.commercials.subtotalAfterDiscount)}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px 0; border-bottom: 1px solid #d0d0d0; font-size: 12px;">
                    <span style="text-align: left;">Tax (${customerOffer.commercials.taxRate}% GST):</span>
                    <span style="text-align: right; font-weight: 600;">${formatIndianCurrency(customerOffer.commercials.tax)}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 14px 12px; font-weight: bold; font-size: 14px; background: #1a3a52; color: white; border-radius: 4px; margin-top: 8px;">
                    <span style="text-align: left;">Grand Total:</span>
                    <span style="text-align: right;">${formatIndianCurrency(customerOffer.commercials.grandTotal)}</span>
                </div>
            </div>
        </div>
    `;

    // Build comprehensive commercial terms and services section
    const commercialAndServicesSection = `
        <div style="margin-top: 30px; page-break-inside: avoid;">
            
            <!-- Commercial Terms & Conditions -->
            <div style="font-size: 11px; color: #666; line-height: 1.7; border-top: 2px solid #d0d0d0; padding-top: 15px; margin-bottom: 30px;">
                <h3 style="color: #1a3a52; font-size: 12px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 8px;">
                    Commercial Terms & Conditions
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
                    ${customerOffer.commercialTerms.paymentTerms ? `
                    <div>
                        <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Payment Terms:</p>
                        <p style="color: #555; font-size: 11px; line-height: 1.6;">${sanitizeHTML(customerOffer.commercialTerms.paymentTerms)}</p>
                    </div>
                    ` : ''}
                    ${customerOffer.commercialTerms.warrantyPeriod ? `
                    <div>
                        <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Warranty:</p>
                        <p style="color: #555; font-size: 11px;">${customerOffer.commercialTerms.warrantyPeriod} months from installation</p>
                    </div>
                    ` : ''}
                    ${customerOffer.commercialTerms.training ? `
                    <div>
                        <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Training:</p>
                        <p style="color: #555; font-size: 11px;">${sanitizeHTML(customerOffer.commercialTerms.training)}</p>
                    </div>
                    ` : ''}
                    ${customerOffer.commercialTerms.documentation ? `
                    <div>
                        <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Documentation:</p>
                        <p style="color: #555; font-size: 11px;">${sanitizeHTML(customerOffer.commercialTerms.documentation)}</p>
                    </div>
                    ` : ''}
                    ${customerOffer.commercialTerms.offerValidity ? `
                    <div>
                        <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Offer Validity:</p>
                        <p style="color: #555; font-size: 11px;">${customerOffer.commercialTerms.offerValidity} days from date of issue</p>
                    </div>
                    ` : ''}
                    ${customerOffer.commercialTerms.deliveryPeriod ? `
                    <div>
                        <p style="font-weight: bold; color: #1a3a52; font-size: 11px; margin-bottom: 6px; text-transform: uppercase;">Delivery Period:</p>
                        <p style="color: #555; font-size: 11px;">${customerOffer.commercialTerms.deliveryPeriod} weeks (subject to availability)</p>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Included Services -->
            <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin-bottom: 20px; page-break-inside: avoid;">
                <h4 style="color: #1a3a52; font-size: 12px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">Included Services</h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 11px; color: #555; line-height: 1.8;">
                    <li>Transportation to site (CIF)</li>
                    <li>Factory testing and inspection</li>
                    <li>Site installation and commissioning</li>
                    <li>Operator training (5 days on-site)</li>
                    <li>24-month defects warranty</li>
                    <li>Technical support during warranty period</li>
                </ul>
            </div>
            
            <!-- Exclusions -->
            <div style="background: #fff9f0; padding: 15px; border-left: 4px solid #d17a1e; border-radius: 4px; page-break-inside: avoid;">
                <h4 style="color: #1a3a52; font-size: 12px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">Exclusions</h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 11px; color: #555; line-height: 1.8;">
                    <li>Civil works and structural modifications</li>
                    <li>Auxiliary power supplies and cable trays</li>
                    <li>SCADA/DMS integration and customization</li>
                    <li>Extended warranty beyond 24 months</li>
                </ul>
            </div>
            
            <!-- Footer Notice -->
            <div style="background: #fafafa; padding: 12px; border-radius: 4px; margin-top: 20px; font-size: 10px; color: #666; line-height: 1.8; border: 1px solid #e0e0e0;">
                <p style="margin: 6px 0;"><strong>All prices in Indian Rupees (₹) and inclusive of GST (18%)</strong></p>
                <p style="margin: 6px 0;">This quotation is confidential and for the use of the intended recipient only</p>
                <p style="margin: 6px 0;">Subject to confirmation of final specifications and availability</p>
            </div>
        </div>
    `;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${sanitizeHTML(customerOffer.project.projectName)} - Commercial Offer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', 'Trebuchet MS', sans-serif;
            line-height: 1.4;
            color: #333;
            background: white;
        }
        
        .offer-document {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 40px;
        }
        
        .offer-header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 3px solid #1a3a52;
            padding-bottom: 15px;
        }
        
        .offer-header h1 {
            color: #1a3a52;
            font-size: 32px;
            margin-bottom: 8px;
            font-weight: bold;
            letter-spacing: 1px;
        }
        
        .offer-header p {
            color: #666;
            margin: 3px 0;
            font-size: 13px;
        }
        
        .offer-meta {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin: 25px 0;
            background: linear-gradient(to right, #f8f8f8, #f5f5f5);
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
        }
        
        .meta-column h3 {
            color: #1a3a52;
            font-size: 11px;
            text-transform: uppercase;
            margin-bottom: 12px;
            font-weight: bold;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 8px;
        }
        
        .meta-row {
            display: grid;
            grid-template-columns: 90px 1fr;
            gap: 12px;
            margin: 5px 0;
            font-size: 11px;
        }
        
        .meta-label {
            font-weight: bold;
            color: #1a3a52;
        }
        
        .meta-value {
            color: #555;
            word-break: break-word;
        }
        
        .product-heading {
            color: #1a3a52;
            font-size: 13px;
            font-weight: bold;
            margin: 25px 0 12px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #0066cc;
            padding-bottom: 8px;
        }
        
        .scope-heading {
            color: #1a3a52;
            font-size: 12px;
            font-weight: bold;
            margin: 15px 0 10px 0;
            padding-left: 8px;
            border-left: 3px solid #0066cc;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0;
            background: white;
        }
        
        table thead {
            background: #1a3a52;
            color: white;
        }
        
        table th {
            padding: 10px;
            text-align: left;
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-right: 1px solid rgba(255,255,255,0.2);
        }
        
        table th:last-child {
            border-right: none;
            text-align: right;
        }
        
        table tbody tr:hover {
            background: #fafafa;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #d0d0d0;
            font-size: 10px;
            color: #999;
            text-align: center;
        }
        
        @media print {
            body {
                background: white;
            }
            .offer-document {
                box-shadow: none;
                margin: 0;
                padding: 40px;
                max-width: 100%;
            }
            .no-print {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="offer-document">
        
        <!-- Header -->
        <div class="offer-header">
            <h1>COMMERCIAL OFFER</h1>
            <p>Professional Quotation for ${sanitizeHTML(customerOffer.project.projectName)}</p>
        </div>
        
        <!-- Customer & Offer Metadata -->
        <div class="offer-meta">
            <div class="meta-column">
                <h3>Customer Information</h3>
                <div class="meta-row">
                    <span class="meta-label">Company:</span>
                    <span class="meta-value">${sanitizeHTML(customerOffer.customer.company)}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Contact Person:</span>
                    <span class="meta-value">${sanitizeHTML(customerOffer.customer.contactPerson)}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Email:</span>
                    <span class="meta-value" style="font-size: 10px;">${sanitizeHTML(customerOffer.customer.email)}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Phone:</span>
                    <span class="meta-value">${sanitizeHTML(customerOffer.customer.phone)}</span>
                </div>
                ${customerOffer.customer.endUser ? `
                <div class="meta-row">
                    <span class="meta-label">End User:</span>
                    <span class="meta-value">${sanitizeHTML(customerOffer.customer.endUser)}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="meta-column">
                <h3>Offer Details</h3>
                <div class="meta-row">
                    <span class="meta-label">Offer #:</span>
                    <span class="meta-value">${customerOffer.metadata.offerNumber}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Date:</span>
                    <span class="meta-value">${customerOffer.metadata.offerDate}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Valid Until:</span>
                    <span class="meta-value">${customerOffer.metadata.validUntil}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Revision:</span>
                    <span class="meta-value">${sanitizeHTML(customerOffer.project.revision)}</span>
                </div>
                ${customerOffer.project.opportunityNumber ? `
                <div class="meta-row">
                    <span class="meta-label">Opp #:</span>
                    <span class="meta-value">${customerOffer.project.opportunityNumber}</span>
                </div>
                ` : ''}
            </div>
        </div>
        
        <!-- Executive Summary Section -->
        ${executiveSection}
        
        <!-- Requirements Section -->
        ${requirementsSection}
        
        <!-- Products Section -->
        <h2 class="product-heading">Scope of Supply & Pricing</h2>
        
        ${customerOffer.includedProducts.length > 0 ? `
        <div style="margin-bottom: 20px;">
            <div class="scope-heading">Base Scope (Included)</div>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: left;">Product</th>
                        <th style="text-align: center; width: 80px;">Qty</th>
                        <th style="text-align: right; width: 100px;">Unit Price</th>
                        <th style="text-align: right; width: 100px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${includedRows}
                </tbody>
            </table>
        </div>
        ` : ''}
        
        ${customerOffer.optionalProducts.length > 0 ? `
        <div style="margin-bottom: 20px;">
            <div class="scope-heading">Optional Items</div>
            <table>
                <thead>
                    <tr>
                        <th style="text-align: left;">Product</th>
                        <th style="text-align: center; width: 80px;">Qty</th>
                        <th style="text-align: right; width: 100px;">Unit Price</th>
                        <th style="text-align: right; width: 100px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${optionalRows}
                </tbody>
            </table>
        </div>
        ` : ''}
        
        <!-- Pricing Summary -->
        ${pricingSummary}
        
        <!-- Commercial Terms & Services -->
        ${commercialAndServicesSection}
        
        <!-- Footer -->
        <div class="footer">
            <p>Generated on ${new Date().toLocaleString('en-IN')}</p>
            <p>This is an automatically generated commercial offer. Please review all details carefully.</p>
        </div>
        
    </div>
</body>
</html>
    `;

    return html;
}

/**
 * Generate and download PDF from offer data
 * Uses browser's print-to-PDF or html2pdf library
 * @param {Object} customerOffer - Customer-safe offer object
 * @param {string} filename - PDF filename
 */
function downloadOfferPDF(customerOffer, filename = null) {
    const projectName = customerOffer.project.projectName || 'Offer';
    const pdfFilename = filename || `${projectName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

    const htmlContent = generateOfferHTML(customerOffer);

    // Check if html2pdf is available (need to add <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>)
    if (typeof html2pdf !== 'undefined') {
        const element = document.createElement('div');
        element.innerHTML = htmlContent;

        const opt = {
            margin: 10,
            filename: pdfFilename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };

        html2pdf().set(opt).from(element).save();
    } else {
        // Fallback: Open in new window for print-to-PDF
        const newWindow = window.open();
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        
        setTimeout(() => {
            newWindow.print();
        }, 250);

        showNotification('PDF opened in print dialog. Use Ctrl+P or Cmd+P to save as PDF.', 'info');
    }
}

/**
 * Preview offer in modal before generating PDF
 * @param {Object} customerOffer - Customer-safe offer object
 */
function previewOfferModal(customerOffer) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'offerPreviewModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 8px;
        width: 90%;
        max-width: 900px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 5px 30px rgba(0,0,0,0.3);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: #666;
        z-index: 1001;
    `;
    closeBtn.addEventListener('click', () => modal.remove());

    const actionButtons = document.createElement('div');
    actionButtons.style.cssText = `
        position: sticky;
        bottom: 0;
        background: white;
        border-top: 1px solid #e0e0e0;
        padding: 15px;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
    `;

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download PDF';
    downloadBtn.className = 'btn btn-primary';
    downloadBtn.addEventListener('click', () => {
        downloadOfferPDF(customerOffer);
        modal.remove();
    });

    const printBtn = document.createElement('button');
    printBtn.textContent = 'Print';
    printBtn.className = 'btn btn-secondary';
    printBtn.addEventListener('click', () => {
        window.print();
    });

    actionButtons.appendChild(downloadBtn);
    actionButtons.appendChild(printBtn);

    const previewContent = document.createElement('div');
    previewContent.innerHTML = generateOfferHTML(customerOffer);

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(previewContent);
    modalContent.appendChild(actionButtons);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

/**
 * Main function: Extract, map, and generate offer
 * Called when "Generate Offer" button is clicked
 */
function generateOfferFromFCMSheet() {
    try {
        // Step 1: Extract FCM data
        const fcmData = extractFCMFormData();

        // Validate we have products
        if (!fcmData.products || fcmData.products.length === 0) {
            showNotification('Please add at least one product before generating an offer.', 'error');
            return;
        }

        // Step 2: Map to customer-safe offer (SECURITY FILTER)
        const customerOffer = mapFCMToCustomerOffer(fcmData);

        if (!customerOffer) {
            showNotification('Error: Could not process offer data. Please check form fields.', 'error');
            return;
        }

        // Step 3: Show preview modal
        previewOfferModal(customerOffer);

        // Also save to localStorage for recovery/history
        const offerHistory = JSON.parse(localStorage.getItem('generatedOffers') || '[]');
        offerHistory.push({
            offerNumber: customerOffer.metadata.offerNumber,
            projectName: customerOffer.project.projectName,
            customer: customerOffer.customer.company,
            date: new Date().toISOString(),
            data: customerOffer
        });
        localStorage.setItem('generatedOffers', JSON.stringify(offerHistory.slice(-50))); // Keep last 50

        showNotification(`Offer generated successfully: ${customerOffer.metadata.offerNumber}`, 'success');
    } catch (error) {
        console.error('Error generating offer:', error);
        showNotification(`Error generating offer: ${error.message}`, 'error');
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        extractFCMFormData,
        mapFCMToCustomerOffer,
        generateOfferHTML,
        downloadOfferPDF,
        previewOfferModal,
        generateOfferFromFCMSheet,
        formatIndianCurrency,
        sanitizeHTML
    };
}
