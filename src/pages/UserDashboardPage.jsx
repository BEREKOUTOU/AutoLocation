import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
UserDashboardPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};
UserDashboardPage.defaultProps = {
    user: null,
};

export default function UserDashboardPage({ user }) {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!user || !user.id) {
        setReservations([]);
        setLoading(false);
        return;
      }
      const fetchReservations = async () => {
        try {
          const response = await fetch('/api/reservations?userId=' + user.id);
          if (!response.ok) {
            throw new Error('Error fetching reservations: ' + response.statusText);
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setReservations(data);
          } else {
            setReservations([]);
            setError('Invalid data format received');
          }
        } catch (err) {
          setError(err.message || 'Error fetching reservations');
          setReservations([]);
        } finally {
          setLoading(false);
        }
      };
      fetchReservations();
    }, [user]);

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 mt-20">Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <ul>
            {reservations.map(reservation => (
              <li key={reservation.id}>
                {reservation.vehicle ? `${reservation.vehicle.brand} ${reservation.vehicle.model}` : 'Vehicle data not available'}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}
