// LogIn.jsx
import { useNavigate } from "react-router-dom";
import LogInForm from "../../components/auth/LogInForm/LogInForm";
import { loginUser } from "../../utils/api";
import { toast } from 'react-toastify';

export default function LogIn() {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await loginUser(formData);
      navigate("/dashboard");
      toast.success("Login successful", { position: "bottom-right" });
    } catch (error) {
      // Handle login error
      const errorMsg = error.response?.errors?.[0]?.msg || "Login failed. Please try again.";
      toast.error(errorMsg, { position: "bottom-right" });
      console.error('Login error:', errorMsg);
    }
  };
  
  return <LogInForm handleLogin={handleLogin} />;
}
