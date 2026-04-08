import { useState, useMemo } from "react";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
};

export const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Emergency",
  "Orthopedics",
  "General Medicine",
];

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Chief Cardiologist",
    department: "Cardiology",
    experience: "15+ Years",
    rating: 4.9,
    reviews: 120,
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology Specialist",
    department: "Neurology",
    experience: "12+ Years",
    rating: 4.8,
    reviews: 95,
    image: "https://i.pravatar.cc/150?u=michael",
  },
  {
    id: "3",
    name: "Dr. Emily Davis",
    specialty: "Pediatric Surgeon",
    department: "Pediatrics",
    experience: "10+ Years",
    rating: 5.0,
    reviews: 150,
    image: "https://i.pravatar.cc/150?u=emily",
  },
  {
    id: "4",
    name: "Dr. Robert Wilson",
    specialty: "Orthopedic Expert",
    department: "Orthopedics",
    experience: "18+ Years",
    rating: 4.7,
    reviews: 110,
    image: "https://i.pravatar.cc/150?u=robert",
  },
  {
    id: "5",
    name: "Dr. Amanda White",
    specialty: "General Physician",
    department: "General Medicine",
    experience: "8+ Years",
    rating: 4.6,
    reviews: 80,
    image: "https://i.pravatar.cc/150?u=amanda",
  },
  {
    id: "6",
    name: "Dr. James Miller",
    specialty: "Emergency Medicine Specialist",
    department: "Emergency",
    experience: "14+ Years",
    rating: 4.9,
    reviews: 210,
    image: "https://i.pravatar.cc/150?u=james",
  },
];

export const useDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept =
        selectedDepartment === "All" || doctor.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDepartment]);

  const getDoctorsByDepartment = (dept: string) => {
    return mockDoctors.filter((d) => d.department === dept);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    filteredDoctors,
    getDoctorsByDepartment,
    allDoctors: mockDoctors,
    departments,
  };
};
