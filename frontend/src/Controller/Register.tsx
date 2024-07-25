import { Container, Header, PageSubtitle, Form } from "UI";
import { notify } from "./notify";

export function Register() {
  const handleRegistration = ({
    email,
    emailRef,
    username,
    usernameRef,
    password,
    passwordRef,
  }: {
    email: string;
    emailRef: React.RefObject<HTMLInputElement>;
    username: string;
    usernameRef: React.RefObject<HTMLInputElement>;
    password: string;
    passwordRef: React.RefObject<HTMLInputElement>;
  }) => {
    const isEmailValid = emailRef.current?.checkValidity();
    if (!isEmailValid) {
      return notify({
        toastType: "error",
        toastMessage: emailRef?.current?.validationMessage,
      });
    }
    const isUsernameValid = usernameRef.current?.checkValidity();
    if (!isUsernameValid) {
      return notify({
        toastType: "error",
        toastMessage: "Please provide a username",
      });
    }

    const isPasswordValid = passwordRef.current?.checkValidity();
    if (!isPasswordValid) {
      return notify({
        toastType: "error",
        toastMessage: "Your password should be at least 6 chars",
      });
    }
  };

  return (
    <Container>
      <Header />
      <PageSubtitle text="Create account" />
      <Form handleRegistration={handleRegistration} />
    </Container>
  );
}
