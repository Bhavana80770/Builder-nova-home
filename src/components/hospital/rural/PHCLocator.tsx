import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Phone, Clock, Search, Map as MapIcon, Loader2, Navigation2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PHCCenter {
  id: number;
  name: string;
  distance: string;
  address: string;
  phone: string;
  type: "PHC" | "Government Hospital";
  status: "Open" | "Emergency Only" | "Closed";
  lat: number;
  lng: number;
}

const mockPHCs: PHCCenter[] = [
  {
    id: 1,
    name: "Amanpur Primary Health Center",
    distance: "1.2 km",
    address: "Main Road, Amanpur Village",
    phone: "+91 98765 43210",
    type: "PHC",
    status: "Open",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: 2,
    name: "District Civil Hospital",
    distance: "3.5 km",
    address: "Hospital Square, Tehsil Road",
    phone: "011-2345678",
    type: "Government Hospital",
    status: "Open",
    lat: 12.9720,
    lng: 77.5950,
  },
  {
    id: 3,
    name: "Kalyanpur Community Health Center",
    distance: "5.8 km",
    address: "Near Post Office, Kalyanpur",
    phone: "+91 99887 76655",
    type: "PHC",
    status: "Open",
    lat: 12.9730,
    lng: 77.5960,
  },
];

const PHCLocator = () => {
  const [loading, setLoading] = useState(false);
  const [centers, setCenters] = useState<PHCCenter[]>([]);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleFindNearby = () => {
    setLoading(true);
    // Simulate geolocation and API call
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setTimeout(() => {
            setCenters(mockPHCs);
            setLoading(false);
            setLocationEnabled(true);
          }, 1500);
        },
        () => {
          // Fallback if permission denied
          setTimeout(() => {
            setCenters(mockPHCs);
            setLoading(false);
            setLocationEnabled(false);
          }, 1500);
        }
      );
    } else {
      setTimeout(() => {
        setCenters(mockPHCs);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <section id="rural-care" className="py-24 bg-navy-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="text-emerald-600 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <MapIcon className="w-4 h-4" />
              Rural Accessibility
            </div>
            <h2 className="text-4xl font-bold text-navy-500 mb-6 leading-tight">
              Find Your Nearest <span className="text-emerald-500">Government Center</span>
            </h2>
            <p className="text-navy-400 text-lg mb-8 leading-relaxed">
              We help you locate state-run Primary Health Centers (PHC) and civil hospitals in your vicinity for free or specialized medical care.
            </p>
            
            <button 
              onClick={handleFindNearby}
              disabled={loading}
              className="flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Locating Centers...
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5 group-hover:animate-pulse" />
                  Find Nearby PHCs
                </>
              )}
            </button>
            
            {!locationEnabled && centers.length > 0 && (
              <p className="mt-4 text-xs text-navy-300 font-medium italic">
                * Showing approximate locations based on your region.
              </p>
            )}
          </motion.div>

          {/* Right: List/Results */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {centers.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full bg-white border-2 border-dashed border-navy-100 rounded-[40px] p-12 flex flex-col items-center justify-center text-center gap-4"
                  >
                    <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center text-navy-200">
                      <Search className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-500">No centers found yet</h3>
                      <p className="text-navy-300">Click the button to scan for nearby healthcare centers.</p>
                    </div>
                  </motion.div>
                ) : (
                  centers.map((center, index) => (
                    <motion.div
                      key={center.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-[35px] shadow-lg shadow-navy-100/20 border border-navy-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/10 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                          center.type === "PHC" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
                        )}>
                          {center.type}
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 font-black text-xs">
                          <Navigation2 className="w-3 h-3" />
                          {center.distance}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-black text-navy-500 mb-2 group-hover:text-emerald-500 transition-colors">
                        {center.name}
                      </h3>
                      
                      <div className="space-y-3 mt-4">
                        <div className="flex items-start gap-2 text-navy-400 text-sm">
                          <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{center.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-navy-400 text-sm">
                          <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{center.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-navy-400 text-sm">
                          <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className={cn(
                            "font-bold",
                            center.status === "Open" ? "text-emerald-500" : "text-amber-500"
                          )}>
                            {center.status}
                          </span>
                        </div>
                      </div>

                      <button className="w-full mt-6 py-3 bg-navy-50 text-navy-500 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-100">
                        Get Directions
                        <MoveRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background patterns */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-navy-100/30 rounded-full blur-3xl opacity-50" />
    </section>
  );
};

const MoveRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 8L22 12L18 16" />
    <path d="M2 12H22" />
  </svg>
);

export default PHCLocator;
