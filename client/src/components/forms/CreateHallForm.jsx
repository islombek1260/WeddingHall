import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "./style.css";
import Error404 from "../utils/Error404";
import Loading from "../utils/Loading";

const CREATE_HALL_MUTATION = gql`
mutation CreateHall($hallname: String!, $address: String!, $price: String!) {
  createHall(hallname: $hallname, address: $address, price: $price) {
    success
    data
    access_token
  }
}
`;


const CreateHallForm = () => {
  const [hallname, setHallname] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const [createHall, { loading, error }] = useMutation(CREATE_HALL_MUTATION);

  const handleCreateHall = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createHall({ variables: { hallname, address, price } });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCreateHall}>
      <input type="text" placeholder="Hall Name" value={hallname} onChange={(e) => setHallname(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit" disabled={loading && <Loading />}> Create Hall</button>
      {error && <Error404 />}
    </form>
  );
};

export default CreateHallForm;