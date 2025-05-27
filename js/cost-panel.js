/**
 * Improved Cost Panel JavaScript
 * This file contains functions to handle the enhanced cost panel UI
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cost breakdown is now always visible in a compact format
    // No toggle functionality needed
    
    // Initialize the cost breakdown visualization
    function initCostBreakdown() {
        // Get the purchase price from the input field
        const purchasePriceInput = document.getElementById('purchasePrice');
        if (purchasePriceInput && purchasePriceInput.value) {
            const purchasePrice = parseFloat(purchasePriceInput.value) || 0;
            
            // Create a basic visual breakdown with default values
            if (purchasePrice > 0) {
                const additionalCostsValues = {
                    propertyTransferTaxValue: purchasePrice * 0.05,  // Assume 5% as default
                    propertyTransferTaxPercent: 5,
                    realEstateAgentValue: purchasePrice * 0.0375,    // Assume 3.75% as default
                    realEstateAgentPercent: 3.75,
                    notaryFeesValue: purchasePrice * 0.015,          // Assume 1.5% as default
                    notaryFeesPercent: 1.5,
                    landRegistryValue: purchasePrice * 0.005,        // Assume 0.5% as default
                    landRegistryPercent: 0.5
                };
                
                // Update the visualization
                if (window.updateCostPanelVisuals) {
                    window.updateCostPanelVisuals(purchasePrice, additionalCostsValues);
                }
            }
        }
    }
    
    // Call the initialization function
    initCostBreakdown();
    
    // Ensure we have access to the formatting functions from pro_script.js
    function localFormatCurrency(value) {
        if (typeof formatCurrency === 'function') {
            return formatCurrency(value);
        }
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }
    
    function localFormatPercent(value) {
        if (typeof formatPercent === 'function') {
            return formatPercent(value);
        }
        return value.toFixed(2) + '%';
    }

    // Add this to the global window object to make sure it's available to the main script
    window.updateCostPanelVisuals = function(purchasePrice, additionalCostsValues) {
        // Update purchase price display
        const purchasePriceSummary = document.getElementById('purchasePriceSummary');
        if (purchasePriceSummary) {
            purchasePriceSummary.textContent = localFormatCurrency(purchasePrice);
        }
        
        // Calculate percentages for visual breakdown
        if (!purchasePrice) return;
        
        const total = purchasePrice + 
            (additionalCostsValues.propertyTransferTaxValue || 0) + 
            (additionalCostsValues.realEstateAgentValue || 0) + 
            (additionalCostsValues.notaryFeesValue || 0) + 
            (additionalCostsValues.landRegistryValue || 0);
            
        // Update visual segments
        const purchasePriceSegment = document.getElementById('purchasePriceSegment');
        const propertyTaxSegment = document.getElementById('propertyTaxSegment');
        const agentFeeSegment = document.getElementById('agentFeeSegment');
        const notarySegment = document.getElementById('notarySegment');
        const registrySegment = document.getElementById('registrySegment');
        
        if (purchasePriceSegment) {
            const percentPurchase = (purchasePrice / total) * 100;
            purchasePriceSegment.style.width = percentPurchase + '%';
        }
        
        if (propertyTaxSegment && additionalCostsValues.propertyTransferTaxValue) {
            const percentTax = (additionalCostsValues.propertyTransferTaxValue / total) * 100;
            propertyTaxSegment.style.width = percentTax + '%';
        }
        
        if (agentFeeSegment && additionalCostsValues.realEstateAgentValue) {
            const percentAgent = (additionalCostsValues.realEstateAgentValue / total) * 100;
            agentFeeSegment.style.width = percentAgent + '%';
        }
        
        if (notarySegment && additionalCostsValues.notaryFeesValue) {
            const percentNotary = (additionalCostsValues.notaryFeesValue / total) * 100;
            notarySegment.style.width = percentNotary + '%';
        }
        
        if (registrySegment && additionalCostsValues.landRegistryValue) {
            const percentRegistry = (additionalCostsValues.landRegistryValue / total) * 100;
            registrySegment.style.width = percentRegistry + '%';
        }
        
        // Update percentage displays
        const propertyTransferTaxPercentDisplay = document.getElementById('propertyTransferTaxPercentDisplay');
        const realEstateAgentPercentDisplay = document.getElementById('realEstateAgentPercentDisplay');
        const notaryFeesPercentDisplay = document.getElementById('notaryFeesPercentDisplay');
        const landRegistryPercentDisplay = document.getElementById('landRegistryPercentDisplay');
        
        if (propertyTransferTaxPercentDisplay && additionalCostsValues.propertyTransferTaxPercent) {
            propertyTransferTaxPercentDisplay.textContent = localFormatPercent(additionalCostsValues.propertyTransferTaxPercent);
        }
        
        if (realEstateAgentPercentDisplay && additionalCostsValues.realEstateAgentPercent) {
            realEstateAgentPercentDisplay.textContent = localFormatPercent(additionalCostsValues.realEstateAgentPercent);
        }
        
        if (notaryFeesPercentDisplay && additionalCostsValues.notaryFeesPercent) {
            notaryFeesPercentDisplay.textContent = localFormatPercent(additionalCostsValues.notaryFeesPercent);
        }
        
        if (landRegistryPercentDisplay && additionalCostsValues.landRegistryPercent) {
            landRegistryPercentDisplay.textContent = localFormatPercent(additionalCostsValues.landRegistryPercent);
        }
    };
});
