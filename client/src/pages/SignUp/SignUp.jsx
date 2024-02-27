// SignUp.jsx
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm/SignUpForm";
import { signupUser } from "../../utils/api";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      await signupUser(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      // Handle login error
    }
  };
  
  return <SignUpForm handleSignup={handleSignUp} />;
}
