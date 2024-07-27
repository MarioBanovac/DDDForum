const styles = { marginBottom: 8 };

interface IProps {
  text: string
}

export function PageSubtitle({text}: IProps) {
  return <h2 style={styles}>{text}</h2>;
}
