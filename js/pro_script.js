/**
 * Property Valuation Professional - Calculation Engine
 * 
 * Complete property valuation tool with financial and tax calculations
 * for real estate investment analysis.
 */
document.addEventListener('DOMContentLoaded', function() {
    // German state property transfer tax rates database
    const propertyTransferTaxRates = {
        'baden-wuerttemberg': 5.0,
        'bayern': 3.5,
        'berlin': 6.0,
        'brandenburg': 6.5,
        'bremen': 5.0,
        'hamburg': 4.5,
        'hessen': 6.0,
        'mecklenburg-vorpommern': 6.0,
        'niedersachsen': 5.0,
        'nordrhein-westfalen': 6.5,
        'rheinland-pfalz': 5.0,
        'saarland': 6.5,
        'sachsen': 3.5,
        'sachsen-anhalt': 5.0,
        'schleswig-holstein': 6.5,
        'thueringen': 6.5
    };

    // Cache DOM elements using a more efficient object structure
    const el = {
        // Basic data
        livingArea: document.getElementById('livingArea'),
        purchasePrice: document.getElementById('purchasePrice'),
        pricePerSqm: document.getElementById('pricePerSqm'),
        
        // Additional costs
        state: document.getElementById('state'),
        propertyTransferTaxPercent: document.getElementById('propertyTransferTaxPercent'),
        propertyTransferTaxValue: document.getElementById('propertyTransferTaxValue'),
        realEstateAgent: document.getElementById('realEstateAgent'),
        realEstateAgentPercent: document.getElementById('realEstateAgentPercent'),
        realEstateAgentValue: document.getElementById('realEstateAgentValue'),
        notaryFeesPercent: document.getElementById('notaryFeesPercent'),
        notaryFeesValue: document.getElementById('notaryFeesValue'),
        landRegistryPercent: document.getElementById('landRegistryPercent'),
        landRegistryValue: document.getElementById('landRegistryValue'),
        additionalCostsTotalPercent: document.getElementById('additionalCostsTotalPercent'),
        additionalCostsTotalValue: document.getElementById('additionalCostsTotalValue'),
        totalCosts: document.getElementById('totalCosts'),
        
        // Furniture and Renovation
        furniture: document.getElementById('furniture'),
        renovationBathroom: document.getElementById('renovationBathroom'),
        renovationKitchen: document.getElementById('renovationKitchen'),
        renovationLivingArea: document.getElementById('renovationLivingArea'),
        renovationEntrance: document.getElementById('renovationEntrance'),
        renovationTotal: document.getElementById('renovationTotal'),
        renovationPercentage: document.getElementById('renovationPercentage'),
        renovationStatus: document.getElementById('renovationStatus'),
        furnitureRenovationTotal: document.getElementById('furnitureRenovationTotal'),
        totalInvestmentCosts: document.getElementById('totalInvestmentCosts'),
        afaNext3Years: document.getElementById('afaNext3Years'),
        
        // Rental income
        coldRentPerSqm: document.getElementById('coldRentPerSqm'),
        coldRentMonthly: document.getElementById('coldRentMonthly'),
        coldRentYearly: document.getElementById('coldRentYearly'),
        warmRentMonthly: document.getElementById('warmRentMonthly'),
        warmRentYearly: document.getElementById('warmRentYearly'),
        netRentalYield: document.getElementById('netRentalYield'),
        priceToRentRatio: document.getElementById('priceToRentRatio'),
        
        // Financing
        equityAmount: document.getElementById('equityAmount'),
        loanAmount: document.getElementById('loanAmount'),
        equityPercentage: document.getElementById('equityPercentage'),
        loanInterestRate: document.getElementById('loanInterestRate'),
        repaymentRate: document.getElementById('repaymentRate'),
        annuityRate: document.getElementById('annuityRate'),
        interestMonthly: document.getElementById('interestMonthly'),
        repaymentMonthly: document.getElementById('repaymentMonthly'),
        annuityMonthly: document.getElementById('annuityMonthly'),
        
        // Expenses & reserves
        houseMoneyNonCoverableMonthly: document.getElementById('houseMoneyNonCoverableMonthly'),
        utilityPrepaymentsMonthly: document.getElementById('utilityPrepaymentsMonthly'),
        vacancyRatePercentage: document.getElementById('vacancyRatePercentage'),
        vacancyReserveMonthly: document.getElementById('vacancyReserveMonthly'),
        maintenanceReservePerSqm: document.getElementById('maintenanceReservePerSqm'),
        maintenanceReserveMonthly: document.getElementById('maintenanceReserveMonthly'),
        expensesReservesTotalMonthly: document.getElementById('expensesReservesTotalMonthly'),
        expensesReservesTotalYearly: document.getElementById('expensesReservesTotalYearly'),
        
        // Tax elements
        buildingYear: document.getElementById('buildingYear'),
        buildingShare: document.getElementById('buildingShare'),
        buildingValue: document.getElementById('buildingValue'),
        buildingAfaMonthly: document.getElementById('buildingAfaMonthly'),
        buildingAfaYearly: document.getElementById('buildingAfaYearly'),
        landSharePercent: document.getElementById('landSharePercent'),
        landValue: document.getElementById('landValue'),
        furnitureDepreciationPeriod: document.getElementById('furnitureDepreciationPeriod'),
        furnitureAfaYearly: document.getElementById('furnitureAfaYearly'),
        furnitureAfaMonthly: document.getElementById('furnitureAfaMonthly'),
        verwaltungskostenWEG: document.getElementById('verwaltungskostenWEG'),
        afaGesamtMonthly: document.getElementById('afaGesamtMonthly'),
        afaGesamtYearly: document.getElementById('afaGesamtYearly'),
        cashflowNachAfaMonthly: document.getElementById('cashflowNachAfaMonthly'),
        managementCostsYearly: document.getElementById('managementCostsYearly'),
        taxRate: document.getElementById('taxRate'),
        taxAmountMonthly: document.getElementById('taxAmountMonthly'),
        taxAmountYearly: document.getElementById('taxAmountYearly'),
        taxableIncomeInfo: document.getElementById('taxable-income-info'),
        
        // Cashflow
        operativeCashflowMonthly: document.getElementById('operativeCashflowMonthly'),
        operativeCashflowYearly: document.getElementById('operativeCashflowYearly'),
        cashflowAfterTaxMonthly: document.getElementById('cashflowAfterTaxMonthly'),
        cashflowAfterTaxYearly: document.getElementById('cashflowAfterTaxYearly'),
        
        // Equity return
        equityReturn: document.getElementById('equityReturn'),
        equityReturnGaugeFill: document.getElementById('equityReturnGaugeFill'),
        equityReturnGaugePointer: document.getElementById('equityReturnGaugePointer'),
        equityReturnLightRed: document.getElementById('equityReturnLightRed'),
        equityReturnLightYellow: document.getElementById('equityReturnLightYellow'),
        equityReturnLightGreen: document.getElementById('equityReturnLightGreen'),
        
        // Dashboard metrics
        dashboardTotalInvestment: document.getElementById('dashboardTotalInvestment'),
        dashboardOperatingCashflow: document.getElementById('dashboardOperatingCashflow'),
        dashboardTaxCashflow: document.getElementById('dashboardTaxCashflow'),
        dashboardROE: document.getElementById('dashboardROE'),
                
        // Buttons
        calculateBtn: document.getElementById('calculateBtn'),
        resetBtn: document.getElementById('resetBtn')
    };

    // Helper functions for formatting
    function formatCurrency(value) {
        return new Intl.NumberFormat('de-DE', { 
            style: 'currency', 
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
    
    function formatPercent(value) {
        return new Intl.NumberFormat('de-DE', { 
            style: 'percent', 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value / 100);
    }
    
    /**
     * Main calculation function that processes all property valuation data
     */
    function calculate() {
        // Object to store all calculated values
        const val = {};
        
        // Parse input values with appropriate defaults
        val.livingArea = parseFloat(el.livingArea.value) || 0;
        val.purchasePrice = parseFloat(el.purchasePrice.value) || 0;
        val.state = el.state.value;
        val.hasRealEstateAgent = el.realEstateAgent.value === 'yes';
        val.coldRentPerSqm = parseFloat(el.coldRentPerSqm.value) || 0;
        val.equityAmount = parseFloat(el.equityAmount.value) || 0;
        val.loanInterestRate = parseFloat(el.loanInterestRate.value) || 4.0;
        val.repaymentRate = parseFloat(el.repaymentRate.value) || 2.0;
        val.houseMoneyNonCoverableMonthly = parseFloat(el.houseMoneyNonCoverableMonthly.value) || 0;
        val.utilityPrepaymentsMonthly = parseFloat(el.utilityPrepaymentsMonthly.value) || 0;
        val.vacancyRatePercentage = parseFloat(el.vacancyRatePercentage.value) || 2.0;
        val.maintenanceReservePerSqm = parseFloat(el.maintenanceReservePerSqm.value) || 10.0;
        val.buildingYear = el.buildingYear.value;
        val.buildingSharePercent = parseFloat(el.buildingShare.value) || 80;
        val.furnitureDepreciationPeriod = parseInt(el.furnitureDepreciationPeriod.value) || 3;
        val.taxRate = parseFloat(el.taxRate.value) || 42;
        
        // Parse furniture and renovation costs
        val.furniture = parseFloat(el.furniture.value) || 0;
        val.renovationBathroom = parseFloat(el.renovationBathroom.value) || 0;
        val.renovationKitchen = parseFloat(el.renovationKitchen.value) || 0;
        val.renovationLivingArea = parseFloat(el.renovationLivingArea.value) || 0;
        val.renovationEntrance = parseFloat(el.renovationEntrance.value) || 0;
        
        // Clear dashboard
        el.dashboardTotalInvestment.textContent = '-';
        el.dashboardOperatingCashflow.textContent = '-';
        el.dashboardTaxCashflow.textContent = '-';
        el.dashboardROE.textContent = '-';

        // Only proceed with calculations if we have the basic required values
        if (val.livingArea > 0 && val.purchasePrice > 0) {
            // Basic price per square meter
            val.pricePerSqm = val.purchasePrice / val.livingArea;
            el.pricePerSqm.value = formatCurrency(val.pricePerSqm);
            
            // Calculate additional costs based on purchase price
            calculateAdditionalCosts(val);
            
            // Calculate renovation costs
            calculateRenovationCosts(val);
            
            // Calculate financing terms
            calculateFinancing(val);
            
            // Calculate rental income if rent data is available
            if (val.coldRentPerSqm > 0) {
                // Calculate rental first
                calculateRental(val);
                
                // Then calculate expenses and reserves (requires coldRentMonthly)
                calculateExpenses(val);
                
                // Calculate tax implications
                calculateTax(val);
                
                // Calculate cashflow
                calculateCashflow(val);
                
                // Calculate return on equity
                calculateEquityReturn(val);

                // Update dashboard metrics
                el.dashboardTotalInvestment.textContent = formatCurrency(val.totalInvestmentCosts);
                el.dashboardOperatingCashflow.textContent = formatCurrency(val.operativeCashflowMonthly);
                el.dashboardTaxCashflow.textContent = formatCurrency(val.cashflowAfterTaxMonthly);
                el.dashboardROE.textContent = formatPercent(val.equityReturn);
            } else {
                clearRentalData();
            }
        } else {
            clearAllCalculatedFields();
        }
    }
    
    /**
     * Calculate renovation costs and furniture costs
     */
    function calculateRenovationCosts(val) {
        // Calculate renovation total
        val.renovationTotal = val.renovationBathroom + val.renovationKitchen + 
                             val.renovationLivingArea + val.renovationEntrance;
        el.renovationTotal.value = formatCurrency(val.renovationTotal);
        
        // Calculate renovation percentage of purchase price
        val.renovationPercentage = val.purchasePrice > 0 ? (val.renovationTotal / val.purchasePrice) * 100 : 0;
        el.renovationPercentage.value = formatPercent(val.renovationPercentage);
        
        // Add visual indicator for renovation costs
        if (val.renovationPercentage <= 15) {
            el.renovationPercentage.className = 'form-control calculated-value positive';
            el.renovationStatus.innerHTML = '✓';
            el.renovationStatus.className = 'input-group-text bg-success text-white';
        } else {
            el.renovationPercentage.className = 'form-control calculated-value';
            el.renovationStatus.innerHTML = '!';
            el.renovationStatus.className = 'input-group-text bg-warning text-dark';
        }
        
        // Calculate furniture and renovation total
        val.furnitureRenovationTotal = val.furniture + val.renovationTotal;
        el.furnitureRenovationTotal.value = formatCurrency(val.furnitureRenovationTotal);
        
        // Calculate total investment costs (purchase + additional costs + furniture + renovation)
        val.totalInvestmentCosts = val.totalCosts + val.furnitureRenovationTotal;
        el.totalInvestmentCosts.value = formatCurrency(val.totalInvestmentCosts);
    }
    
    /**
     * Calculate additional costs associated with property purchase
     */
    function calculateAdditionalCosts(val) {
        // Property transfer tax based on state
        val.propertyTransferTaxPercent = val.state ? propertyTransferTaxRates[val.state] || 0 : 0;
        el.propertyTransferTaxPercent.value = formatPercent(val.propertyTransferTaxPercent);
        
        // Parse and handle real estate agent commission
        const percentText = el.realEstateAgentPercent.value.replace('%', '').replace(',', '.').trim();
        val.realEstateAgentPercent = val.hasRealEstateAgent ? parseFloat(percentText) || 3.75 : 0;
        if (!val.hasRealEstateAgent) {
            el.realEstateAgentPercent.value = "0%";
        }
        
        // Fixed percentages for notary and land registry
        val.notaryFeesPercent = 1.50;
        val.landRegistryPercent = 0.50;
        
        // Update percentage fields to ensure they're always displayed
        el.notaryFeesPercent.value = val.notaryFeesPercent;
        el.landRegistryPercent.value = val.landRegistryPercent;
        
        // Calculate monetary values of additional costs
        val.propertyTransferTaxValue = (val.propertyTransferTaxPercent / 100) * val.purchasePrice;
        val.realEstateAgentValue = (val.realEstateAgentPercent / 100) * val.purchasePrice;
        val.notaryFeesValue = (val.notaryFeesPercent / 100) * val.purchasePrice;
        val.landRegistryValue = (val.landRegistryPercent / 100) * val.purchasePrice;
        
        // Update output fields with calculated values
        el.propertyTransferTaxValue.value = formatCurrency(val.propertyTransferTaxValue);
        el.realEstateAgentValue.value = formatCurrency(val.realEstateAgentValue);
        el.notaryFeesValue.value = formatCurrency(val.notaryFeesValue);
        el.landRegistryValue.value = formatCurrency(val.landRegistryValue);
        
        // Calculate totals
        val.additionalCostsTotalPercent = val.propertyTransferTaxPercent + val.realEstateAgentPercent + 
                                        val.notaryFeesPercent + val.landRegistryPercent;
        val.additionalCostsTotalValue = val.propertyTransferTaxValue + val.realEstateAgentValue + 
                                        val.notaryFeesValue + val.landRegistryValue;
        
        el.additionalCostsTotalPercent.value = formatPercent(val.additionalCostsTotalPercent);
        el.additionalCostsTotalValue.value = formatCurrency(val.additionalCostsTotalValue);
        
        // Total purchase cost including additional costs
        val.totalCosts = val.purchasePrice + val.additionalCostsTotalValue;
        el.totalCosts.value = formatCurrency(val.totalCosts);
    }
    
    /**
     * Calculate financing terms including loan amount, interest, and repayment
     */
    function calculateFinancing(val) {
        // Calculate effective equity and loan amount
        val.effectiveEquityAmount = Math.min(val.equityAmount, val.totalInvestmentCosts);
        val.loanAmount = val.totalInvestmentCosts - val.effectiveEquityAmount;
        val.equityPercentage = (val.effectiveEquityAmount / val.totalInvestmentCosts) * 100;
        val.annuityRate = val.loanInterestRate + val.repaymentRate;
        
        // Update financing output fields
        el.loanAmount.value = formatCurrency(val.loanAmount);
        el.equityPercentage.value = formatPercent(val.equityPercentage);
        el.annuityRate.value = formatPercent(val.annuityRate);
        
        // Calculate monthly payments
        val.interestMonthly = (val.loanAmount * (val.loanInterestRate / 100)) / 12;
        val.repaymentMonthly = (val.loanAmount * (val.repaymentRate / 100)) / 12;
        val.annuityMonthly = val.interestMonthly + val.repaymentMonthly;
        
        // Update monthly payment fields
        el.interestMonthly.value = formatCurrency(val.interestMonthly);
        el.repaymentMonthly.value = formatCurrency(val.repaymentMonthly);
        el.annuityMonthly.value = formatCurrency(val.annuityMonthly);
    }
    
    /**
     * Calculate rental income and yield
     */
    function calculateRental(val) {
        // Calculate rental income
        val.coldRentMonthly = val.livingArea * val.coldRentPerSqm;
        val.coldRentYearly = val.coldRentMonthly * 12;
        
        // Calculate warm rent (including utility prepayments)
        val.warmRentMonthly = val.coldRentMonthly + val.utilityPrepaymentsMonthly;
        val.warmRentYearly = val.warmRentMonthly * 12;
        
        // Calculate price-to-rent ratio (Kaufpreisfaktor)
        val.priceToRentRatio = val.coldRentYearly > 0 ? val.purchasePrice / val.coldRentYearly : 0;
        
        // Update rental income fields
        el.coldRentMonthly.value = formatCurrency(val.coldRentMonthly);
        el.coldRentYearly.value = formatCurrency(val.coldRentYearly);
        el.warmRentMonthly.value = formatCurrency(val.warmRentMonthly);
        el.warmRentYearly.value = formatCurrency(val.warmRentYearly);
        el.priceToRentRatio.value = val.priceToRentRatio.toFixed(2) + 'x';
        
        // Calculate and display rental yield
        val.netRentalYield = (val.coldRentYearly / val.totalInvestmentCosts) * 100;
        el.netRentalYield.value = formatPercent(val.netRentalYield);
        
        // Add color coding based on yield value
        if (val.netRentalYield >= 4) {
            el.netRentalYield.className = 'form-control calculated-value positive';
        } else if (val.netRentalYield >= 3) {
            el.netRentalYield.className = 'form-control calculated-value';
        } else {
            el.netRentalYield.className = 'form-control calculated-value negative';
        }
        
        // Add color coding for price-to-rent ratio
        if (val.priceToRentRatio <= 20) {
            el.priceToRentRatio.className = 'form-control calculated-value positive';
        } else if (val.priceToRentRatio <= 25) {
            el.priceToRentRatio.className = 'form-control calculated-value';
        } else {
            el.priceToRentRatio.className = 'form-control calculated-value negative';
        }
    }
    
    /**
     * Calculate expenses and reserves
     */
    function calculateExpenses(val) {
        // Calculate vacancy reserve
        val.vacancyReserveMonthly = (val.coldRentMonthly * (val.vacancyRatePercentage / 100));
        el.vacancyReserveMonthly.value = formatCurrency(val.vacancyReserveMonthly);
        
        // Calculate maintenance reserve
        val.maintenanceReserveMonthlyPerSqm = val.maintenanceReservePerSqm / 12;
        val.maintenanceReserveMonthly = val.livingArea * val.maintenanceReserveMonthlyPerSqm;
        el.maintenanceReserveMonthly.value = formatCurrency(val.maintenanceReserveMonthly);
        
        // Calculate total monthly expenses (excluding utility prepayments as they are not an expense for the owner)
        val.expensesReservesTotalMonthly = val.houseMoneyNonCoverableMonthly + 
                                         val.vacancyReserveMonthly + 
                                         val.maintenanceReserveMonthly;
        val.expensesReservesTotalYearly = val.expensesReservesTotalMonthly * 12;
        el.expensesReservesTotalMonthly.value = formatCurrency(val.expensesReservesTotalMonthly);
        el.expensesReservesTotalYearly.value = formatCurrency(val.expensesReservesTotalYearly);
    }
    
    /**
     * Calculate tax implications including depreciation and tax amount
     */
    function calculateTax(val) {
        // Calculate AfA rate based on building age
        val.afaRate = val.buildingYear === 'before1925' ? 2.5 : 2.0;
        
        // Calculate building and land values
        val.landSharePercent = 100 - val.buildingSharePercent;
        val.buildingValue = (val.buildingSharePercent / 100) * val.totalCosts;
        val.landValue = (val.landSharePercent / 100) * val.totalCosts;
        
        // Update building and land value fields
        el.buildingValue.value = formatCurrency(val.buildingValue);
        el.landValue.value = formatCurrency(val.landValue);
        
        // Calculate building depreciation (AfA)
        val.buildingAfaYearly = (val.afaRate / 100) * val.buildingValue;
        val.buildingAfaMonthly = val.buildingAfaYearly / 12;
        
        // Update depreciation fields
        el.buildingAfaMonthly.value = formatCurrency(val.buildingAfaMonthly);
        el.buildingAfaYearly.value = formatCurrency(val.buildingAfaYearly);
        
        // Calculate AfA for next 3 years
        val.afaNext3Years = val.buildingAfaYearly * 3;
        el.afaNext3Years.value = formatCurrency(val.afaNext3Years);
        
        // Calculate furniture depreciation (Möbel AfA)
        val.furnitureAfaYearly = val.furniture > 0 ? val.furniture / val.furnitureDepreciationPeriod : 0;
        val.furnitureAfaMonthly = val.furnitureAfaYearly / 12;
        el.furnitureAfaYearly.value = formatCurrency(val.furnitureAfaYearly);
        el.furnitureAfaMonthly.value = formatCurrency(val.furnitureAfaMonthly);
        
        // Display WEG Verwaltungskosten
        el.verwaltungskostenWEG.value = formatCurrency(val.houseMoneyNonCoverableMonthly);
        
        // Calculate renovation depreciation (AfA)
        val.renovationAfaYearly = val.renovationTotal > 0 ? (val.afaRate / 100) * val.renovationTotal : 0;
        val.renovationAfaMonthly = val.renovationAfaYearly / 12;
        
        // Calculate AfA Gesamt (sum of all depreciations)
        val.afaGesamtMonthly = val.buildingAfaMonthly + val.furnitureAfaMonthly  + val.houseMoneyNonCoverableMonthly;
        val.afaGesamtYearly = val.afaGesamtMonthly * 12;
        el.afaGesamtMonthly.value = formatCurrency(val.afaGesamtMonthly);
        el.afaGesamtYearly.value = formatCurrency(val.afaGesamtYearly);
        
        // Calculate taxable income
        val.deductibleExpensesMonthly = val.interestMonthly + 
                                     val.houseMoneyNonCoverableMonthly + // WEG Verwaltungskosten included here
                                     val.utilityPrepaymentsMonthly +
                                     val.buildingAfaMonthly +
                                     val.furnitureAfaMonthly;
        
        val.taxableIncomeMonthly = val.coldRentMonthly - val.deductibleExpensesMonthly;
        val.taxableIncomeYearly = val.taxableIncomeMonthly * 12;
        
        // Note: We'll calculate tax in the calculateCashflow function instead
        // based on cashflowNachAfaMonthly
        
        // Display taxable income info with appropriate styling
        if (val.cashflowNachAfaMonthly > 0) {
            el.taxableIncomeInfo.innerHTML = `Zu versteuerndes Einkommen nach AfA: ${formatCurrency(val.cashflowNachAfaMonthly)}/Monat <span class="negative">(steuerpflichtig)</span>`;
            el.taxableIncomeInfo.className = 'tax-info';
        } else {
            el.taxableIncomeInfo.innerHTML = `Zu versteuerndes Einkommen nach AfA: ${formatCurrency(val.cashflowNachAfaMonthly)}/Monat <span class="positive">(steuerlicher Vorteil)</span>`;
            el.taxableIncomeInfo.className = 'tax-info';
        }
    }
    
    /**
     * Calculate cashflow before and after tax
     */
    function calculateCashflow(val) {
        // Calculate operative cashflow (before tax) using warm rent instead of cold rent
        val.operativeCashflowMonthly = val.warmRentMonthly - val.annuityMonthly - val.expensesReservesTotalMonthly;
        val.operativeCashflowYearly = val.operativeCashflowMonthly * 12;
        
        // Update operative cashflow fields with appropriate styling
        el.operativeCashflowMonthly.value = formatCurrency(val.operativeCashflowMonthly);
        el.operativeCashflowYearly.value = formatCurrency(val.operativeCashflowYearly);
        el.operativeCashflowMonthly.className = val.operativeCashflowMonthly >= 0 ? 
            'form-control calculated-value positive font-weight-bold' : 
            'form-control calculated-value negative font-weight-bold';
        el.operativeCashflowYearly.className = val.operativeCashflowMonthly >= 0 ? 
            'form-control calculated-value positive' : 
            'form-control calculated-value negative';
            
        // Calculate cashflow nach AfA
        val.cashflowNachAfaMonthly = val.operativeCashflowMonthly + val.afaGesamtMonthly;
        el.cashflowNachAfaMonthly.value = formatCurrency(val.cashflowNachAfaMonthly);
        el.cashflowNachAfaMonthly.className = val.cashflowNachAfaMonthly >= 0 ? 
            'form-control calculated-value positive font-weight-bold' : 
            'form-control calculated-value negative font-weight-bold';
        
        // Calculate tax on cashflow nach AfA instead of the old taxable income
        val.taxAmountMonthly = (val.taxRate / 100) * val.cashflowNachAfaMonthly;
        val.taxAmountYearly = val.taxAmountMonthly * 12;
        el.taxAmountMonthly.value = formatCurrency(val.taxAmountMonthly);
        el.taxAmountYearly.value = formatCurrency(val.taxAmountYearly);
        
        // Calculate cashflow after tax using cashflowNachAfaMonthly instead of operativeCashflowMonthly
        val.cashflowAfterTaxMonthly = val.cashflowNachAfaMonthly - val.taxAmountMonthly;
        val.cashflowAfterTaxYearly = val.cashflowAfterTaxMonthly * 12;
        
        // Update cashflow after tax fields with appropriate styling
        el.cashflowAfterTaxMonthly.value = formatCurrency(val.cashflowAfterTaxMonthly);
        el.cashflowAfterTaxYearly.value = formatCurrency(val.cashflowAfterTaxYearly);
        el.cashflowAfterTaxMonthly.className = val.cashflowAfterTaxMonthly >= 0 ? 
            'form-control calculated-value positive font-weight-bold' : 
            'form-control calculated-value negative font-weight-bold';
        el.cashflowAfterTaxYearly.className = val.cashflowAfterTaxMonthly >= 0 ? 
            'form-control calculated-value positive' : 
            'form-control calculated-value negative';
    }
    
    /**
     * Calculate return on equity and update gauge visualization
     */
    function calculateEquityReturn(val) {
        // Only calculate if equity amount is greater than 0
        if (val.effectiveEquityAmount > 0) {
            // Calculate annual values
            val.cashflowAfterTaxYearly = val.cashflowAfterTaxMonthly * 12;
            val.repaymentYearly = val.repaymentMonthly * 12;
            
            // Calculate return on equity (including repayment and total AfA as part of return)
            // This properly accounts for building, renovation, furniture depreciation
            // and non-coverable housing costs (WEG Verwaltungskosten)
            val.equityReturn = ((val.cashflowAfterTaxYearly + val.repaymentYearly + (val.renovationTotal / 3)) / val.effectiveEquityAmount) * 100;
            console.log(`cashflowAfterTaxYearly Return: ${val.cashflowAfterTaxYearly}%`);
            console.log(`repaymentYearly Return: ${val.repaymentYearly}%`);
            console.log(`afaGesamtYearly Return: ${val.afaGesamtYearly}%`);
            console.log(`effectiveEquityAmount: ${val.effectiveEquityAmount}%`);
            console.log(`Equity Return: ${val.equityReturn}%`);

      
            // Update equity return field with appropriate styling
            el.equityReturn.value = formatPercent(val.equityReturn);
            el.equityReturn.className = val.equityReturn >= 0 ? 
                'form-control calculated-value text-center font-weight-bold positive' : 
                'form-control calculated-value text-center font-weight-bold negative';
            
            // Update gauge visualization
            updateEquityReturnGauge(val.equityReturn);
        } else {
            // Clear equity return if no equity is provided
            el.equityReturn.value = '';
            updateEquityReturnGauge(0);
        }
    }
    
    /**
     * Update equity return gauge visual elements
     */
    function updateEquityReturnGauge(value) {
        // Limit the value for gauge display purposes (0-50%)
        const limitedValue = Math.min(Math.max(value, 0), 50);
        
        // Calculate rotation angle (0% = 0 degrees, 50% = 180 degrees)
        const rotation = (limitedValue / 50) * 180;
        
        // Update gauge elements
        el.equityReturnGaugeFill.style.height = `${(limitedValue / 50) * 100}%`;
        el.equityReturnGaugePointer.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        
        // Reset traffic light indicators
        el.equityReturnLightRed.className = 'light red';
        el.equityReturnLightYellow.className = 'light yellow';
        el.equityReturnLightGreen.className = 'light green';
        
        // Set appropriate traffic light based on equity return value
        if (value >= 30) {
            el.equityReturnLightGreen.className = 'light green active';
        } else if (value >= 10) {
            el.equityReturnLightYellow.className = 'light yellow active';
        } else if (value > 0) {
            el.equityReturnLightRed.className = 'light red active';
        }
    }
    
    /**
     * Clear rental data fields when rent info is missing
     */
    function clearRentalData() {
        const rentalFields = [
            'coldRentMonthly', 'coldRentYearly', 'warmRentMonthly', 'warmRentYearly',
            'netRentalYield', 'priceToRentRatio',
            'vacancyReserveMonthly', 'maintenanceReserveMonthly', 'expensesReservesTotalMonthly', 'expensesReservesTotalYearly',
            'operativeCashflowMonthly', 'operativeCashflowYearly',
            'taxAmountMonthly', 'taxAmountYearly', 
            'cashflowAfterTaxMonthly', 'cashflowAfterTaxYearly',
            'furnitureAfaYearly',
            'equityReturn', 'afaNext3Years'
        ];
        
        // Clear all rental-related fields
        rentalFields.forEach(id => {
            if (el[id]) el[id].value = '';
        });
        
        // Reset the equity return gauge
        updateEquityReturnGauge(0);
        
        // Clear tax info
        if (el.taxableIncomeInfo) el.taxableIncomeInfo.innerHTML = '';
    }
    
    /**
     * Clear all calculated output fields
     */
    function clearAllCalculatedFields() {
        document.querySelectorAll('.calculated-value').forEach(input => {
            input.value = '';
            input.className = 'form-control calculated-value'; // Reset styling
        });
        
        // Clear tax info
        if (el.taxableIncomeInfo) el.taxableIncomeInfo.innerHTML = '';
        
        // Reset the equity return gauge
        updateEquityReturnGauge(0);
        
        // Clear renovation costs and status indicators
        if (el.renovationTotal) el.renovationTotal.value = '';
        if (el.renovationPercentage) {
            el.renovationPercentage.value = '';
            el.renovationStatus.innerHTML = '';
            el.renovationStatus.className = 'input-group-text';
        }
        if (el.furnitureRenovationTotal) el.furnitureRenovationTotal.value = '';
        if (el.totalInvestmentCosts) el.totalInvestmentCosts.value = '';
        if (el.afaNext3Years) el.afaNext3Years.value = '';
    }
    
    /**
     * Reset the form to initial state
     */
    function resetForm() {
        // Reset most input fields except those with default values
        document.querySelectorAll('input:not(.calculated-value)').forEach(input => {
            if (!['loanInterestRate', 'repaymentRate', 'vacancyRatePercentage', 
                'maintenanceReservePerSqm', 'taxRate', 'buildingShare'].includes(input.id)) {
                input.value = '';
            }
        });
        
        // Reset select elements except for building year
        document.querySelectorAll('select').forEach(select => {
            if (select.id !== 'buildingYear') {
                select.selectedIndex = 0;
            }
        });
        
        // Clear all calculated fields
        clearAllCalculatedFields();
    }
    
    // Set up event listeners
    el.calculateBtn.addEventListener('click', calculate);
    el.resetBtn.addEventListener('click', resetForm);
    
    // Auto-calculate when input values change
    document.querySelectorAll('input:not(.calculated-value), select').forEach(element => {
        element.addEventListener('input', calculate);
        element.addEventListener('change', calculate);
    });
    
    // Initialize tooltips for Bootstrap
    $('[data-toggle="tooltip"]').tooltip();
});
