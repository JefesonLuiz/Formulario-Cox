import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Form from "./components/molecules/Form";
import List from "./components/molecules/List";
import { setFormDataDucks } from "./redux/formActions";
import CardForm from "./components/atoms/CardForm";

function App() {
  const dispatch = useDispatch();
  const formData = useSelector((state: any) => state.formData);
  const [formDataList, setFormDataList] = useState<any[]>([]);
  const [changeTracker, setChangeTracker] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(false);
  const [previousName, setPreviousName] = useState<string>("");

  useEffect(() => {
    const existingData = formDataList.find(
      (data) => data.nome === formData.nome
    );

    if (
      formData.nome !== previousName &&
      (!existingData || existingData.cep !== formData.cep)
    ) {
      if (existingData) {
        const updatedList = formDataList.map((data) =>
          data === existingData
            ? { ...data, enderecoBoolean: true, cep: formData.cep }
            : data
        );
        setFormDataList(updatedList);
      } else {
        setFormDataList((prevList) => [
          ...prevList,
          { ...formData, enderecoBoolean: false },
        ]);
      }
      setPreviousName(formData.nome);
    }
  }, [changeTracker, formData, formDataList, previousName]);

  useEffect(() => {
    if (formDataList.length >= 2) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [formDataList]);

  return (
    <div className="App">
      <Form />
      <div className="Lista">
        {showList &&
          formDataList
            .slice(1)
            .map((data, index) => (
              <List
                key={index}
                nome={data.nome}
                cep={data.cep}
                enderecoBoolean={data.enderecoBoolean}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
