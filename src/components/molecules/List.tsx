import "./List.css";

const List = ({ nome, cep, enderecoBoolean }: any) => {
  return (
    <ul className="custom-list">
      <li>
        <span>Nome:</span> {nome}
      </li>
      <li>
        <span>CEP:</span> {cep}
      </li>
      <li>
        <span>Novo Endereço:</span> {enderecoBoolean ? "Sim" : "Não"}
      </li>
    </ul>
  );
};

export default List;
