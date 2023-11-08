import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import CreateHallForm from './forms/CreateHallForm';
import UpdateHallForm from './forms/UpdateHallForm';
import Error404 from "./utils/Error404";
import Loading from "./utils/Loading";

const GET_HALLS_QUERY = gql`
query {
  halls {
    _id
    hallname
    address
    price
    orderDays
    admin
  }
}
`;

const HallsList = () => {

  const { loading, error, data, refetch } = useQuery(GET_HALLS_QUERY);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000); // Refresh evere 1 seconds

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  if (error) return <><Error404 /></>
  if (loading) return <><Loading /></>

  return (
    <>
      <div className="wrapper">
        <h2>Halls List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Hall name</th>
              <th>Address</th>
              <th>Price</th>
              <th>Order Days</th>
              <th>Creator</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data?.halls.map((hall) => (
              <tr key={hall._id}>
                <td>{hall.hallname}</td>
                <td>{hall.address}</td>
                <td>{hall.price}</td>
                <td>
                  <ul className="list-style-none">
                    {hall?.orderDays.map((day, e) => (
                      <li key={e}>
                        <b>{e+1}</b>-{day}
                      </li>
                    ))}

                  </ul>
                </td>
                <td>{hall.admin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex">
          <CreateHallForm />
          <UpdateHallForm />
        </div>
      </div>
    </>
  );
};

export default HallsList;