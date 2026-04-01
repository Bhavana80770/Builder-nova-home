import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileUp, 
  FileText, 
  Download, 
  Trash2, 
  Search, 
  Cloud, 
  ShieldCheck, 
  Eye, 
  Loader2,
  FileBadge,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

interface MedicalReport {
  id: string;
  name: string;
  fileName: string; // Real storage path/name
  url: string;      // Download URL
  date: string;
  type: string;
  size: string;
  status: "Stored" | "Syncing" | "Encrypted";
}

const HealthVault = () => {
  const [reports, setReports] = useState<MedicalReport[]>([
    { id: "1", name: "Blood_Report_Jan.pdf", fileName: "1711951200000_Blood_Report_Jan.pdf", url: "#", date: "Jan 12, 2026", type: "Lab Report", size: "1.2 MB", status: "Stored" },
    { id: "2", name: "XRay_Chest_Main.jpg", fileName: "1712037600000_XRay_Chest_Main.jpg", url: "#", date: "Feb 05, 2026", type: "Radiology", size: "4.5 MB", status: "Encrypted" },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validation (Type & Size)
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("⚠️ Only PDF and Image files (JPG/PNG) are supported.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("⚠️ File size must be less than 5MB.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // 2. Unique File Naming
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `reports/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 3. Firebase Upload Logic
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.error("Upload Error:", error);
        alert("❌ Upload failed. Please check your Firebase settings.");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newReport: MedicalReport = {
            id: Date.now().toString(),
            name: file.name,
            fileName: uniqueFileName,
            url: downloadURL,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            type: file.type.split("/")[1].toUpperCase() + " File",
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            status: "Stored",
          };
          setReports([newReport, ...reports]);
          setIsUploading(false);
          setUploadProgress(0);
        });
      }
    );
  };

  const deleteReport = async (report: MedicalReport) => {
    try {
      // 1. Real Delete from Firebase
      const fileRef = ref(storage, `reports/${report.fileName}`);
      await deleteObject(fileRef);
      
      // 2. State Cleanup
      setReports(reports.filter(r => r.id !== report.id));
      alert("✅ File deleted successfully from cloud.");
    } catch (error) {
      console.error("Delete Error:", error);
      // Still remove from UI if file doesn't exist in cloud (maybe manually deleted)
      setReports(reports.filter(r => r.id !== report.id));
    }
  };

  const filteredReports = reports.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="urban-vault" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar / Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <div className="text-navy-400 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Urban Smart Healthcare
            </div>
            <h2 className="text-4xl font-bold text-navy-500 mb-6 leading-tight">
              Your Digital <br />
              <span className="text-emerald-500">Health Vault</span>
            </h2>
            <p className="text-navy-400 text-lg mb-10 leading-relaxed">
              Securely store and manage your medical prescriptions, lab reports, and imaging history. Access them anytime, anywhere with bank-grade encryption.
            </p>

            {/* Upload Area */}
            <div className="relative group">
              <input 
                type="file" 
                onChange={handleUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed" 
              />
              <div className={cn(
                "border-2 border-dashed border-emerald-100 rounded-[40px] p-8 text-center transition-all group-hover:border-emerald-500 group-hover:bg-emerald-50/20",
                isUploading ? "bg-emerald-50/30" : "bg-white"
              )}>
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <div className="relative">
                      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-emerald-600">
                        {uploadProgress}%
                      </div>
                    </div>
                    <p className="font-bold text-emerald-600 animate-pulse">Uploading Securely...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                      <FileUp className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-navy-500 font-black">Click or Drag Reports</h4>
                      <p className="text-navy-300 text-sm mt-1">Supports PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-navy-50/50 rounded-2xl border border-navy-50 flex items-center gap-4">
               <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                 <Cloud className="w-5 h-5 text-blue-500" />
               </div>
               <div className="flex-1">
                 <div className="h-2 w-full bg-navy-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[65%]" />
                 </div>
                 <p className="text-[10px] font-bold text-navy-400 mt-1">650MB / 1GB Cloud Storage Used</p>
               </div>
            </div>
          </motion.div>

          {/* Report List */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/3 w-full bg-navy-50/30 rounded-[50px] p-8 lg:p-12 border border-white"
          >
            {/* Search Top */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
              <div className="text-navy-500 font-black text-xl flex items-center gap-3">
                <FileBadge className="w-6 h-6 text-emerald-500" />
                Recent Records ({reports.length})
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-200" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm font-bold text-navy-500 shadow-sm"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredReports.length === 0 ? (
                   <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center text-navy-300 font-bold"
                  >
                    No matching records found.
                  </motion.div>
                ) : (
                  filteredReports.map((report) => (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white p-5 rounded-[30px] shadow-sm hover:shadow-xl hover:shadow-navy-100/50 border border-transparent hover:border-emerald-50 transition-all flex flex-col sm:flex-row items-center gap-6"
                    >
                      <div className="w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center text-navy-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                        <FileText className="w-7 h-7" />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-navy-500 font-bold truncate max-w-[200px] mb-1">{report.name}</h4>
                        <div className="flex items-center justify-center sm:justify-start gap-3 text-[10px] font-black uppercase tracking-widest text-navy-300">
                          <span>{report.date}</span>
                          <span className="w-1 h-1 bg-navy-200 rounded-full" />
                          <span>{report.type}</span>
                          <span className="w-1 h-1 bg-navy-200 rounded-full" />
                          <span className={cn(
                             report.status === "Encrypted" ? "text-emerald-500" : "text-blue-500"
                          )}>{report.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => window.open(report.url, "_blank")}
                          className="p-3 bg-navy-50 text-navy-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm" 
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a 
                          href={report.url} 
                          download={report.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-navy-50 text-navy-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center justify-center" 
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button 
                          onClick={() => deleteReport(report)}
                          className="p-3 bg-navy-50 text-navy-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealthVault;
