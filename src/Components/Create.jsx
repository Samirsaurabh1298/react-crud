import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const history = useNavigate();

  const header = { "Access-Control-Allow-Origin": "*" };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    axios
      .post(
        "https://666fd6510900b5f872486296.mockapi.io/crud-operation-reactJs",
        {
          name: name,
          email: email,
        },
        {
          header,
        }
      )

      .then(() => {
        history("/read");
      });
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-between">
        <h2>Create</h2>
        <Link to="/read">
        <div className="btn btn-info">Show Data</div>
        </Link>

      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required="required"
            type="email"
            id="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
