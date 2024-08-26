import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Header, PageSubtitle, Form } from "UI";
import { notify } from "./notify";
import { apiClient, ApiError } from "Api";
import { UserContext, useContextThrowUndefined } from "context";

export function Register() {
  const { setUser } = useContextThrowUndefined(UserContext);
  const navigate = useNavigate();
  let timeoutId: NodeJS.Timeout;
  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  const handleRegistration = async ({
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

    try {
      const response = await apiClient.createUser({
        email,
        username,
        password,
      });
      if (response?.success) {
        setUser({
          username: response.data.username,
          id: response.data.id,
        });
        notify({
          toastType: "success",
          toastMessage: "Success! Redirecting home.",
        });
        timeoutId = setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        notify({
          toastType: "error",
          toastMessage: error.data.error,
        });
      } else {
        throw error;
      }
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
