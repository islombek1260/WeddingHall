import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "./style.css";
import Error404 from "../utils/Error404";
import Loading from "../utils/Loading";

const UPDATE_HALL_MUTATION = gql`
mutation UpdateHall($hallname: String!, $address: String!, $price: String!) {
  updateHall(hallname: $hallname, address: $address, price: $price) {
    success
    data
    access_token
  }
}
`;


const UpdateHallForm = () => {
  const [hallname, setHallname] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");

  const [updateHall, { loading, error }] = useMutation(UPDATE_HALL_MUTATION);

  const handleUpdateHall = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateHall({ variables: { hallname, address, price } });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdateHall}>
      <input type="text" placeholder="Hall Name" value={hallname} onChange={(e) => setHallname(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit" disabled={loading && <Loading />}> Update Hall</button>
      {error && <Error404 />}
    </form>
  );
};

export default UpdateHallForm;