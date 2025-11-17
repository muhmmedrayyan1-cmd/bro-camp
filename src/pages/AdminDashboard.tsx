import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useComplaints, Complaint } from "@/contexts/ComplaintContext";
import logo from "@/assets/brototype-logo.png";
import bgImage from "@/assets/brototype-wall.png";
import { LogOut, Clock, CheckCircle2, AlertCircle, Filter, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { complaints, updateComplaintStatus } = useComplaints();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleStatusChange = (complaintId: number, newStatus: Complaint["status"]) => {
    updateComplaintStatus(complaintId, newStatus);
    toast({
      title: "Status Updated",
      description: `Complaint #${complaintId} status changed to ${newStatus.replace("-", " ")}`,
    });
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const statusMatch = statusFilter === "all" || complaint.status === statusFilter;
    const categoryMatch = categoryFilter === "all" || complaint.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "low":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "";
    }
  };

  const stats = {
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-8 relative z-10">
        <nav className="flex justify-between items-center mb-8">
          <img src={logo} alt="Brototype" className="h-10 md:h-12" />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <User className="w-4 h-4 mr-2" />
              Student Portal
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and resolve student complaints</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                  <p className="text-3xl font-bold">{stats.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                  <p className="text-3xl font-bold">{stats.resolved}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Complaints</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Facilities">Facilities</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Complaints Found</h3>
                <p className="text-muted-foreground">
                  {statusFilter !== "all" || categoryFilter !== "all"
                    ? "Try adjusting your filters to see more complaints."
                    : "No complaints have been submitted yet."}
                </p>
              </Card>
            ) : (
              filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{complaint.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          By {complaint.student} • {complaint.category} • {complaint.date}
                        </p>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{complaint.description}</p>
                    <div className="flex gap-2">
                      {complaint.hasAudio && (
                        <Badge variant="secondary">Audio Attached</Badge>
                      )}
                      {complaint.hasImages && (
                        <Badge variant="secondary">Images Attached</Badge>
                      )}
                    </div>
                  </div>

                  <div className="lg:w-64 space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Current Status
                      </Label>
                      <Badge variant="outline" className={`${getStatusColor(complaint.status)} w-full justify-center py-2`}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-2 capitalize">{complaint.status.replace("-", " ")}</span>
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Update Status
                      </Label>
                      <Select
                        defaultValue={complaint.status}
                        onValueChange={(value) => handleStatusChange(complaint.id, value as Complaint["status"])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export default AdminDashboard;
