interface Props {
  link: string;
  text: string;
  variant: "primary" | "secondary";
}

const primaryStyles = {
  paddingLeft: 70,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10,
  letterSpacing: 0.8,
};

const secondaryStyles = {
  textDecoration: "underline",
};

export function ActionLink({ link, text, variant }: Props) {
  return (
    <a
      className={variant === "primary" ? "button" : ""}
      style={variant === "primary" ? primaryStyles : secondaryStyles}
      href={link}
    >
      {text}
    </a>
  );
}
