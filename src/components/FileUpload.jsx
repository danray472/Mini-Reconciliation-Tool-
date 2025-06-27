import { useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

const FileUpload = ({ onFileUpload, label, description, accept = ".csv", uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const removeFile = () => {
    onFileUpload(null);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block text-lg font-bold text-gray-900 mb-2">
          {label}
        </label>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
      </div>
      
      {uploadedFile ? (
        <div className="card bg-success-50 border-success-200 border-2 transition-all hover:scale-105">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-xl">
                  <CheckCircle className="h-7 w-7 text-success-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-success-800">
                    {uploadedFile.name}
                  </div>
                  <div className="text-sm text-success-600 font-medium">
                    {(uploadedFile.size / 1024).toFixed(1)} KB • CSV File
                  </div>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-2 hover:bg-success-100 rounded-xl transition-colors group"
                title="Remove file"
              >
                <X className="h-5 w-5 text-success-600 group-hover:text-success-700" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative card transition-all cursor-pointer ${
            dragActive
              ? 'border-primary-400 bg-primary-50 scale-105 shadow-lg'
              : 'border-gray-300 hover:border-primary-300 hover:bg-primary-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="p-12 text-center">
            <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all ${
              dragActive ? 'bg-primary-600 scale-110' : 'bg-primary-100'
            }`}>
              <Upload className={`h-8 w-8 transition-colors ${
                dragActive ? 'text-white' : 'text-primary-600'
              }`} />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-gray-900">
                {dragActive ? 'Drop your file here' : 'Drop your CSV file here'}
              </p>
              <p className="text-gray-600">
                or <span className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">browse</span> to choose a file
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Supports CSV files up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;