import { useState } from 'react';
import { FileText, Upload, Download, Trash2, Loader2, CheckCircle, XCircle, X, Shield, Scroll, Receipt, File } from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import type { Document } from '../types';

type FilterType = '' | 'trust' | 'insurance' | 'tax_return' | 'other';

const typeIcons: Record<string, React.ElementType> = {
  trust: Scroll,
  will: Scroll,
  insurance: Shield,
  tax_return: Receipt,
  deed: FileText,
  other: File,
};

const typeColors: Record<string, string> = {
  trust: 'bg-green-100 text-green-700',
  will: 'bg-emerald-100 text-emerald-700',
  insurance: 'bg-green-50 text-green-600',
  tax_return: 'bg-stone-100 text-stone-700',
  deed: 'bg-emerald-50 text-emerald-600',
  other: 'bg-stone-100 text-stone-600',
};

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  pending: { color: 'bg-amber-100 text-amber-700', icon: File, label: 'Pending' },
  processing: { color: 'bg-stone-100 text-stone-700', icon: Loader2, label: 'Processing' },
  completed: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, label: 'Completed' },
  failed: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Failed' },
};

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: '' },
  { label: 'Trusts', value: 'trust' },
  { label: 'Insurance', value: 'insurance' },
  { label: 'Tax Returns', value: 'tax_return' },
  { label: 'Other', value: 'other' },
];

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [filterType, setFilterType] = useState<FilterType>('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const filtered = filterType ? documents.filter(d => d.type === filterType) : documents;

  const handleUpload = () => {
    const newDoc: Document = {
      id: `doc${Date.now()}`,
      type: 'other',
      title: `Uploaded Document ${documents.length + 1}`,
      fileName: `document_${documents.length + 1}.pdf`,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'processing',
    };
    setDocuments(prev => [newDoc, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setDocuments(prev =>
        prev.map(d => d.id === newDoc.id ? { ...d, status: 'completed' as const } : d)
      );
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Documents</h1>
        <p className="text-surface-400 text-sm mt-1">Upload and manage important files</p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload(); }}
        onClick={handleUpload}
        className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-athena-400 bg-athena-50'
            : 'border-surface-300 bg-surface-50 hover:border-athena-300 hover:bg-athena-50/30'
        }`}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-athena-500' : 'text-surface-400'}`} />
        <p className="text-sm font-medium text-surface-700">
          {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
        </p>
        <p className="text-xs text-surface-400 mt-1">PDF, DOC, JPG, PNG up to 25MB</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-surface-400" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilterType(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterType === f.value
                ? 'bg-athena-600 text-white shadow-lg shadow-athena-600/25'
                : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Document grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => {
          const Icon = typeIcons[doc.type] || FileText;
          const status = statusConfig[doc.status];
          const StatusIcon = status.icon;

          return (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="rounded-2xl bg-white border border-surface-200 p-5 hover:shadow-lg hover:shadow-surface-200/50 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[doc.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-surface-900 truncate">{doc.title}</h3>
                  <p className="text-xs text-surface-400 truncate mt-0.5">{doc.fileName}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-100">
                <p className="text-xs text-surface-400">
                  {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                  <StatusIcon className={`w-3 h-3 ${doc.status === 'processing' ? 'animate-spin' : ''}`} />
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl bg-white border border-surface-200 py-16 text-center">
            <FileText className="w-8 h-8 text-surface-300 mx-auto mb-3" />
            <p className="text-surface-500 font-medium">No documents found</p>
            <p className="text-sm text-surface-400 mt-1">Upload files to get started</p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900">{selectedDoc.title}</h3>
                <button onClick={() => setSelectedDoc(null)} className="p-1 rounded-lg hover:bg-surface-100 transition-colors">
                  <X className="w-5 h-5 text-surface-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-medium text-surface-500 mb-1">File Name</p>
                <p className="text-sm text-surface-800">{selectedDoc.fileName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 mb-1">Type</p>
                <p className="text-sm text-surface-800 capitalize">{selectedDoc.type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 mb-1">Uploaded</p>
                <p className="text-sm text-surface-800">{new Date(selectedDoc.uploadedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 mb-1">Status</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[selectedDoc.status].color}`}>
                  {statusConfig[selectedDoc.status].label}
                </span>
              </div>
              {selectedDoc.extractedData && (
                <div>
                  <p className="text-xs font-medium text-surface-500 mb-1">Extracted Data</p>
                  <pre className="text-xs text-surface-700 bg-surface-50 p-3 rounded-xl overflow-auto max-h-40">
                    {JSON.stringify(selectedDoc.extractedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-surface-100 flex justify-between">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-athena-600 text-white text-sm font-medium hover:bg-athena-700 transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
