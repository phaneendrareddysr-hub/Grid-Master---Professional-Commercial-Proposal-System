# Enhanced FCM Sheet Structure - Implementation Guide

## Overview
Transform the FCM Sheet from a simple quotation to a professional customer-focused commercial proposal system.

## NEW SECTIONS TO ADD

### 1. CUSTOMER REQUIREMENTS & PROJECT CONTEXT
**Captures:**
- Customer industry/segment
- Project type (New, Expansion, Replacement, Retrofit)
- Project location
- Main customer requirement
- Customer priorities (Reliability, Early Delivery, Automation, Space, Cost, Future Expansion)
- Voltage level
- Application/use case
- Expected delivery date
- Special requirements

### 2. PROPOSAL STRATEGY & VALUE PROPOSITION
**Captures:**
- Proposal headline
- Executive summary (customer-focused)
- Main value proposition
- Key solution benefits (max 5)
- Project-specific differentiators

### 3. ENHANCED PRODUCT MANAGEMENT
**Enhanced Product Fields:**
- Product name/model
- Product category (Power Distribution, Protection, Monitoring, etc.)
- Voltage class
- Technical configuration
- Customer-facing description (non-technical)
- Key benefits for customer
- Quantity
- **Scope Status** (Included/Optional/Available on Request/Excluded/To Be Finalized)
- Customer-facing unit price
- Factory price (internal only, not in PDF)
- Margin % (internal only, not in PDF)
- Total customer price
- Technical datasheet link
- Product image reference
- Relevant standards/certifications

### 4. SOLUTION GROUPING
**Organize Products Under:**
- Reliable Power Distribution
- Compact High-Voltage Infrastructure
- Intelligent Protection and Control
- Automation and Monitoring
- Engineering and Project Support

### 5. COMMERCIAL DETAILS - ENHANCED
**Add Fields:**
- Discount percentage
- Discount amount
- Freight and insurance
- Installation charges
- Commissioning charges
- Optional items subtotal
- Base scope subtotal
- Tax type (GST/VAT/Custom)
- Tax percentage
- Tax amount
- Grand total with tax
- Price basis (FOB/CIF/Delivered)
- Currency
- Price validity period
- Amount in words

### 6. SCOPE & DELIVERABLES
**Mandatory Scope Selection:**
- Base scope (Included - fixed)
- Optional products (Included if selected)
- Recommended enhancements (Included if selected)
- Exclusions (clearly listed)

### 7. RECOMMENDED ENHANCEMENTS
**Automatic Suggestions Based On:**
- Selected products
- Project requirements
- Customer priorities

**Maximum 4-6 recommendations including:**
- Product/service name
- Benefit-oriented description
- Reason for recommendation
- Scope status
- Price (or "available on request")
- Include/Exclude checkbox

### 8. COMMERCIAL TERMS & CONDITIONS
**Dedicated Fields:**
- Offer validity period
- Delivery period/timeline
- Payment terms
- Warranty scope
- Warranty period
- Freight responsibility
- Installation responsibility
- Testing & commissioning scope
- Training scope
- Documentation included
- Included services
- Exclusions
- Assumptions
- Technical deviations
- Commercial deviations

### 9. NOTES - SEPARATED
**Replace Single Notes Field With:**
- Internal notes (never in customer PDF)
- Customer-facing notes
- Special commercial instructions
- Technical clarifications
- Approval comments (never in customer PDF)

### 10. MARKETING & SUPPORTING CONTENT
**Selectable Items:**
- Company logo/branding
- Product images (for selected products only)
- Solution benefits summary
- Relevant project references
- Customer testimonials
- Standards and certifications
- Type-test information
- Manufacturing capabilities
- Service center locations
- Product catalogue links
- Technical document links

## PDF GENERATION - NEW STRUCTURE

### Page 1: Branded Cover Page
- Company branding
- "COMMERCIAL OFFER" title
- Subtitle: Project name
- Professional spacing

