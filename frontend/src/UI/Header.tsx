import { useLocation } from "react-router-dom";
import { PageTitle } from "./PageTitle";
import { PageSubtitle } from "./PageSubtitle";
import { ActionLink } from "./ActionLink";
import { Logo } from "./Logo";
import { useContextThrowUndefined, UserContext } from "context";
import { IUserContext } from "context/UserContext";

const containerStyles = {
  gap: 40,
  marginBottom: 50,
};

export function Header() {
  const { pathname } = useLocation();
  const { user } = useContextThrowUndefined<IUserContext>(UserContext);

  return (
    <div className="flex justify-center align-center" style={containerStyles}>
      <Logo />
      <div>
        <PageTitle />
        <PageSubtitle text="Where awesome Domain-Driven Designers are made" />
        <ActionLink text={"submit"} link={"#"} variant={"secondary"} />
      </div>
      {pathname === "/" ? (
        user?.id ? (
          <div className="flex column">
            {user?.username}
            <ActionLink text={"logout"} link={"#"} variant={"secondary"} />
          </div>
        ) : (
          <ActionLink text={"Join"} link={"join"} variant={"primary"} />
        )
      ) : null}
    </div>
  );
}
