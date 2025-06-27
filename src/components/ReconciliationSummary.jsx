import { CheckCircle, AlertTriangle, XCircle, Download, TrendingUp, AlertCircle } from 'lucide-react';

const ReconciliationSummary = ({ results, onExport }) => {
  const { matched, internalOnly, providerOnly, amountMismatches, statusMismatches } = results;

  const summaryCards = [
    {
      title: 'Matched Transactions',
      count: matched.length,
      icon: CheckCircle,
      color: 'success',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      textColor: 'text-success-800',
      iconColor: 'text-success-600',
      description: 'Perfect matches found'
    },
    {
      title: 'Internal Only',
      count: internalOnly.length,
      icon: AlertTriangle,
      color: 'warning',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      textColor: 'text-warning-800',
      iconColor: 'text-warning-600',
      description: 'Missing from provider'
    },
    {
      title: 'Provider Only',
      count: providerOnly.length,
      icon: XCircle,
      color: 'error',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      textColor: 'text-error-800',
      iconColor: 'text-error-600',
      description: 'Missing from internal'
    }
  ];

  const totalTransactions = matched.length + internalOnly.length + providerOnly.length;
  const matchRate = totalTransactions > 0 ? ((matched.length / totalTransactions) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-8">
      {/* Header with Key Metrics */}
      <div className="card gradient-bg text-white">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Reconciliation Complete</h2>
                <p className="text-primary-100 text-lg">Analysis results and detailed breakdown</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-extrabold">{matchRate}%</div>
              <div className="text-primary-100 font-medium">Match Rate</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white bg-opacity-90 shadow-lg border border-gray-200 rounded-2xl p-6 hover:bg-opacity-100 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${card.iconColor}`} />
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${card.textColor}`}>{card.count}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${card.textColor} mb-1`}>{card.title}</h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Discrepancies Alert */}
      {(amountMismatches.length > 0 || statusMismatches.length > 0) && (
        <div className="card bg-warning-50 border-warning-200 border-2 animate-fadeIn">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-warning-100 rounded-xl">
                <AlertCircle className="h-7 w-7 text-warning-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-warning-800">Data Discrepancies Detected</h3>
                <p className="text-warning-700">Review these mismatches for accuracy</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amountMismatches.length > 0 && (
                <div className="bg-warning-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-warning-800">{amountMismatches.length}</div>
                  <div className="text-warning-700 font-medium">Amount Mismatches</div>
                </div>
              )}
              {statusMismatches.length > 0 && (
                <div className="bg-warning-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-warning-800">{statusMismatches.length}</div>
                  <div className="text-warning-700 font-medium">Status Mismatches</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Results */}
      <div className="space-y-8">
        {[
          { key: 'matched', title: 'Matched Transactions', data: matched, color: 'success', icon: CheckCircle },
          { key: 'internalOnly', title: 'Present Only in Internal File', data: internalOnly, color: 'warning', icon: AlertTriangle },
          { key: 'providerOnly', title: 'Present Only in Provider File', data: providerOnly, color: 'error', icon: XCircle }
        ].map(({ key, title, data, color, icon: Icon }) => (
          <div key={key} className="card animate-fadeIn">
            <div className={`px-8 py-6 bg-${color}-50 border-b border-${color}-200 flex items-center justify-between`}>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 bg-${color}-100 rounded-xl`}>
                  <Icon className={`h-7 w-7 text-${color}-600`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="text-gray-600">{data.length} transactions found</p>
                </div>
              </div>
              <button
                onClick={() => onExport(key, data)}
                className={`btn btn-${color} flex items-center space-x-2`}
              >
                <Download className="h-5 w-5" />
                <span>Export CSV</span>
              </button>
            </div>
            
            {data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Transaction Reference</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Date</th>
                      {key === 'matched' && (
                        <th className="text-left">Issues</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 10).map((transaction, index) => (
                      <tr key={index} className="hover:bg-primary-50 transition-colors">
                        <td className="font-semibold text-gray-900">
                          {transaction.transaction_reference}
                        </td>
                        <td className="font-medium text-gray-900">
                          ${parseFloat(transaction.amount || 0).toFixed(2)}
                        </td>
                        <td>
                          <span className={`status-badge status-${transaction.status}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="text-gray-700">
                          {transaction.date}
                        </td>
                        {key === 'matched' && (
                          <td>
                            {transaction.issues && transaction.issues.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {transaction.issues.map((issue, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-warning-100 text-warning-800"
                                  >
                                    {issue}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length > 10 && (
                  <div className="px-8 py-4 bg-gray-50 text-center border-t border-gray-200">
                    <p className="text-gray-600">
                      Showing first 10 of <span className="font-semibold">{data.length}</span> transactions. 
                      <span className="text-primary-600 font-semibold"> Export CSV to see all results.</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-8 py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h4>
                <p className="text-gray-600">No transactions found in this category</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReconciliationSummary;