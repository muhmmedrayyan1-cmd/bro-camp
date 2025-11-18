import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/brototype-logo.png";
import bgImage from "@/assets/brototype-wall.png";
import { ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobile || otp.length !== 13) {
      toast({
        title: "Error",
        description: "Please enter mobile number and complete OTP",
        variant: "destructive",
      });
      return;
    }

    // Check OTP for authentication
    if (otp === "brocampstudent") {
      navigate("/dashboard");
    } else if (otp === "brocampadmin") {
      navigate("/admin");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Card className="w-full max-w-md p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8">
          <img src={logo} alt="Brototype" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input 
              id="mobile" 
              type="tel" 
              placeholder="Enter your mobile number" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required 
            />
          </div>

          <div>
            <Label htmlFor="otp">Enter OTP</Label>
            <div className="flex justify-center mt-2">
              <InputOTP
                maxLength={13}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                  <InputOTPSlot index={8} />
                  <InputOTPSlot index={9} />
                  <InputOTPSlot index={10} />
                  <InputOTPSlot index={11} />
                  <InputOTPSlot index={12} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Student: brocampstudent | Admin: brocampadmin
            </p>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
