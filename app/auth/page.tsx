import TabSwitcher from "@/components/TabSwitcher";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthPage = () => {
  return <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />;
};

export default AuthPage;
