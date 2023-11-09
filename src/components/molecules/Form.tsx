import React, { useState } from "react";
import { Row, Alert } from "react-bootstrap";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import "./Form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFormDataDucks } from "../../redux/formActions";

interface FormErrors {
  nome: string;
  apelido: string;
  cep: string;
  uf: string;
  cidade: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    apelido: "",
    cep: "",
    uf: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    nome: "",
    apelido: "",
    cep: "",
    uf: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    numero: "",
    complemento: "",
  });

  const dispatch = useDispatch();

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setFormErrors({
      ...formErrors,
      [field]: "",
    });
  };

  const handleValidation = () => {
    const alphanumericPattern =
      /(?=^.{2,50}$)^[a-zA-Z0-9\sçáàãéèíóôõúÇÁÀÃÉÈÍÓÔÕÚ]*$/;
    const numericPattern = /(?=^.{1,9}$)^\d*$/;
    const ufPattern = /^[A-Za-z]{2}$/;

    const isAlphanumeric = (value: string) => alphanumericPattern.test(value);
    const isNumeric = (value: string) => numericPattern.test(value);
    const isUfValid = (value: string) => ufPattern.test(value);

    const errorMessages: FormErrors = {
      nome:
        !isAlphanumeric(formData.nome) || formData.nome.trim() === ""
          ? "Nome inválido"
          : "",
      apelido: !isAlphanumeric(formData.apelido) ? "Apelido inválido" : "",
      cep:
        !isNumeric(formData.cep) || formData.cep.trim() === ""
          ? "CEP inválido"
          : "",
      uf: !isUfValid(formData.uf) ? "UF inválida" : "",
      cidade:
        !isAlphanumeric(formData.cidade) || formData.cidade.trim() === ""
          ? "Cidade inválida"
          : "",
      logradouro:
        !isAlphanumeric(formData.logradouro) ||
        formData.logradouro.trim() === ""
          ? "Logradouro inválido"
          : "",
      bairro:
        !isAlphanumeric(formData.bairro) || formData.bairro.trim() === ""
          ? "Bairro inválido"
          : "",
      numero:
        !isNumeric(formData.numero) || formData.numero.trim() === ""
          ? "Número inválido"
          : "",
      complemento:
        !isAlphanumeric(formData.complemento) ||
        formData.complemento.trim() === ""
          ? "Complemento inválido"
          : "",
    };

    setFormErrors(errorMessages);

    const isFormValid = Object.values(errorMessages).every(
      (message) => message === ""
    );

    if (isFormValid) {
      dispatch(setFormDataDucks(formData));
      console.log("Formulário válido. Realizar ação desejada...");
    } else {
      console.log("Formulário inválido. Tratar os campos inválidos.");
    }
  };

  const handleAddress = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formData.cep}/json/`
      );
      console.log("Detalhes do endereço:", response.data);

      const { logradouro, bairro, localidade, uf } = response.data;
      setFormData({
        ...formData,
        logradouro,
        bairro,
        cidade: localidade,
        uf,
      });
    } catch (error) {
      console.error("Erro ao obter dados do CEP:", error);
    }
  };

  return (
    <div className="form">
      <div className="titulo">
        <h1> Formulário de Cadastro </h1>
      </div>
      <div className="campos">
        <div>
          <Row>
            <Input
              titulo={"Nome: "}
              tipo={"text"}
              value={formData.nome}
              setValue={(value: any) => handleChange("nome", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.nome}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"Apelido: "}
              tipo={"text"}
              value={formData.apelido}
              setValue={(value: any) => handleChange("apelido", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.apelido}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"CEP: "}
              tipo={"number"}
              value={formData.cep}
              setValue={(value: any) => handleChange("cep", value)}
              onBlur={() => handleAddress()}
            />
            <Alert variant="danger" className="error">
              {formErrors.cep}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"UF: "}
              tipo={"text"}
              value={formData.uf}
              setValue={(value: any) => handleChange("uf", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.uf}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"Cidade: "}
              tipo={"text"}
              value={formData.cidade}
              setValue={(value: any) => handleChange("cidade", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.cidade}
            </Alert>
          </Row>
        </div>
        <div>
          <Row>
            <Input
              titulo={"Logradouro: "}
              tipo={"text"}
              value={formData.logradouro}
              setValue={(value: any) => handleChange("logradouro", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.logradouro}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"Bairro: "}
              tipo={"text"}
              value={formData.bairro}
              setValue={(value: any) => handleChange("bairro", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.bairro}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"Número: "}
              tipo={"number"}
              value={formData.numero}
              setValue={(value: any) => handleChange("numero", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.numero}
            </Alert>
          </Row>
          <Row>
            <Input
              titulo={"Complemento: "}
              tipo={"text"}
              value={formData.complemento}
              setValue={(value: any) => handleChange("complemento", value)}
            />
            <Alert variant="danger" className="error">
              {formErrors.complemento}
            </Alert>
          </Row>
        </div>
      </div>
      <Row>
        <Button onClick={() => handleValidation()}>Cadastrar</Button>
      </Row>
    </div>
  );
};

export default Form;
