import React, { useState, useRef } from "react";
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
  Lock,
  X,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface MedicalReport {
  id: string;
  name: string;
  date: string;
  category: string;
  fileUrl: string;
  thumbnailUrl?: string;
}

const HealthVault = () => {
  const { t } = useLanguage();
  const [reports, setReports] = useState<MedicalReport[]>([
    {
      id: "1",
      name: "diabetes_report",
      date: "", 
      category: "pathology",
      fileUrl: "/reports/diabetes.pdf",
      thumbnailUrl: "/reports/diabetes_report.png"
    },
    {
      id: "2",
      name: "hypertension_report",
      date: "",
      category: "cardiology",
      fileUrl: "/reports/hypertension.pdf",
      thumbnailUrl: "/reports/hypertension_cardiac_report.png"
    },
    {
      id: "3",
      name: "kidney_report",
      date: "",
      category: "nephrology",
      fileUrl: "/reports/kidney.pdf",
      thumbnailUrl: "/reports/chronic_kidney_report.png"
    }
  ]);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file: File) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      const newReport: MedicalReport = {
        id: Date.now().toString(),
        name: file.name,
        date: "",
        category: "General Report",
        fileUrl: URL.createObjectURL(file)
      };
      setReports([newReport, ...reports]);
      setIsUploading(false);
      toast.success(t("healthVault.uploadSuccess"));
    }, 1500);
  };

  const deleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
    toast.success("Report removed from vault.");
  };

  const filteredReports = reports.filter(report => 
    t(`healthVault.${report.name}`).toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(`healthVault.${report.category}`).toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <section id="urban-vault" className="py-24 bg-white relative overflow-hidden font-sans border-t border-navy-50/50">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-full lg:w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[120px] -mr-64 -mt-64 opacity-60" />
      <div className="absolute bottom-0 left-0 w-full lg:w-[500px] h-[500px] bg-navy-50/40 rounded-full blur-[100px] -ml-64 -mb-64 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar / Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-50 text-navy-500 font-black text-[10px] uppercase tracking-[0.2em] mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {t("healthVault.urbanSmart")}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-navy-500 mb-6 leading-tight">
              {t("healthVault.certifiedVault")}
            </h2>
            <p className="text-lg text-navy-400 mb-10 leading-relaxed font-medium">
              {t("healthVault.vaultDesc")}
            </p>

            {/* Upload Area */}
            <div className="relative group mb-10">
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
              />
              <div className={cn(
                "border-4 border-dashed border-navy-50 rounded-[40px] p-10 text-center transition-all group-hover:border-emerald-500 group-hover:bg-emerald-50/20",
                isUploading ? "bg-navy-50/50" : "bg-white"
              )}>
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <p className="font-black text-navy-500 animate-pulse tracking-[0.1em] text-xs uppercase">Encrypting Assets...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-navy-500 rounded-[30px] flex items-center justify-center text-white shadow-2xl shadow-navy-200 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                      <FileUp className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-navy-500 font-black text-xl mb-1">Upload Laboratory Report</h4>
                      <p className="text-navy-300 text-[10px] font-black uppercase tracking-widest">Supports PDF • Max 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Storage Profile */}
            <div className="bg-navy-500 p-8 rounded-[40px] text-white shadow-2xl shadow-navy-200 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
               <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                      <Cloud className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Cloud Sync Status</p>
                        <p className="text-sm font-bold">MediNova SmartVault</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none text-[10px] font-black">ACTIVE</Badge>
               </div>
               <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden mb-3">
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400" 
                 />
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/50">
                  <span>650MB Used</span>
                  <span>1GB Total</span>
               </div>
            </div>
          </motion.div>

          {/* List Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-2/3 flex flex-col"
          >
            {/* Search Bar */}
            <div className="bg-navy-50/50 backdrop-blur-sm p-4 rounded-[32px] border border-white flex flex-col md:flex-row items-center gap-4 mb-10">
               <div className="relative flex-1 w-full group">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-200 transition-colors group-focus-within:text-emerald-500" />
                 <input
                   type="text"
                   placeholder="Search your medical repository..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-14 pr-6 py-4 bg-white border border-transparent rounded-[24px] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none text-sm font-bold text-navy-500 shadow-sm"
                 />
               </div>
               <div className="flex items-center gap-2 px-6 py-2 bg-white rounded-2xl shadow-sm border border-navy-50">
                  <FileBadge className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-black text-navy-500 uppercase tracking-widest">{reports.length} Reports</span>
               </div>
            </div>

            {/* Records Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-navy-100/40 border border-navy-50/50 hover:border-emerald-100 transition-all flex flex-col overflow-hidden"
                  >
                    {/* Visual Report Preview */}
                    <div className="relative h-64 bg-navy-50/30 p-4 flex items-center justify-center overflow-hidden border-b border-navy-50/50">
                      {report.thumbnailUrl ? (
                         <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                            <img 
                              src={report.thumbnailUrl} 
                              alt={t(`healthVault.${report.name}`) || report.name}
                              className="w-full h-full object-contain drop-shadow-xl"
                            />
                            {/* Overlay for better visibility */}
                            <div className="absolute inset-0 bg-navy-500/0 group-hover:bg-navy-500/5 transition-colors duration-500" />
                         </div>
                      ) : (
                         <div className="flex flex-col items-center gap-2 text-navy-200">
                           <FileText className="w-16 h-16" />
                           <span className="text-[10px] font-black tracking-widest uppercase">No Preview</span>
                         </div>
                      )}
                      
                      {/* Security Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-emerald-500 p-2.5 rounded-2xl shadow-xl z-10 border border-white group-hover:scale-110 transition-transform">
                        <Lock className="w-4 h-4" />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-navy-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                        {t(`healthVault.${report.category}`) || report.category}
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-all duration-500 flex items-center justify-center pointer-events-none">
                         <div className="bg-white text-navy-500 p-4 rounded-3xl shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 border border-navy-50">
                            <Eye className="w-8 h-8 text-emerald-500" />
                         </div>
                      </div>
                      
                      <button 
                         onClick={() => setSelectedReport(report)}
                         className="absolute inset-0 z-20 cursor-pointer"
                         title="Full View"
                      />
                    </div>

                    <div className="p-8 flex flex-col gap-6">
                       <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                             <h4 className="text-xl font-black text-navy-500 leading-tight group-hover:text-emerald-500 transition-colors truncate">
                               {t(`healthVault.${report.name}`) || report.name}
                             </h4>
                          </div>
                          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-navy-300">
                             <Badge className="bg-emerald-50 text-emerald-600 border-none px-2 py-0.5 rounded-md">
                               {t("healthVault.verifiedReport")}
                             </Badge>
                             <Badge className="bg-navy-50 text-navy-400 border-none px-2 py-0.5 rounded-md">
                               {t("healthVault.certifiedBadge")}
                             </Badge>
                          </div>
                       </div>

                       {/* Controls */}
                       <div className="grid grid-cols-2 gap-3">
                         <a 
                           href={report.fileUrl}
                           download
                           className="flex items-center justify-center gap-3 py-4 bg-navy-50 text-navy-500 rounded-[24px] hover:bg-emerald-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest group/btn"
                         >
                            <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                            Download
                         </a>
                         <button 
                           onClick={() => deleteReport(report.id)}
                           className="flex items-center justify-center gap-3 py-4 bg-navy-50 text-navy-300 rounded-[24px] hover:bg-red-50 hover:text-red-500 transition-all font-black text-xs uppercase tracking-widest"
                         >
                            <Trash2 className="w-4 h-4" />
                            Delete
                         </button>
                       </div>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      accept=".pdf,.jpg,.png"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredReports.length === 0 && (
                <div className="py-24 text-center">
                   <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center text-navy-200 mx-auto mb-6">
                      <Search className="w-12 h-12" />
                   </div>
                   <h5 className="text-xl font-bold text-navy-500 mb-2">No Matching Records</h5>
                   <p className="text-navy-400 font-medium tracking-tight">Try searching for a different keyword or category.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Advanced PDF Viewer Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col h-[90vh]"
            >
               {/* Modal Header */}
                <div className="bg-white border-b border-navy-50 px-8 py-6 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-navy-500 leading-tight">
                         {t(`healthVault.${selectedReport.name}`) || selectedReport.name}
                       </h3>
                       <div className="flex items-center gap-4 mt-1">
                          <Badge className="bg-emerald-50 text-emerald-600 border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                            {t("healthVault.certifiedBadge")}
                          </Badge>
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <a 
                       href={selectedReport.fileUrl} 
                       download
                       className="hidden sm:flex items-center gap-2 bg-navy-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-black transition-all shadow-xl shadow-navy-100 hover:shadow-emerald-200 uppercase tracking-widest"
                     >
                        <Download className="w-4 h-4" /> Download
                     </a>
                     <button 
                       onClick={() => setSelectedReport(null)}
                       className="w-14 h-14 bg-navy-50 hover:bg-red-50 text-navy-400 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center"
                     >
                        <X className="w-7 h-7" />
                     </button>
                  </div>
               </div>
               
               {/* Modal Content Area */}
                <div className="flex-1 bg-navy-50 relative overflow-auto custom-scrollbar">
                  {selectedReport.thumbnailUrl ? (
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-12">
                      <img 
                        src={selectedReport.thumbnailUrl} 
                        alt={selectedReport.name}
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                      />
                    </div>
                  ) : (
                    <iframe 
                      src={selectedReport.fileUrl}
                      className="w-full h-full border-none relative z-10"
                      title="MediNova Report Viewer"
                    />
                  )}
                </div>
               
               {/* Modal Footer Branding */}
               <div className="bg-navy-900 px-10 py-5 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Secure View Active</span>
                    </div>
                    <span className="hidden md:block w-px h-4 bg-white/10" />
                    <span className="hidden md:block text-[10px] font-bold text-white/40 uppercase tracking-widest">
                       MediNova SmartLink Technology • Multi-Region Encryption
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Lock className="w-3.5 h-3.5 text-white/40" />
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">© 2026 MediNova Global</span>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HealthVault;

