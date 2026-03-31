import { 
  Heart, 
  Brain, 
  Baby, 
  Flame, 
  Bone, 
  Stethoscope,
  LucideIcon 
} from "lucide-react";

export interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  details: string;
  services: string[];
  doctor: string;
  color: string;
  iconColor: string;
}

export const departmentsData: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    description: "Comprehensive heart care including diagnostics, surgery, and rehabilitation.",
    details: "Our cardiology department provides advanced heart treatments including ECG, angiography, bypass surgery, and preventive care. We focus on both emergency interventions and long-term heart health management.",
    services: ["ECG & Stress Testing", "Angiography & Angioplasty", "Heart Bypass Surgery", "Preventive Rehabilitation"],
    doctor: "Dr. Sharma",
    color: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    description: "Expert diagnosis and treatment for brain and nervous system disorders.",
    details: "We treat complex neurological conditions like stroke, epilepsy, Alzheimer's, and nerve disorders using modern diagnostic technology and evidence-based therapy.",
    services: ["Advanced Brain Scans", "Stroke Management", "Epilepsy Treatment", "Neuro-rehabilitation"],
    doctor: "Dr. Mehta",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    description: "Specialized medical care for infants, children, and adolescents.",
    details: "Comprehensive child healthcare including routine vaccinations, pediatric nutrician, development monitoring, and specialized care for childhood illnesses.",
    services: ["Newborn Care", "Vaccination Programs", "Childhood Nutrition", "Development Tracking"],
    doctor: "Dr. Reddy",
    color: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "emergency",
    name: "Emergency",
    icon: Flame,
    description: "24/7 immediate care for critical and life-threatening conditions.",
    details: "Our emergency department is staffed 24/7 with trauma experts ready to handle accidents, cardiac emergencies, and life-threatening conditions with zero wait time.",
    services: ["Ambulance Services", "ICU Support", "Trauma Care", "Emergency Surgery"],
    doctor: "Dr. Khan",
    color: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    description: "Treatment for bones, joints, and musculoskeletal system conditions.",
    details: "We specialize in joint replacement, sports injury management, complex fracture treatment, and advanced physiotherapy to restore your mobility.",
    services: ["Digital X-Rays", "Joint Replacement", "Sports Medicine", "Physiotherapy"],
    doctor: "Dr. Verma",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    icon: Stethoscope,
    description: "Preventative care and treatment for a wide range of common ailments.",
    details: "Primary care services for acute illnesses like fever and infections, as well as management of chronic conditions like diabetes and hypertension.",
    services: ["Physical Examination", "Lab Diagnostics", "Infection Control", "Chronic Care"],
    doctor: "Dr. Rao",
    color: "bg-navy-50",
    iconColor: "text-navy-500",
  },
];
