import React, { useState, useEffect } from 'react';

export default function UserDashboardPage({ user }) {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
const fetchReservations = async () => {
        const response = await fetch(`/api/reservations?userId=${user.id}`);
        const data = await response.json();
        setReservations(data);
        setLoading(false);
      };
      fetchReservations();
    }, [user.id]);
    
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 mt-20">Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {reservations.map(reservation => (
              <li key={reservation.id}>{reservation.vehicle.brand} {reservation.vehicle.model}</li>
            ))}
          </ul>
        )}
      </div>
    );
}