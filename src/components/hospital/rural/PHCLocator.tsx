import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Phone, Clock, Search, Map as MapIcon, Loader2, Navigation2, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Fix for default Leaflet icon issue in React
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface PHCCenter {
  id: number;
  name: string;
  distance: string;
  address: string;
  phone: string;
  type: "PHC" | "Government Hospital";
  status: "Open" | "Emergency Only" | "Closed";
  position: [number, number];
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
    position: [12.9716, 77.5946],
  },
  {
    id: 2,
    name: "District Civil Hospital",
    distance: "3.5 km",
    address: "Hospital Square, Tehsil Road",
    phone: "011-2345678",
    type: "Government Hospital",
    status: "Open",
    position: [12.9730, 77.5980],
  },
  {
    id: 3,
    name: "Kalyanpur Community Health Center",
    distance: "5.8 km",
    address: "Near Post Office, Kalyanpur",
    phone: "+91 99887 76655",
    type: "PHC",
    status: "Open",
    position: [12.9780, 77.6020],
  },
];

// Helper to fix map rendering and update center
const MapController = ({ position, zoom }: { position: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    // Force Leaflet to recalculate its container size
    // This fixes the "gray/blank box" issue in React
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    map.setView(position, zoom);
  }, [position, zoom, map]);
  return null;
};

const PHCLocator = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [centers, setCenters] = useState<PHCCenter[]>([]);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.9716, 77.5946]);

  const handleFindNearby = () => {
    setLoading(true);
    
    if ("geolocation" in navigator) {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000, // 10s timeout
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos: [number, number] = [latitude, longitude];
          setMapCenter(newPos);
          setUserPosition(newPos);
          setCenters(mockPHCs);
          setLoading(false);
          toast.success(t('phcLocator.liveTracking'));
        },
        (error) => {
          console.error("Geolocation Error:", error);
          // Fallback to a default location (e.g. city center) if access denied or timeout
          const defaultPos: [number, number] = [12.9716, 77.5946];
          setMapCenter(defaultPos);
          setUserPosition(defaultPos);
          setCenters(mockPHCs);
          setLoading(false);
          toast.info(t('phcLocator.fallback'));
        },
        options
      );
    } else {
      const defaultPos: [number, number] = [12.9716, 77.5946];
      setMapCenter(defaultPos);
      setUserPosition(defaultPos);
      setCenters(mockPHCs);
      setLoading(false);
      toast.error("Geolocation not supported. Showing default location.");
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
              {t('phcLocator.tag')}
            </div>
            <h2 className="text-4xl font-bold text-navy-500 mb-6 leading-tight">
              {t('phcLocator.title')}
            </h2>
            <p className="text-navy-400 text-lg mb-8 leading-relaxed">
              {t('phcLocator.desc')}
            </p>
            
            <button 
              onClick={handleFindNearby}
              disabled={loading}
              className="flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group w-full sm:w-auto justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('phcLocator.detecting')}
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5 group-hover:animate-pulse" />
                  {t('phcLocator.btn')}
                </>
              )}
            </button>
            
            {userPosition && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                   <div className="flex items-center gap-3 text-emerald-700 font-bold text-sm">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                     {t('phcLocator.liveTracking')}
                   </div>
                   <div className="flex items-center gap-2 mt-2 text-[10px] text-emerald-600/70 font-medium font-mono">
                     <MapPin className="w-3 h-3" />
                     {userPosition[0].toFixed(4)}, {userPosition[1].toFixed(4)}
                   </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: List/Results / Map */}
          <div className="lg:w-2/3 w-full">
            <AnimatePresence mode="wait">
              {!userPosition ? (
                <motion.div 
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border-2 border-dashed border-navy-100 rounded-[40px] p-12 flex flex-col items-center justify-center text-center gap-6 min-h-[500px]"
                >
                  <div className="w-24 h-24 bg-navy-50 rounded-full flex items-center justify-center text-navy-200">
                    <Search className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-500">{t('phcLocator.emptyTitle')}</h3>
                    <p className="text-navy-300 max-w-sm mt-2">{t('phcLocator.emptyDesc')}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-navy-400">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      {t('phcLocator.accuracy')}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-navy-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      {t('phcLocator.zeroCost')}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="map-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Map Header */}
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-navy-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                        <MapIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-navy-500 font-bold leading-none">{t('phcLocator.mapHeader')}</h4>
                        <p className="text-navy-300 text-xs mt-1">{t('phcLocator.showing')} ({centers.length})</p>
                      </div>
                    </div>
                    <div className="text-xs font-black text-navy-300 uppercase tracking-widest bg-navy-50 px-3 py-1.5 rounded-lg">
                      Leaflet OpenStreetMap
                    </div>
                  </div>

                  {/* The Map itself */}
                  <div className="h-[450px] w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white relative z-0">
                    <MapContainer 
                      center={mapCenter as L.LatLngExpression} 
                      zoom={15} 
                      scrollWheelZoom={false}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                      <MapController position={mapCenter} zoom={15} />

                      {userPosition && (
                        <Marker position={userPosition as L.LatLngExpression}>
                          <Popup>
                            <div className="p-1">
                              <h1 className="text-sm font-bold text-emerald-600 mb-0.5">{t('phcLocator.youAreHere')}</h1>
                              <p className="text-[10px] text-navy-400 m-0">{t('phcLocator.liveTracking')}</p>
                            </div>
                          </Popup>
                        </Marker>
                      )}

                      {centers.map(center => (
                        <Marker key={center.id} position={center.position as L.LatLngExpression}>
                          <Popup>
                            <div className="p-1 min-w-[150px]">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                <h1 className="text-sm font-bold text-navy-500 m-0">{center.name}</h1>
                              </div>
                              <p className="text-[11px] text-navy-400 m-0 mb-2 leading-tight">{center.address}</p>
                              <div className="flex items-center justify-between border-t border-navy-50 pt-2">
                                <span className="text-[10px] font-black uppercase text-emerald-500">
                                  {center.status}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-navy-300">
                                  <Ruler className="w-3 h-3" />
                                  {center.distance}
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>

                  {/* Compact List Overlay/Below */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                      {centers.map((center, index) => (
                        <motion.div
                          key={center.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-4 rounded-2xl shadow-sm border border-navy-50 hover:border-emerald-100 hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                          onClick={() => setMapCenter(center.position)}
                        >
                           <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center text-navy-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                             <MapPin className="w-6 h-6" />
                           </div>
                           <div className="flex-1 min-w-0">
                             <h5 className="text-navy-500 font-bold truncate text-sm">{center.name}</h5>
                             <div className="flex items-center gap-2 mt-0.5">
                               <span className="text-[10px] text-navy-400 font-medium">{center.distance}</span>
                               <span className="w-1 h-1 bg-navy-200 rounded-full" />
                               <span className={cn(
                                 "text-[10px] font-bold",
                                 center.status === "Open" ? "text-emerald-500" : "text-amber-500"
                               )}>{center.status}</span>
                             </div>
                           </div>
                           <button 
                             className="p-2 bg-navy-50 text-navy-400 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm"
                             title="Navigate"
                           >
                             <Navigation2 className="w-4 h-4" />
                           </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Background patterns */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-navy-100/30 rounded-full blur-3xl opacity-40" />
    </section>
  );
};

export default PHCLocator;

