import { useState, useRef } from "react";
import { ActionButton } from "./ActionButton";
import { ActionLink } from "./ActionLink";

interface IProps {
  handleRegistration: (formData: {
    email: string;
    emailRef: React.RefObject<HTMLInputElement>;
    username: string;
    usernameRef: React.RefObject<HTMLInputElement>;
    password: string;
    passwordRef: React.RefObject<HTMLInputElement>;
  }) => void;
}

export function Form({ handleRegistration }: IProps) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegistration({
      email,
      emailRef,
      username,
      usernameRef,
      password,
      passwordRef,
    });
  };

  const inputStyles = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 3,
    borderColor: "#000",
    fontSize: 16,
  };

  return (
    <form
      method="post"
      style={{
        width: "100%",
        maxWidth: 480,
        gap: 12,
        marginTop: 30,
        marginBottom: 30,
      }}
      className="flex column"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        ref={emailRef}
        onChange={handleEmailChange}
        style={inputStyles}
        placeholder="email"
        type="email"
        id="email"
        name="email"
        value={email}
        required
      />
      <input
        ref={usernameRef}
        onChange={handleUsernameChange}
        style={inputStyles}
        placeholder="username"
        type="text"
        id="username"
        name="username"
        value={username}
        minLength={1}
        required
      />
      <input
        ref={passwordRef}
        onChange={handlePasswordChange}
        style={inputStyles}
        placeholder="password"
        type="password"
        id="password"
        name="password"
        value={password}
        minLength={6}
        required
      />
      <div
        className="flex"
        style={{ gap: 50, marginTop: 30, justifyContent: "flex-end" }}
      >
        <div>
          <p>already have an account?</p>
          <ActionLink text="Login" link="/login" variant="secondary" />
        </div>
        <ActionButton text="Submit" />
      </div>
    </form>
  );
}
