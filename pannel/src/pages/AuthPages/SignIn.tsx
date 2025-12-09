import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      {/* <LandingPage /> */}
      <PageMeta
        title="spider crypto bot | ورود"
        description="صفحه ورود به پنل ادمین"
      />
      <AuthLayout>
        <SignInForm  />
      </AuthLayout>
    </>
  );
}
