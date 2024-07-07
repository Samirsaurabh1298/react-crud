import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [tableDark, setTableDark] = useState("");

  const getData = () => {
    axios
      .get("https://666fd6510900b5f872486296.mockapi.io/crud-operation-reactJs")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://666fd6510900b5f872486296.mockapi.io/crud-operation-reactJs/${id}`
      )
      .then(() => {
        getData();
      });
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="mt-4 form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          onClick={() => {
            if (tableDark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
          style={{ width: "100px", height: "32px" }}
        />
      </div>
      <div className="mt-4 d-flex justify-content-between">
        <h2>Read Operation</h2>
        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            placeholder="search"
            onChange={inputHandler}
          />
        </div>
        <Link to="/">
          <button className="btn btn-info">Add Data</button>
        </Link>
      </div>
      <table className={`table ${tableDark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((el) => {
              if (inputText === "") return el;
              return el.name.toLowerCase().includes(inputText);
            })
            .map((eachData) => {
              return (
                <tr key={eachData.id}>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Read;
