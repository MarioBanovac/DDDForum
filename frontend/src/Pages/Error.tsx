import { ActionLink } from "components";

export function Error() {
  return (
    <div className="container flex justify-center align-center column">
      <h1
        style={{
          marginBottom: 10,
        }}
      >
        Congrats, your escaped the Matrix!
      </h1>
      <ActionLink link="/" text="Take the blue pill" variant="primary" />
    </div>
  );
}
