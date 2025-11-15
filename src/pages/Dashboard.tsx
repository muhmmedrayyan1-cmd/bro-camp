import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "@/contexts/ComplaintContext";
import logo from "@/assets/brototype-logo.png";
import { Plus, LogOut, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { complaints } = useComplaints();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <img src={logo} alt="Brototype" className="h-10 md:h-12" />
          <Button variant="ghost" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Complaints</h1>
              <p className="text-muted-foreground">Track and manage your submissions</p>
            </div>
            <Button onClick={() => navigate("/new-complaint")}>
              <Plus className="w-4 h-4 mr-2" />
              New Complaint
            </Button>
          </div>

          <div className="grid gap-6">
            {complaints.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Complaints Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any complaints. Click the button above to get started.
                </p>
                <Button onClick={() => navigate("/new-complaint")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Complaint
                </Button>
              </Card>
            ) : (
              complaints.map((complaint) => (
              <Card key={complaint.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{complaint.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {complaint.category} • {complaint.date}
                        </p>
                        <p className="text-muted-foreground">{complaint.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(complaint.status)}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1 capitalize">{complaint.status.replace("-", " ")}</span>
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                      <span className="capitalize">{complaint.priority}</span>
                    </Badge>
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

export default Dashboard;
