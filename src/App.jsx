import { useState } from 'react';
import { FileText, BarChart3, User, TrendingUp, Shield, Zap } from 'lucide-react';
import FileUpload from './components/FileUpload';
import ReconciliationSummary from './components/ReconciliationSummary';
import Spinner from './components/Spinner';
import { parseCSV, exportToCSV } from './utils/csvParser';
import { reconcileTransactions } from './utils/reconciliation';

function App() {



  const [internalFile, setInternalFile] = useState(null);
  const [providerFile, setProviderFile] = useState(null);
  const [internalData, setInternalData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [reconciliationResults, setReconciliationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file, type) => {
    if (!file) {
      if (type === 'internal') {
        setInternalFile(null);
        setInternalData([]);
      } else {
        setProviderFile(null);
        setProviderData([]);
      }
      setReconciliationResults(null);
      return;
    }

    try {
      setError(null);
      const data = await parseCSV(file);
      
      if (type === 'internal') {
        setInternalFile(file);
        setInternalData(data);
      } else {
        setProviderFile(file);
        setProviderData(data);
      }
    } catch (err) {
      setError(`Error parsing ${type} file: ${err.message}`);
    }
  };

  const runReconciliation = async () => {
    if (!internalData.length || !providerData.length) {
      setError('Please upload both files before running reconciliation');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const results = reconcileTransactions(internalData, providerData);
      setReconciliationResults(results);
    } catch (err) {
      setError(`Reconciliation error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (category, data) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `reconciliation_${category}_${timestamp}.csv`;
    exportToCSV(data, filename);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header with Gradient */}
      <div className="gradient-bg shadow-xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center w-full gap-4 py-6 sm:flex-row sm:justify-between sm:items-center sm:gap-8 sm:py-4">
            {/* Logo + Title + Subtitle */}
            <div className="flex flex-col items-center w-full sm:flex-row sm:items-center sm:gap-4 sm:w-auto">
              <BarChart3 className="h-12 w-12 text-primary-100 mb-2 sm:mb-0 sm:mr-2" />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white leading-tight">Transaction Reconciliation Tool</h1>
                <p className="text-primary-100 font-medium mt-1">Enterprise-grade financial data analysis platform</p>
              </div>
            </div>
            {/* Badges + Developed by Dan */}
            <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-end sm:items-center sm:w-auto sm:gap-6 sm:mt-0 mt-4">
              <div className="hidden sm:flex flex-row gap-6 w-auto text-primary-100 justify-center">
                <div className="hidden sm:flex items-center gap-1">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">Fast</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Accurate</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-white/30 bg-white/10 w-fit">
                <User className="h-5 w-5 text-black" />
                <span className="text-gray-900 font-semibold">Developed by Dan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-12">
        {loading && (
          <Spinner />
        )}
        {!loading && error && (
          <div className="mb-8 animate-fadeIn">
            <div className="card bg-error-50 border-error-200 border-2">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-error-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-error-800">Processing Error</h3>
                    <p className="text-error-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div className="card mb-12 animate-fadeIn">
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
                <FileText className="h-7 w-7 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Upload Transaction Files</h2>
                <p className="text-gray-600 mt-1">Upload your CSV files to begin the reconciliation process</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
              <div className="animate-slideIn">
                <FileUpload
                  label="Internal System Export"
                  description="Your platform's transaction records"
                  onFileUpload={(file) => handleFileUpload(file, 'internal')}
                  uploadedFile={internalFile}
                />
              </div>
              <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
                <FileUpload
                  label="Payment Provider Statement"
                  description="Payment processor's transaction records"
                  onFileUpload={(file) => handleFileUpload(file, 'provider')}
                  uploadedFile={providerFile}
                />
              </div>
            </div>

            {internalData.length > 0 && providerData.length > 0 && (
              <div className="flex items-center justify-between pt-8 border-t border-gray-200 animate-fadeIn">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">{internalData.length}</div>
                    <div className="text-sm font-medium text-gray-600">Internal Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">{providerData.length}</div>
                    <div className="text-sm font-medium text-gray-600">Provider Transactions</div>
                  </div>
                </div>
                <button
                  onClick={runReconciliation}
                  disabled={loading}
                  className="btn btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Reconciliation...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Run Reconciliation Analysis
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {reconciliationResults && (
          <div className="animate-fadeIn">
            <ReconciliationSummary
              results={reconciliationResults}
              onExport={handleExport}
            />
          </div>
        )}

        {/* Enhanced Instructions */}
        {!reconciliationResults && (
          <div className="card bg-primary-50 border-primary-200 border-2 animate-fadeIn">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-900">How to Use This Tool</h3>
                  <p className="text-primary-700 mt-1">Follow these steps for accurate reconciliation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary-800">File Requirements</h4>
                  <div className="space-y-3 text-primary-700">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <p>Upload CSV files with proper formatting</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <p>Ensure files contain: <code className="bg-primary-100 px-2 py-1 rounded text-sm">transaction_reference</code>, <code className="bg-primary-100 px-2 py-1 rounded text-sm">amount</code>, <code className="bg-primary-100 px-2 py-1 rounded text-sm">status</code>, <code className="bg-primary-100 px-2 py-1 rounded text-sm">date</code></p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <p>Transaction matching uses the <code className="bg-primary-100 px-2 py-1 rounded text-sm">transaction_reference</code> field</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary-800">Analysis Features</h4>
                  <div className="space-y-3 text-primary-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                      <p>Identifies perfectly matched transactions</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                      <p>Detects amount and status discrepancies</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                      <p>Highlights missing transactions in either file</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <p>Export detailed reports for each category</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;