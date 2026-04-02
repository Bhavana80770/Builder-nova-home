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
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

// Cloudinary Configuration (Unsigned)
const CLOUDINARY_CLOUD_NAME = "de8opipom";
const CLOUDINARY_UPLOAD_PRESET = "medinova_upload";

interface MedicalReport {
  id: string;
  name: string;
  url: string;      // Cloudinary secure URL
  date: string;
  type: string;
  size: string;
  status: "Stored" | "Syncing" | "Encrypted";
}

const HealthVault = () => {
  const { t } = useLanguage();
  const [reports, setReports] = useState<MedicalReport[]>([
    { id: "1", name: "Diabetes_Type2_Progress_Report_2026.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", date: "Jan 12, 2026", type: "Disease Report", size: "1.2 MB", status: "Stored" },
    { id: "2", name: "Hypertension_Cardiac_Risk_Analysis.pdf", url: "https://res.cloudinary.com/demo/image/upload/v1/sample.jpg", date: "Feb 05, 2026", type: "Cardiology", size: "3.5 MB", status: "Encrypted" },
    { id: "3", name: "Chronic_Kidney_Management_Plan.pdf", url: "https://res.cloudinary.com/demo/image/upload/v1619000000/sample.jpg", date: "Feb 28, 2026", type: "Disease Report", size: "0.8 MB", status: "Syncing" },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validation (Type & Size)
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('healthVault.uploadError'), {
        icon: <XCircle className="w-4 h-4" />,
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit", {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading(t('healthVault.uploading'));

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      const newReport: MedicalReport = {
        id: Date.now().toString(),
        name: file.name,
        url: data.secure_url,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        type: file.type.split("/")[1].toUpperCase() + " File",
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        status: "Stored",
      };

      setReports([newReport, ...reports]);
      toast.success(t('healthVault.uploadSuccess'), {
        id: toastId,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      });

      // Open file in new tab
      window.open(data.secure_url, "_blank");

    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      toast.error(t('healthVault.uploadError'), {
        id: toastId,
        icon: <XCircle className="w-4 h-4 text-red-500" />,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteReport = (reportId: string) => {
    setReports(reports.filter(r => r.id !== reportId));
    toast.success(t('healthVault.removed'), {
      icon: <Trash2 className="w-4 h-4 text-emerald-500" />,
    });
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
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="text-navy-400 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {t('healthVault.tag')}
            </div>
            <h2 className="text-4xl font-bold text-navy-500 mb-6 leading-tight">
              {t('healthVault.title')}
            </h2>
            <p className="text-navy-400 text-lg mb-10 leading-relaxed">
              {t('healthVault.desc')}
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
                <AnimatePresence mode="wait">
                  {isUploading ? (
                    <motion.div 
                      key="uploading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4 py-4"
                    >
                      <div className="relative">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                      </div>
                      <p className="font-bold text-emerald-600 animate-pulse">{t('healthVault.uploading')}</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-100/50">
                        <FileUp className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-navy-500 font-black">{t('healthVault.uploadTitle')}</h4>
                        <p className="text-navy-300 text-sm mt-1">{t('healthVault.uploadDesc')}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8 p-4 bg-navy-100/30 rounded-2xl border border-navy-50 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <Cloud className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-full bg-navy-200/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
                <p className="text-[10px] font-black text-navy-400 mt-1 uppercase tracking-wider">650MB / 1GB {t('healthVault.stored')}</p>
              </div>
            </div>
          </motion.div>

          {/* Report List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full bg-navy-50/30 rounded-[50px] p-8 lg:p-12 border border-white"
          >
            {/* Search Top */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
              <div className="text-navy-500 font-black text-xl flex items-center gap-3">
                <FileBadge className="w-6 h-6 text-emerald-500" />
                {t('healthVault.recentRecords')} ({reports.length})
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-200" />
                <input
                  type="text"
                  placeholder={t('healthVault.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm font-bold text-navy-500 shadow-sm"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredReports.length === 0 ? (
                  <motion.div
                    key="empty-search"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-24 text-center"
                  >
                    <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center text-navy-200 mx-auto mb-6">
                      <Search className="w-10 h-10" />
                    </div>
                    <p className="text-navy-300 font-bold text-lg">No matching records found.</p>
                  </motion.div>
                ) : (
                  filteredReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group bg-white p-5 rounded-[30px] shadow-sm hover:shadow-xl hover:shadow-navy-100/50 border border-transparent hover:border-emerald-50 transition-all flex flex-col sm:flex-row items-center gap-6"
                    >
                      <div className="w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center text-navy-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                        <FileText className="w-7 h-7" />
                      </div>

                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <h4 className="text-navy-500 font-bold truncate mb-1">{report.name}</h4>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-widest text-navy-300">
                          <span>{report.date}</span>
                          <span className="w-1 h-1 bg-navy-200 rounded-full hidden sm:block" />
                          <span>{report.type}</span>
                          <span className="w-1 h-1 bg-navy-200 rounded-full hidden sm:block" />
                          <span className={cn(
                             "px-2 py-0.5 rounded-full",
                             report.status === "Encrypted" ? "bg-emerald-50 text-emerald-500" : "bg-navy-50 text-navy-500"
                          )}>
                            {t(`healthVault.${report.status.toLowerCase()}`)}
                          </span>
                        </div>
                      </div>

                      {/* RIGHT SECTION - flex-shrink-0 and gap-5 to match center section density */}
                      <div className="flex items-center gap-5 flex-shrink-0">
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
                          onClick={() => deleteReport(report.id)}
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

