import { useNavigate } from 'react-router-dom';
import SignUpForm from "./components/SignUpForm"
import { signupUser } from '../../utils/api';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      const response = await signupUser(formData);
      if (response.success) {
        toast.success("Signup successful", { position: "bottom-right" });
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = error.response?.errors?.[0]?.msg || "Signup failed. Please try again.";
      toast.error(errorMsg, { position: "bottom-right" });
      console.error('Signup error:', errorMsg);
    }
  };

  return <SignUpForm handleSignup={handleSignUp} />;
}
