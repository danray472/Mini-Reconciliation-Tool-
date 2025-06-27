# Sample CSV Files for Testing

This folder contains sample CSV files to test the reconciliation tool:

## Files Included

### 1. `internal_transactions.csv`
- Contains 12 transactions from your internal system
- Includes: transaction_reference, amount, status, date, description
- Status values: completed, pending, failed

### 2. `provider_statement.csv` 
- Contains 12 transactions from the payment provider
- Includes: transaction_reference, amount, status, date, processor_fee
- Status values: success, pending, failed

## Test Scenarios Covered

### ✅ **Matched Transactions** (7 matches)
- TXN001, TXN002, TXN004, TXN006, TXN007, TXN008, TXN009, TXN010

### ⚠️ **Internal Only** (4 transactions)
- TXN003 (amount mismatch: $200 vs $195)
- TXN005 (missing from provider)
- TXN011 (missing from provider) 
- TXN012 (missing from provider)

### ❌ **Provider Only** (3 transactions)
- TXN013 (missing from internal)
- TXN014 (missing from internal)
- TXN015 (missing from internal)

### 🔍 **Data Discrepancies**
- **Amount Mismatch**: TXN003 ($200.00 internal vs $195.00 provider)
- **Status Mismatch**: TXN001 (completed vs success), TXN002 (completed vs success), etc.

## How to Use

1. Download both CSV files
2. Upload `internal_transactions.csv` as "Internal System Export"
3. Upload `provider_statement.csv` as "Payment Provider Statement"  
4. Click "Run Reconciliation" to see the results
5. Test the export functionality for each category

## Expected Results

- **Total Internal**: 12 transactions
- **Total Provider**: 12 transactions  
- **Matched**: 7 transactions
- **Internal Only**: 4 transactions
- **Provider Only**: 3 transactions
- **Amount Mismatches**: 1 transaction
- **Status Mismatches**: 7 transactions (due to completed vs success)