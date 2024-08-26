const styles = { height: 70, width: 70 };

export function Logo() {
  return (
    <img className="block" style={styles} src={"./logo.png"} alt="brand logo" />
  );
}
