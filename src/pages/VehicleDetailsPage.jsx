import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const { data: vehicle, isLoading, isError } = useQuery(
    ['vehicle', id],
    async () => {
      const response = await axios.get(`/api/vehicles/${id}`);
      return response.data;
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{vehicle.make} {vehicle.model}</h1>
      <p>Category: {vehicle.category}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Seats: {vehicle.seats}</p>
      <p>Transmission: {vehicle.transmission}</p>
      <p>Fuel Type: {vehicle.fuelType}</p>
      <p>Description: {vehicle.description}</p>
    </div>
  );
};

export default VehicleDetailsPage;
