import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "@/contexts/ComplaintContext";
import logo from "@/assets/brototype-logo.png";
import bgImage from "@/assets/brototype-wall.png";
import { Plus, LogOut, Clock, CheckCircle2, AlertCircle, Shield } from "lucide-react";

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
            <Button variant="outline" onClick={() => navigate("/admin")}>
              <Shield className="w-4 h-4 mr-2" />
              Admin Portal
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Reports</h1>
            <p className="text-muted-foreground">Track and manage your submissions</p>
          </div>
          <Button onClick={() => navigate("/new-complaint")}>
            <Plus className="w-4 h-4 mr-2" />
            Raise a Report
          </Button>
          </div>

          <div className="grid gap-6">
            {complaints.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Reports Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any reports. Click the button above to get started.
                </p>
                <Button onClick={() => navigate("/new-complaint")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Report
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
                        <p className="text-muted-foreground mb-3">{complaint.description}</p>
                        
                        {(complaint.hasAudio || complaint.hasImages) && (
                          <div className="space-y-3 mt-4">
                            {complaint.audioFile && (
                              <div>
                                <p className="text-sm font-medium mb-2">Audio Recording:</p>
                                <audio controls className="w-full">
                                  <source src={URL.createObjectURL(complaint.audioFile)} type="audio/webm" />
                                  Your browser does not support the audio element.
                                </audio>
                              </div>
                            )}
                            
                            {complaint.imageFiles && complaint.imageFiles.length > 0 && (
                              <div>
                                <p className="text-sm font-medium mb-2">Images:</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {complaint.imageFiles.map((image, idx) => (
                                    <img 
                                      key={idx}
                                      src={URL.createObjectURL(image)} 
                                      alt={`Report attachment ${idx + 1}`}
                                      className="w-full h-32 object-cover rounded-md border border-border"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
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
