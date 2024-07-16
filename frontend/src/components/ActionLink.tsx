interface Props {
  link: string;
  text: string;
}

export function ActionLink({ link, text }: Props) {
  return <a href={link}>{text}</a>;
}
