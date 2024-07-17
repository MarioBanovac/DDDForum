import {
  ActionButton,
  ActionLink,
  Container,
  Header,
  PageSubtitle,
} from "components";

export function Register() {
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
    <Container>
      <Header />
      <PageSubtitle text="Create account" />
      <form
        style={{
          width: "100%",
          maxWidth: 480,
          gap: 12,
          marginTop: 30,
          marginBottom: 30,
        }}
        className="flex column"
        onSubmit={() => {}}
      >
        <input
          style={inputStyles}
          placeholder="email"
          type="email"
          id="email"
          name="email"
          required
        />
        <input
          style={inputStyles}
          placeholder="username"
          type="text"
          id="username"
          name="username"
          required
        />
        <input
          style={inputStyles}
          placeholder="password"
          type="password"
          id="password"
          name="password"
          required
        />
      </form>
      <div className="flex" style={{ gap: 50 }}>
        <div>
          <p>already have an account?</p>
          <ActionLink text="Login" link="/login" variant="secondary" />
        </div>
        <ActionButton text="Submit" />
      </div>
    </Container>
  );
}
