interface Props {
  text: string;
}

const styles = {
  paddingLeft: 70,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10,
  letterSpacing: 0.8,
};

export function ActionButton({ text }: Props) {
  return (
    <button style={styles} type="submit">
      {text}
    </button>
  );
}
