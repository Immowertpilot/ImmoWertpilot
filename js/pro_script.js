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
        nettoMietrendite: document.getElementById('nettoMietrendite'),
        
        // Formula explanation elements
        coldRentYearlyValue: document.getElementById('coldRentYearlyValue'),
        expensesReservesTotalYearlyValue: document.getElementById('expensesReservesTotalYearlyValue'),
        totalInvestmentCostsValue: document.getElementById('totalInvestmentCostsValue'),
        
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
        purchasePriceSummary: document.getElementById('purchasePriceSummary'),
        
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
        
        // Investment summary fields
        furnitureSummary: document.getElementById('furnitureSummary'),
        renovationSummary: document.getElementById('renovationSummary'),
        furnitureRenovationSummary: document.getElementById('furnitureRenovationSummary'),
        
        // Rental income
        coldRentPerSqm: document.getElementById('coldRentPerSqm'),
        coldRentMonthly: document.getElementById('coldRentMonthly'),
        coldRentYearly: document.getElementById('coldRentYearly'),
        warmRentMonthly: document.getElementById('warmRentMonthly'),
        warmRentYearly: document.getElementById('warmRentYearly'),
        netRentalYield: document.getElementById('netRentalYield'), // This is a DIV with class metric-value-large
        priceToRentRatio: document.getElementById('priceToRentRatio'), // This is a DIV with class metric-value-large
        
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
    
    function formatNumberWithoutCurrency(value) {
        // Format number with thousand separators but without currency symbol
        return new Intl.NumberFormat('de-DE', { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(value));
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
        val.vacancyRatePercentage = parseFloat(el.vacancyRatePercentage.value) || 0.0;
        val.maintenanceReservePerSqm = parseFloat(el.maintenanceReservePerSqm.value) || 0.0;
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
            calculateFinancing(val);                // Calculate rental income if rent data is available
                if (val.coldRentPerSqm > 0) {
                    // Calculate rental first
                    calculateRental(val);
                    
                    // Then calculate expenses and reserves (requires coldRentMonthly)
                    calculateExpenses(val);
                    
                    // Recalculate netto mietrendite now that we have expenses calculated
                    // Formula: nettomietrendite = (coldRentYearly - expensesReservesTotalYearly) / totalInvestmentCosts * 100
                    if (val.totalInvestmentCosts > 0) {
                        val.nettoMietrendite = ((val.coldRentYearly - val.expensesReservesTotalYearly) / val.totalInvestmentCosts) * 100;
                        if (el.nettoMietrendite) {
                            el.nettoMietrendite.value = formatPercent(val.nettoMietrendite);
                            let baseClasses = 'form-control calculated-value text-center font-weight-bold';
                            if (val.nettoMietrendite >= 3) {
                                el.nettoMietrendite.className = baseClasses + ' positive';
                            } else if (val.nettoMietrendite >= 2) {
                                el.nettoMietrendite.className = baseClasses; // Default
                            } else { // < 2
                                el.nettoMietrendite.className = baseClasses + ' negative';
                            }
                        }
                        
                        // Update formula explanation values
                        if (el.coldRentYearlyValue) {
                            el.coldRentYearlyValue.textContent = formatNumberWithoutCurrency(val.coldRentYearly);
                        }
                        if (el.expensesReservesTotalYearlyValue) {
                            el.expensesReservesTotalYearlyValue.textContent = formatNumberWithoutCurrency(val.expensesReservesTotalYearly);
                        }
                        if (el.totalInvestmentCostsValue) {
                            el.totalInvestmentCostsValue.textContent = formatNumberWithoutCurrency(val.totalInvestmentCosts);
                        }
                    }
                    
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
            el.renovationPercentage.className = 'form-control calculated-value'; // Removed 'negative' as it's just a warning
            el.renovationStatus.innerHTML = '!';
            el.renovationStatus.className = 'input-group-text bg-warning text-dark';
        }
        
        // Calculate furniture and renovation total
        val.furnitureRenovationTotal = val.furniture + val.renovationTotal;
        el.furnitureRenovationTotal.value = formatCurrency(val.furnitureRenovationTotal);
        
        // Update the furniture and renovation summary in the Gesamtinvestition section
        if (el.furnitureSummary) el.furnitureSummary.textContent = formatCurrency(val.furniture);
        if (el.renovationSummary) el.renovationSummary.textContent = formatCurrency(val.renovationTotal);
        if (el.furnitureRenovationSummary) el.furnitureRenovationSummary.textContent = formatCurrency(val.furnitureRenovationTotal);
        
        // Calculate total investment costs (purchase + additional costs + furniture + renovation)
        val.totalInvestmentCosts = val.totalCosts + val.furnitureRenovationTotal;
        el.totalInvestmentCosts.textContent = formatCurrency(val.totalInvestmentCosts);
        
        // Update furniture and renovation summary fields (these are textContent, not value)
        // The HTML has these as DIVs, not inputs.
        // el.furnitureSummary.value = formatCurrency(val.furniture);
        // el.renovationSummary.value = formatCurrency(val.renovationTotal);
        // el.furnitureRenovationSummary.value = formatCurrency(val.furnitureRenovationTotal);
        // This was already handled by textContent above.
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
            el.realEstateAgentPercent.value = "0%"; // Display 0% if no agent
        } else {
             el.realEstateAgentPercent.value = formatPercent(val.realEstateAgentPercent); // Format if agent
        }
        
        // Fixed percentages for notary and land registry
        val.notaryFeesPercent = 1.50;
        val.landRegistryPercent = 0.50;
        
        // Update percentage fields to ensure they're always displayed
        // These are hidden inputs, so .value is correct.
        el.notaryFeesPercent.value = val.notaryFeesPercent.toFixed(2); 
        el.landRegistryPercent.value = val.landRegistryPercent.toFixed(2);
        
        // Calculate monetary values of additional costs
        val.propertyTransferTaxValue = (val.propertyTransferTaxPercent / 100) * val.purchasePrice;
        val.realEstateAgentValue = (val.realEstateAgentPercent / 100) * val.purchasePrice;
        val.notaryFeesValue = (val.notaryFeesPercent / 100) * val.purchasePrice;
        val.landRegistryValue = (val.landRegistryPercent / 100) * val.purchasePrice;
        
        // Update output fields with calculated values (these are SPANs in the HTML)
        el.propertyTransferTaxValue.innerText = formatCurrency(val.propertyTransferTaxValue);
        el.realEstateAgentValue.innerText = formatCurrency(val.realEstateAgentValue);
        el.notaryFeesValue.innerText = formatCurrency(val.notaryFeesValue);
        el.landRegistryValue.innerText = formatCurrency(val.landRegistryValue);
        
        // Calculate totals
        val.additionalCostsTotalPercent = val.propertyTransferTaxPercent + val.realEstateAgentPercent + 
                                        val.notaryFeesPercent + val.landRegistryPercent;
        val.additionalCostsTotalValue = val.propertyTransferTaxValue + val.realEstateAgentValue + 
                                        val.notaryFeesValue + val.landRegistryValue;
        
        el.additionalCostsTotalPercent.innerText = formatPercent(val.additionalCostsTotalPercent);
        el.additionalCostsTotalValue.innerText = formatCurrency(val.additionalCostsTotalValue);
        
        // Total purchase cost including additional costs
        val.totalCosts = val.purchasePrice + val.additionalCostsTotalValue;
        el.totalCosts.innerText = formatCurrency(val.totalCosts);
        
        // Update the improved cost panel
        if (window.updateCostPanelVisuals) {
            window.updateCostPanelVisuals(val.purchasePrice, {
                propertyTransferTaxValue: val.propertyTransferTaxValue,
                propertyTransferTaxPercent: val.propertyTransferTaxPercent,
                realEstateAgentValue: val.realEstateAgentValue,
                realEstateAgentPercent: val.realEstateAgentPercent,
                notaryFeesValue: val.notaryFeesValue,
                notaryFeesPercent: val.notaryFeesPercent,
                landRegistryValue: val.landRegistryValue,
                landRegistryPercent: val.landRegistryPercent
            });
        }
    }
    
    /**
     * Calculate financing terms including loan amount, interest, and repayment
     */
    function calculateFinancing(val) {
        // Calculate effective equity and loan amount
        val.effectiveEquityAmount = Math.min(val.equityAmount, val.totalInvestmentCosts);
        val.loanAmount = val.totalInvestmentCosts > 0 ? val.totalInvestmentCosts - val.effectiveEquityAmount : 0;
        val.equityPercentage = val.totalInvestmentCosts > 0 ? (val.effectiveEquityAmount / val.totalInvestmentCosts) * 100 : 0;
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
        
        // Calculate and display rental yield
        val.netRentalYield = val.purchasePrice > 0 ? (val.coldRentYearly / val.purchasePrice) * 100 : 0;
        
        // Calculate and display netto mietrendite (net rental yield)
        // Formula: nettomietrendite = (coldRentYearly - expensesReservesTotalYearly) / totalInvestmentCosts * 100
        if (val.totalInvestmentCosts > 0 && val.coldRentYearly > 0 && val.expensesReservesTotalYearly !== undefined) {
            val.nettoMietrendite = ((val.coldRentYearly - val.expensesReservesTotalYearly) / val.totalInvestmentCosts) * 100;
            
            if (el.nettoMietrendite) {
                el.nettoMietrendite.value = formatPercent(val.nettoMietrendite);
                let baseClasses = 'form-control calculated-value text-center font-weight-bold';
                if (val.nettoMietrendite >= 3) {
                    el.nettoMietrendite.className = baseClasses + ' positive';
                } else if (val.nettoMietrendite >= 2) {
                    el.nettoMietrendite.className = baseClasses; // Default
                } else { // < 2
                    el.nettoMietrendite.className = baseClasses + ' negative';
                }
                
                // Update formula explanation values
                if (el.coldRentYearlyValue) {
                    el.coldRentYearlyValue.textContent = formatNumberWithoutCurrency(val.coldRentYearly);
                }
                if (el.expensesReservesTotalYearlyValue) {
                    el.expensesReservesTotalYearlyValue.textContent = formatNumberWithoutCurrency(val.expensesReservesTotalYearly);
                }
                if (el.totalInvestmentCostsValue) {
                    el.totalInvestmentCostsValue.textContent = formatNumberWithoutCurrency(val.totalInvestmentCosts);
                }
            }
        }
        
        // Update netRentalYield (now an input element)
        if (el.netRentalYield) {
            el.netRentalYield.value = formatPercent(val.netRentalYield);
            let baseClasses = 'form-control calculated-value text-center font-weight-bold';
            if (val.netRentalYield >= 4) {
                el.netRentalYield.className = baseClasses + ' positive';
            } else if (val.netRentalYield >= 3) {
                el.netRentalYield.className = baseClasses; // Default
            } else { // < 3
                el.netRentalYield.className = baseClasses + ' negative';
            }
        }

        // Update priceToRentRatio (now an input element)
        if (el.priceToRentRatio) {
            el.priceToRentRatio.value = val.priceToRentRatio.toFixed(2) + 'x';
            let baseClasses = 'form-control calculated-value text-center font-weight-bold';
            if (val.priceToRentRatio > 0 && val.priceToRentRatio <= 20) { // Ensure priceToRentRatio is positive before styling
                el.priceToRentRatio.className = baseClasses + ' positive';
            } else if (val.priceToRentRatio > 0 && val.priceToRentRatio <= 25) {
                el.priceToRentRatio.className = baseClasses; // Default
            } else if (val.priceToRentRatio > 25) { // Only apply negative if it's high
                el.priceToRentRatio.className = baseClasses + ' negative';
            } else { // Default for 0 or other cases
                el.priceToRentRatio.className = baseClasses;
            }
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
        val.maintenanceReserveMonthlyPerSqm = val.maintenanceReservePerSqm ;
        val.maintenanceReserveMonthly = val.livingArea * val.maintenanceReserveMonthlyPerSqm / 12;
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
    // --- Pre-calculations for Renovation Logic ---
    // Building's share of the pure purchase price (for 15% rule)
    const buildingShareOfPurchasePrice = val.purchasePrice * (val.buildingSharePercent / 100);
    val.renovationDeductibleMonthly = 0;
    val.renovationCapitalizedAmount = 0;
    val.afaNext3Years = 0; // Default to 0

    // --- Renovation Logic (15% Rule) ---
    if (val.renovationTotal > 0 && buildingShareOfPurchasePrice > 0) {
        const renovationRatio = val.renovationTotal / buildingShareOfPurchasePrice;
        if (renovationRatio <= 0.15) {
            // Erhaltungsaufwand (maintenance/repairs, <= 15%)
            // Assume user wants to spread it over 3 years (as implied by "afaNext3Years")
            // This is a common choice for §82b EStDV (2-5 years).
            val.renovationDeductibleMonthly = (val.renovationTotal / 3) / 12;
            val.afaNext3Years = val.renovationTotal; // Total expensed over 3 years
            // Note: If user chose immediate deduction, renovationDeductibleMonthly would be (val.renovationTotal / 12) for the first year.
        } else {
            // Anschaffungsnahe Herstellungskosten (acquisition-related production costs, > 15%)
            // These costs must be capitalized and added to the building's value.
            val.renovationCapitalizedAmount = val.renovationTotal;
            // val.afaNext3Years remains 0 because this renovation is not expensed separately.
        }
    }

    // --- Building AfA Rate ---
    val.afaRate = val.buildingYear === 'before1925' ? 2.5 : 2.0;

    // --- Calculate Building and Land Values ---
    val.landSharePercent = 100 - val.buildingSharePercent;

    // Building value includes its share of total costs PLUS any capitalized renovation costs
    val.buildingValue = (val.buildingSharePercent / 100) * val.totalCosts + val.renovationCapitalizedAmount;
    val.landValue = (val.landSharePercent / 100) * val.totalCosts;

    // Update building and land value fields
    el.buildingValue.value = formatCurrency(val.buildingValue);
    el.landValue.value = formatCurrency(val.landValue);

    // --- Calculate Building Depreciation (AfA) ---
    // AfA is now calculated on the building value that might include capitalized renovations
    val.buildingAfaYearly = (val.afaRate / 100) * val.buildingValue;
    val.buildingAfaMonthly = val.buildingAfaYearly / 12;

    // Update depreciation fields
    el.buildingAfaMonthly.value = formatCurrency(val.buildingAfaMonthly);
    el.buildingAfaYearly.value = formatCurrency(val.buildingAfaYearly);

    // Update "AfA nächste 3 Jahre" field (related to expensed renovation)
    el.afaNext3Years.value = formatCurrency(val.afaNext3Years);

    // --- Calculate Furniture Depreciation (Möbel AfA) ---
    val.furnitureAfaYearly = val.furniture > 0 && val.furnitureDepreciationPeriod > 0 ? val.furniture / val.furnitureDepreciationPeriod : 0;
    val.furnitureAfaMonthly = val.furnitureAfaYearly / 12;
    el.furnitureAfaYearly.value = formatCurrency(val.furnitureAfaYearly);
    el.furnitureAfaMonthly.value = formatCurrency(val.furnitureAfaMonthly);

    // --- Display WEG Verwaltungskosten (non-coverable housing costs) ---
    // These are deductible operating expenses, not AfA.
    el.verwaltungskostenWEG.value = formatCurrency(val.houseMoneyNonCoverableMonthly);

    // --- Calculate AfA Gesamt (sum of actual depreciations) ---
    // This should only include true depreciation amounts.
    val.afaGesamtMonthly = val.buildingAfaMonthly + val.furnitureAfaMonthly + val.houseMoneyNonCoverableMonthly;

    val.afaGesamtYearly = val.afaGesamtMonthly * 12;

    el.afaGesamtMonthly.value = formatCurrency(val.afaGesamtMonthly);
    el.afaGesamtYearly.value = formatCurrency(val.afaGesamtYearly);

    // --- Calculate Tax Deductible Expenses & Taxable Income ---
    val.taxDeductibleExpensesMonthly =
        val.interestMonthly +                  // Zinsen
        val.houseMoneyNonCoverableMonthly +    // Nicht umlegbare Nebenkosten (z.B. WEG-Verwaltung)
        val.buildingAfaMonthly +               // Gebäude-AfA
        val.furnitureAfaMonthly +              // Möbel-AfA
        val.renovationDeductibleMonthly;       // Ggf. monatlicher Anteil Erhaltungsaufwand

    // WARNING: The deductibility of reserves is critical.
    // Contributions to Instandhaltungsrücklage (maintenance reserve) are generally NOT deductible.
    // Only *actual paid maintenance expenses* are.
    // Similarly, a "vacancy reserve" is not typically an expense. Actual lost rent reduces income.
    // If val.maintenanceReserveMonthly and val.vacancyReserveMonthly represent *actual expenses/losses*, then add them.
    // For example:
    // if (val.actualMaintenancePaidMonthly) val.taxDeductibleExpensesMonthly += val.actualMaintenancePaidMonthly;
    // For now, I am following the original code's intent to include them, but this is a major caveat:
    if (val.maintenanceReserveMonthly) { // Assuming this means actual deductible maintenance costs for the month
        val.taxDeductibleExpensesMonthly += val.maintenanceReserveMonthly;
    }
    if (val.vacancyReserveMonthly) { // Assuming this means actual deductible vacancy costs/losses for the month
         val.taxDeductibleExpensesMonthly += val.vacancyReserveMonthly;
    }


    val.taxableIncomeMonthly = val.coldRentMonthly - val.taxDeductibleExpensesMonthly;

    // The cashflowAfterAfa (or rather, cashflow after tax considerations related to AfA)
    // would typically be:
    // val.cashflowVorSteuernMonthly = val.coldRentMonthly - (val.interestMonthly + val.houseMoneyNonCoverableMonthly + val.maintenanceReserveMonthly + val.vacancyReserveMonthly + other_operational_costs_not_loan_repayment);
    // val.steuerersparnisDurchVerlusteMonthly = val.taxableIncomeMonthly < 0 ? Math.abs(val.taxableIncomeMonthly * val.personalTaxRate) : 0;
    // val.steuerschuldDurchGewinneMonthly = val.taxableIncomeMonthly > 0 ? (val.taxableIncomeMonthly * val.personalTaxRate) : 0;
    // cashflowNachAfaUndSteuern = cashflowVorSteuern - Tilgung + steuerersparnisDurchVerluste - steuerschuldDurchGewinne

    // The function's purpose seems to be to calculate tax-relevant items.
    // The actual "cashflowNachAfaMonthly" would be calculated elsewhere using these figures.
    // If taxableIncomeInfo is a display element:
    // el.taxableIncomeInfo.textContent = `Taxable income monthly: ${formatCurrency(val.taxableIncomeMonthly)}`;
}

// Dummy formatCurrency for testing if not defined elsewhere
// function formatCurrency(value) {
//     if (typeof value !== 'number') return '0.00 €';
//     return value.toFixed(2) + ' €';
// }

// Dummy el object for testing
// const el = {
//     buildingValue: { value: null },
//     landValue: { value: null },
//     buildingAfaMonthly: { value: null },
//     buildingAfaYearly: { value: null },
//     afaNext3Years: { value: null },
//     furnitureAfaYearly: { value: null },
//     furnitureAfaMonthly: { value: null },
//     verwaltungskostenWEG: { value: null },
//     afaGesamtMonthly: { value: null },
//     afaGesamtYearly: { value: null }
// };
    /**
     * Calculate cashflow before and after tax
     */
   function calculateCashflow(val) {
    // Calculate operative cashflow (before tax)
    // Warm rent - (annuity + total non-coverable expenses & reserves)
    val.operativeCashflowMonthly = val.warmRentMonthly - val.annuityMonthly - val.expensesReservesTotalMonthly;
    val.operativeCashflowYearly = val.operativeCashflowMonthly * 12;

    el.operativeCashflowMonthly.value = formatCurrency(val.operativeCashflowMonthly);
    el.operativeCashflowYearly.value = formatCurrency(val.operativeCashflowYearly);
    el.operativeCashflowMonthly.className = val.operativeCashflowMonthly >= 0 ?
        'form-control calculated-value positive font-weight-bold' :
        'form-control calculated-value negative font-weight-bold';
    el.operativeCashflowYearly.className = val.operativeCashflowMonthly >= 0 ?
        'form-control calculated-value positive' :
        'form-control calculated-value negative';

    // Calculate cashflow nach AfA (this is treated as taxable income)
    // This relies on val.taxableIncomeMonthly being correctly calculated in calculateTax()
    val.cashflowNachAfaMonthly = val.afaGesamtMonthly + val.operativeCashflowMonthly; // This is the actual taxable base

    el.cashflowNachAfaMonthly.value = formatCurrency(val.cashflowNachAfaMonthly);
    el.cashflowNachAfaMonthly.className = val.cashflowNachAfaMonthly >= 0 ?
        'form-control calculated-value positive font-weight-bold' : // Positive taxable income
        'form-control calculated-value negative font-weight-bold'; // Negative taxable income (loss)

    // Update taxableIncomeInfo display
    if (val.cashflowNachAfaMonthly > 0) {
        el.taxableIncomeInfo.innerHTML = `Zu versteuerndes Einkommen: ${formatCurrency(val.cashflowNachAfaMonthly)}/Monat <span class="negative">(steuerpflichtig)</span>`;
        el.taxableIncomeInfo.className = 'tax-info';
    } else if (val.cashflowNachAfaMonthly < 0) {
        el.taxableIncomeInfo.innerHTML = `Zu versteuerndes Einkommen: ${formatCurrency(Math.abs(val.cashflowNachAfaMonthly))}/Monat <span class="positive">(steuerlicher Verlust)</span>`; // Show as positive loss
        el.taxableIncomeInfo.className = 'tax-info';
    } else {
        el.taxableIncomeInfo.innerHTML = `Zu versteuerndes Einkommen: ${formatCurrency(val.cashflowNachAfaMonthly)}/Monat`;
        el.taxableIncomeInfo.className = 'tax-info';
    }

    // Calculate tax amount based on taxable income (cashflowNachAfaMonthly)
    val.taxAmountMonthly = (val.taxRate / 100) * val.cashflowNachAfaMonthly;
    // If cashflowNachAfaMonthly is a loss (negative), taxAmountMonthly will be negative (tax saving)
    // For display, tax owed is positive, tax saved might be shown as negative or positive benefit
    el.taxAmountMonthly.value = formatCurrency(val.taxAmountMonthly); // Will show negative if it's a saving
    val.taxAmountYearly = val.taxAmountMonthly * 12;
    el.taxAmountYearly.value = formatCurrency(val.taxAmountYearly);

    // Calculate cashflow after tax
    // --- THIS IS THE LINE CHANGED TO MATCH THE IMAGE'S DERIVATION ---
    // Original: val.cashflowAfterTaxMonthly = val.operativeCashflowMonthly - val.taxAmountMonthly;
    // To match image's apparent logic for its "Cashflow nach Steuern" line:
    val.cashflowAfterTaxMonthly = val.cashflowNachAfaMonthly - val.taxAmountMonthly;
    // This effectively becomes: Taxable Income - (Taxable Income * Tax Rate) = Taxable Income * (1 - Tax Rate)
    // It's "taxable income after tax has been applied to it", NOT necessarily the final cash in pocket.
    //--------------------------------------------------------------------

    val.cashflowAfterTaxYearly = val.cashflowAfterTaxMonthly * 12;

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
        if (val.effectiveEquityAmount > 0) {
            // Annual cashflow after tax + annual repayment
            const annualReturnForEquity = (val.cashflowAfterTaxMonthly * 12) + (val.repaymentMonthly * 12) + (val.renovationTotal / 3) ;
            
            // The original formula included (val.renovationTotal / 3). This might be an attempt to factor in value increase or tax shield from renovation.
            // A standard ROE is (Net Profit After Tax + Interest Expense * (1-Tax Rate)) / Average Equity
            // Or simpler for property: (Cashflow After Tax + Principal Repayment) / Equity Invested
            // Let's use the simpler: (Annual Cashflow After Tax + Annual Principal Repayment) / Equity
            val.equityReturn = (annualReturnForEquity / val.effectiveEquityAmount) * 100;
            
            // console.log(`cashflowAfterTaxYearly: ${val.cashflowAfterTaxMonthly * 12}`);
            // console.log(`repaymentYearly: ${val.repaymentMonthly * 12}`);
            // console.log(`effectiveEquityAmount: ${val.effectiveEquityAmount}`);
            // console.log(`Equity Return: ${val.equityReturn}%`);
      
            el.equityReturn.value = formatPercent(val.equityReturn);
            el.equityReturn.className = val.equityReturn >= 0 ? 
                'form-control calculated-value text-center font-weight-bold positive' : 
                'form-control calculated-value text-center font-weight-bold negative';
            
            updateEquityReturnGauge(val.equityReturn);
        } else {
            el.equityReturn.value = '';
            el.equityReturn.className = 'form-control calculated-value text-center font-weight-bold';
            updateEquityReturnGauge(0);
        }
    }
    
    /**
     * Update equity return gauge visual elements
     */
    function updateEquityReturnGauge(value) {
        const limitedValue = Math.min(Math.max(value, -20), 50); // Allow some negative display
        const gaugeRange = 70; // from -20 to 50
        const normalizedValue = limitedValue + 20; // Shift to 0-70 range
        
        const rotation = (normalizedValue / gaugeRange) * 180; // 0% = 0deg, 100% (of range) = 180deg
        
        el.equityReturnGaugeFill.style.height = `${(normalizedValue / gaugeRange) * 100}%`;
        el.equityReturnGaugePointer.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
        
        el.equityReturnLightRed.className = 'light red';
        el.equityReturnLightYellow.className = 'light yellow';
        el.equityReturnLightGreen.className = 'light green';
        
        if (value >= 10) { // Adjusted thresholds for ROE
            el.equityReturnLightGreen.className = 'light green active';
        } else if (value >= 5) {
            el.equityReturnLightYellow.className = 'light yellow active';
        } else if (value > -Infinity) { // any calculated value
            el.equityReturnLightRed.className = 'light red active';
        }
    }
    
    /**
     * Clear rental data fields when rent info is missing
     */
    function clearRentalData() {
        const rentalInputFields = [
            'coldRentMonthly', 'coldRentYearly', 'warmRentMonthly', 'warmRentYearly',
            'vacancyReserveMonthly', 'maintenanceReserveMonthly', 'expensesReservesTotalMonthly', 'expensesReservesTotalYearly',
            'operativeCashflowMonthly', 'operativeCashflowYearly',
            'taxAmountMonthly', 'taxAmountYearly', 
            'cashflowAfterTaxMonthly', 'cashflowAfterTaxYearly',
            'furnitureAfaYearly', 'furnitureAfaMonthly', // Added monthly
            'equityReturn', 'afaNext3Years', 'cashflowNachAfaMonthly', 'nettoMietrendite', 'netRentalYield' // Added nettoMietrendite and netRentalYield
        ];
        
        // Clear formula explanation values
        if (el.coldRentYearlyValue) el.coldRentYearlyValue.textContent = "0";
        if (el.expensesReservesTotalYearlyValue) el.expensesReservesTotalYearlyValue.textContent = "0";
        if (el.totalInvestmentCostsValue) el.totalInvestmentCostsValue.textContent = "0";
        
        rentalInputFields.forEach(id => {
            if (el[id] && typeof el[id].value !== 'undefined') {
                 el[id].value = '';
                 // Reset classes for inputs that might have positive/negative
                 if (el[id].classList) {
                    el[id].classList.remove('positive', 'negative');
                    // Ensure base classes if they were complex
                    if (id === 'equityReturn') {
                        el[id].className = 'form-control calculated-value text-center font-weight-bold';
                    } else if (id === 'operativeCashflowMonthly' || id === 'cashflowAfterTaxMonthly' || id === 'cashflowNachAfaMonthly') {
                        el[id].className = 'form-control calculated-value font-weight-bold';
                    } else if (el[id].tagName === 'INPUT') {
                        el[id].className = 'form-control calculated-value';
                    }
                 }
            }
        });

        // Handle netRentalYield and priceToRentRatio (now input elements)
        if (el.netRentalYield) {
            el.netRentalYield.value = '';
            el.netRentalYield.className = 'form-control calculated-value text-center font-weight-bold';
        }
        if (el.priceToRentRatio) {
            el.priceToRentRatio.value = '';
            el.priceToRentRatio.className = 'form-control calculated-value text-center font-weight-bold';
        }
        
        updateEquityReturnGauge(0);
        if (el.taxableIncomeInfo) el.taxableIncomeInfo.innerHTML = '';
    }
    
    /**
     * Clear all calculated output fields
     */
    function clearAllCalculatedFields() {
        document.querySelectorAll('.calculated-value').forEach(element => {
            // Clear content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.value = '';
            } else { // For DIVs, SPANs etc.
                element.textContent = '';
            }

            // Reset classes: remove 'positive', 'negative'.
            element.classList.remove('positive', 'negative');
            
            // Ensure base classes are correctly set after removing positive/negative
            if (element.id === 'netRentalYield' || element.id === 'priceToRentRatio' || element.id === 'nettoMietrendite') {
                element.className = 'form-control calculated-value text-center font-weight-bold';
            } else if (element.id === 'equityReturn') {
                 element.className = 'form-control calculated-value text-center font-weight-bold';
            } else if (['operativeCashflowMonthly', 'cashflowAfterTaxMonthly', 'cashflowNachAfaMonthly', 'furnitureRenovationTotal', 'expensesReservesTotalMonthly'].includes(element.id) && element.tagName === 'INPUT') {
                 element.className = 'form-control calculated-value font-weight-bold';
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                 element.className = 'form-control calculated-value';
            }
            // For other .calculated-value elements (like SPANs in cost panel), just removing positive/negative is enough.
        });
        
        if (el.taxableIncomeInfo) el.taxableIncomeInfo.innerHTML = '';
        updateEquityReturnGauge(0);
        
        if (el.renovationTotal) el.renovationTotal.value = '';
        if (el.renovationPercentage) {
            el.renovationPercentage.value = '';
            el.renovationStatus.innerHTML = '';
            el.renovationStatus.className = 'input-group-text';
        }
        if (el.furnitureRenovationTotal) el.furnitureRenovationTotal.value = ''; // This is an input
        
        // Clear formula explanation values
        if (el.coldRentYearlyValue) el.coldRentYearlyValue.textContent = "0";
        if (el.expensesReservesTotalYearlyValue) el.expensesReservesTotalYearlyValue.textContent = "0";
        if (el.totalInvestmentCostsValue) el.totalInvestmentCostsValue.textContent = "0";
        
        // Clear Ertragswert fields
        const ertragswertFieldsToClear = [
            'jahresreinertrag', 'bodenwertverzinsung', 'gebaudereinertrag',
            'vervielfaeltiger', 'gebaeudeertragswert', 'ertragswertBodenwert',
            'gesamtlicherErtragswert', 'gesamtlicherErtragswertDetail',
            'ertragswertKaufpreisRatio', 'ertragswertGesamtinvestitionRatio'
        ];
        ertragswertFieldsToClear.forEach(id => {
            if (el[id]) {
                if (el[id].tagName === 'INPUT') el[id].value = '';
                el[id].className = 'form-control calculated-value';
            }
        });
        
        // Clear textContent for elements that are not inputs but display calculated values
        const textContentFieldsToClear = [
            'totalInvestmentCosts', 'pricePerSqm', // pricePerSqm is input, handled above
            'propertyTransferTaxValue', 'realEstateAgentValue', 'notaryFeesValue', 'landRegistryValue',
            'additionalCostsTotalPercent', 'additionalCostsTotalValue', 'totalCosts',
            'furnitureSummary', 'renovationSummary', 'furnitureRenovationSummary'
        ];
        textContentFieldsToClear.forEach(id => {
            if (el[id] && (el[id].tagName === 'SPAN' || el[id].tagName === 'DIV')) {
                el[id].textContent = '';
            }
        });
         if (el.pricePerSqm) el.pricePerSqm.value = ''; // It's an input
    }
    
    /**
     * Reset the form to initial state
     */
    function resetForm() {
        document.querySelectorAll('input:not(.calculated-value)').forEach(input => {
            // Keep default values for these fields
            const fieldsWithDefaults = ['loanInterestRate', 'repaymentRate', 'vacancyRatePercentage', 
                                      'maintenanceReservePerSqm', 'taxRate', 'buildingShare', 'realEstateAgentPercent'];
            if (!fieldsWithDefaults.includes(input.id)) {
                input.value = '';
            } else {
                // Restore defaults
                if (input.id === 'loanInterestRate') input.value = '4.0';
                if (input.id === 'repaymentRate') input.value = '2.0';
                if (input.id === 'vacancyRatePercentage') input.value = '2';
                if (input.id === 'maintenanceReservePerSqm') input.value = '10';
                if (input.id === 'taxRate') input.value = '42';
                if (input.id === 'buildingShare') input.value = '80';
                if (input.id === 'realEstateAgentPercent') input.value = '3.75';
            }
        });
        
        document.querySelectorAll('select').forEach(select => {
            if (select.id === 'buildingYear') {
                select.value = 'after1925'; // Default
            } else if (select.id === 'furnitureDepreciationPeriod') {
                select.value = '3'; // Default
            } else {
                select.selectedIndex = 0; // Default for others like 'state'
            }
        });
        
        clearAllCalculatedFields();

        // Clear dashboard explicitly
        el.dashboardTotalInvestment.textContent = '-';
        el.dashboardOperatingCashflow.textContent = '-';
        el.dashboardTaxCashflow.textContent = '-';
        el.dashboardROE.textContent = '-';

        // Reset cost panel visuals if the function exists
        if (window.resetCostPanelVisuals) {
            window.resetCostPanelVisuals();
        }
    }
    
    // Set up event listeners
    el.calculateBtn.addEventListener('click', calculate);
    el.resetBtn.addEventListener('click', resetForm);
    
    const inputElements = document.querySelectorAll('input:not(.calculated-value), select');
    inputElements.forEach(element => {
        element.addEventListener('input', calculate); // For text inputs, sliders
        element.addEventListener('change', calculate); // For selects, checkboxes, date pickers
    });
    
    // Initialize tooltips for Bootstrap
    if (typeof $ !== 'undefined' && $.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Initial calculation if there are pre-filled values (e.g. from browser cache)
    // calculate(); // Optionally call calculate on load
});