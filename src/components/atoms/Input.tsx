import "./Input.css";

const Input = ({ titulo, tipo, value, setValue, onBlur }: any) => {
  return (
    <div className="form__group">
      <input
        className="form__field"
        onBlur={onBlur}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={tipo}
      />
      <label className="form__label">{titulo}</label>
    </div>
  );
};

export default Input;
