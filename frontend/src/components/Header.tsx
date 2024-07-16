import { PageTitle } from "./PageTitle";
import { PageSubtitle } from "./PageSubtitle";
import { ActionLink } from "./ActionLink";
import { ActionButton } from "./ActionButton";
import { Logo } from "./Logo";


const containerStyles = {
  gap: 40,
  marginBottom: 50,
}

export function Header() {
  return (
    <div
      className="flex justify-center align-center"
      style={containerStyles}
    >
      <Logo />
      <div>
        <PageTitle />
        <PageSubtitle />
        <ActionLink text={"submit"} link={"#"} />
      </div>
      <ActionButton text={"Join"} />
    </div>
  );
}
