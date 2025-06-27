export const reconcileTransactions = (internalData, providerData) => {
  // Create maps for quick lookup
  const internalMap = new Map();
  const providerMap = new Map();
  
  // Normalize and map internal data
  internalData.forEach(transaction => {
    const ref = transaction.transaction_reference?.toString().trim();
    if (ref) {
      internalMap.set(ref, {
        ...transaction,
        amount: parseFloat(transaction.amount || 0),
        source: 'internal'
      });
    }
  });
  
  // Normalize and map provider data
  providerData.forEach(transaction => {
    const ref = transaction.transaction_reference?.toString().trim();
    if (ref) {
      providerMap.set(ref, {
        ...transaction,
        amount: parseFloat(transaction.amount || 0),
        source: 'provider'
      });
    }
  });
  
  const matched = [];
  const internalOnly = [];
  const providerOnly = [];
  const amountMismatches = [];
  const statusMismatches = [];
  
  // Find matches and internal-only transactions
  internalMap.forEach((internalTxn, ref) => {
    const providerTxn = providerMap.get(ref);
    
    if (providerTxn) {
      // Transaction exists in both files
      const issues = [];
      
      // Check for amount mismatch
      if (Math.abs(internalTxn.amount - providerTxn.amount) > 0.01) {
        issues.push('Amount Mismatch');
        amountMismatches.push({
          transaction_reference: ref,
          internal_amount: internalTxn.amount,
          provider_amount: providerTxn.amount,
          difference: internalTxn.amount - providerTxn.amount
        });
      }
      
      // Check for status mismatch
      const normalizeStatus = (status) => status?.toLowerCase().trim();
      if (normalizeStatus(internalTxn.status) !== normalizeStatus(providerTxn.status)) {
        issues.push('Status Mismatch');
        statusMismatches.push({
          transaction_reference: ref,
          internal_status: internalTxn.status,
          provider_status: providerTxn.status
        });
      }
      
      matched.push({
        ...internalTxn,
        provider_amount: providerTxn.amount,
        provider_status: providerTxn.status,
        issues: issues
      });
      
      // Remove from provider map to track what's left
      providerMap.delete(ref);
    } else {
      // Transaction only exists in internal file
      internalOnly.push(internalTxn);
    }
  });
  
  // Remaining transactions in provider map are provider-only
  providerMap.forEach((providerTxn) => {
    providerOnly.push(providerTxn);
  });
  
  return {
    matched,
    internalOnly,
    providerOnly,
    amountMismatches,
    statusMismatches,
    summary: {
      totalInternal: internalData.length,
      totalProvider: providerData.length,
      matchedCount: matched.length,
      internalOnlyCount: internalOnly.length,
      providerOnlyCount: providerOnly.length,
      amountMismatchCount: amountMismatches.length,
      statusMismatchCount: statusMismatches.length
    }
  };
};