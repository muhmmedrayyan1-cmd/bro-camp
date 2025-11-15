import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Complaint {
  id: number;
  title: string;
  student: string;
  category: string;
  description: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  date: string;
  hasAudio: boolean;
  hasImages: boolean;
  audioFile?: File | null;
  imageFiles?: File[];
}

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, "id" | "date" | "student">) => void;
  updateComplaintStatus: (id: number, status: Complaint["status"]) => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

const initialComplaints: Complaint[] = [
  {
    id: 1,
    title: "Food Quality Issue",
    student: "John Doe",
    category: "Food",
    description: "The food served today was not up to standard",
    status: "pending",
    priority: "high",
    date: "2024-01-15",
    hasAudio: true,
    hasImages: true,
  },
  {
    id: 2,
    title: "AC Not Working",
    student: "Jane Smith",
    category: "Facilities",
    description: "Air conditioning in Room 301 is not functioning",
    status: "in-progress",
    priority: "medium",
    date: "2024-01-14",
    hasAudio: false,
    hasImages: true,
  },
  {
    id: 3,
    title: "Event Schedule Conflict",
    student: "Mike Johnson",
    category: "Events",
    description: "Two events scheduled at the same time",
    status: "resolved",
    priority: "low",
    date: "2024-01-12",
    hasAudio: false,
    hasImages: false,
  },
];

export const ComplaintProvider = ({ children }: { children: ReactNode }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const addComplaint = (complaint: Omit<Complaint, "id" | "date" | "student">) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: Math.max(0, ...complaints.map((c) => c.id)) + 1,
      date: new Date().toISOString().split("T")[0],
      student: "Current User", // TODO: Replace with actual logged-in user
    };
    setComplaints([newComplaint, ...complaints]);
  };

  const updateComplaintStatus = (id: number, status: Complaint["status"]) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status } : complaint
      )
    );
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, updateComplaintStatus }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error("useComplaints must be used within a ComplaintProvider");
  }
  return context;
};