### Page 2: Executive Summary & Offer Details
- Customer information (company, contact, email, phone)
- Offer details (number, date, validity, opp number)
- Executive summary (customer-focused)
- Main value proposition
- Key benefits (max 5)

### Page 3: Understanding of Customer Requirement
- Customer industry/segment
- Project type and location
- Main requirement
- Customer priorities (highlighted)
- Application/use case
- Expected delivery date

### Page 4: Proposed Integrated Solution
- Solution headline
- Products grouped by solution category
- Brief description of how it addresses requirements

### Page 5+: Product Scope & Descriptions
- Product portfolio table
- For each product:
  - Product name and model
  - Voltage class
  - Technical configuration
  - Customer-facing description
  - Key benefits
  - Quantity
  - Unit price
  - Total price
  - Status (Included/Optional)
  - Standards/certifications

### Page N: Detailed Scope of Supply
- **Base Scope (Included)** - List all included items
- **Optional Items** - If any selected, list with prices
- **Recommended Enhancements** - If any selected, list with prices
- **Exclusions** - Clear list of what's not included

### Page N+1: Commercial Pricing Summary
- Base scope subtotal
- Optional items subtotal
- Recommended enhancements subtotal
- Subtotal before tax
- Discount (if applicable)
- Freight and insurance
- Installation charges
- Commissioning charges
- Subtotal for tax
- Tax calculation (18% GST)
- **Grand Total** (highlighted)
- Price basis, currency, validity
- Amount in words

### Page N+2: Recommended Enhancements (if applicable)
- Headline: "Value-Adding Enhancements"
- For each enhancement:
  - Name
  - Benefit-oriented description
  - Why recommended
  - Price
  - Scope status
  - Include checkbox for quote

### Page N+3: Delivery, Warranty & Commercial Terms
- Offer validity
- Delivery timeline
- Payment terms
- Warranty (scope + period)
- Freight and insurance terms
- Installation and commissioning
- Training included
- Documentation
- Price basis
- Included services
- Exclusions
- Assumptions
- Deviations (technical, commercial)

### Page N+4: Company Capabilities & References
- Brief company overview
- Manufacturing capabilities
- Testing facilities
- Service network
- Relevant project references (max 3)
- Standards & certifications
- Contact details

### Page N+5: Next Steps & Sales Contact
- Proposal review timeline
- Next steps
- Sales contact information
- How to accept/modify offer

### Page N+N: Technical Annexures (if applicable)
- Technical datasheets (linked)
- Detailed specifications
- Standards compliance documentation

## SECURITY NOTES

**NEVER include in customer PDF:**
- Factory prices
- Margin percentages
- Internal margins or cost information
- Internal notes
- Approval comments
- Alternative pricing options

**Customer-Safe Information Only:**
- Selling prices (customer prices)
- Scope of supply
- Delivery and warranty terms
- Company capabilities relevant to customer
- Selected marketing content

## DATA FLOW

1. **Sales Person fills FCM Sheet:**
   - Customer requirements
   - Project context
   - Product selection with customer descriptions
   - Commercial terms
   - Margin & pricing (internal)
   - Internal notes

2. **System processes:**
   - Validates all required fields
   - Filters customer-safe data
   - Generates recommended enhancements
   - Calculates all prices (hiding internals)
   - Groups products by solution area
   - Generates PDF chapters

3. **PDF Output:**
   - Professional multi-page proposal
   - Customer-focused language
   - All internal data hidden
   - Ready to send to customer

## IMPLEMENTATION PHASES

**Phase 1:** Add new FCM Sheet fields (8-10 hours)
**Phase 2:** Update PDF generator basic structure (4-6 hours)
**Phase 3:** Add formatting and styling (3-4 hours)
**Phase 4:** Add recommended enhancements logic (3-4 hours)
**Phase 5:** Add marketing content integration (2-3 hours)
**Phase 6:** Testing and refinement (4-5 hours)

**Total Effort:** ~24-32 development hours

## RECOMMENDATION

Start with **Phase 1 & 2** to get the new structure working, then add enhancements iteratively.
