// LogIn.jsx
import { useNavigate } from "react-router-dom";
import LogInForm from "../../components/auth/LogInForm/LogInForm";
import { loginUser } from "../../utils/api";

export default function LogIn() {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await loginUser(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      // Handle login error
    }
  };
  
  return <LogInForm handleLogin={handleLogin} />;
}
