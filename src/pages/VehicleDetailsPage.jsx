import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const vehicles = [
  {
    id: '1',
    brand: 'Renault',
    model: 'Clio',
    year: 2022,
    category: 'Économique',
    price: 35,
    transmission: 'Manuelle',
    seats: 5,
    fuelType: 'Essence',
    description: 'Une voiture économique et fiable, parfaite pour la ville.'
  },
  {
    id: '2',
    brand: 'Peugeot',
    model: '3008',
    year: 2021,
    category: 'SUV',
    price: 65,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Diesel',
    description: 'Un SUV spacieux et confortable pour toute la famille.'
  },
  {
    id: '3',
    brand: 'Citroën',
    model: 'C3',
    year: 2022,
    category: 'Économique',
    price: 38,
    transmission: 'Manuelle',
    seats: 5,
    fuelType: 'Essence',
    description: 'Compacte et facile à conduire, idéale pour les trajets quotidiens.'
  },
  {
    id: '4',
    brand: 'Audi',
    model: 'A4',
    year: 2021,
    category: 'Premium',
    price: 95,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Diesel',
    description: 'Une berline premium avec un confort et des performances exceptionnels.'
  },
  {
    id: '5',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    category: 'Compacte',
    price: 45,
    transmission: 'Manuelle',
    seats: 5,
    fuelType: 'Essence',
    description: 'La référence des compactes avec un équilibre parfait entre confort et performances.'
  },
  {
    id: '6',
    brand: 'Toyota',
    model: 'Yaris',
    year: 2022,
    category: 'Économique',
    price: 40,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Hybride',
    description: 'Citadine hybride économique et écologique pour des déplacements urbains.'
  },
  {
    id: '7',
    brand: 'BMW',
    model: ' X3 2025',
    year: 2025,
    category: 'SUV',
    price: 110,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Diesel',
    description: 'SUV premium alliant confort, espace et performances.'
  },
  {
    id: '8',
    brand: 'Mercedes',
    model: 'Classe C',
    year: 2021,
    category: 'Premium',
    price: 95,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Diesel',
    description: 'Une berline premium avec un confort et des performances exceptionnels.'
  },
  {
    id: '9',
    brand: 'Renault',
    model: 'Clio',
    year: 2022,
    category: 'Économique',
    price: 35,
    transmission: 'Manuelle',
    seats: 5,
    fuelType: 'Essence',
    description: 'Une voiture économique et fiable, parfaite pour la ville.'
  },
  {
    id: '10',
    brand: 'Peugeot',
    model: '3008',
    year: 2021,
    category: 'SUV',
    price: 65,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Diesel',
    description: 'Un SUV spacieux et confortable pour toute la famille.'
  },
  {
    id: '11',
    brand: 'Citroën',
    model: 'C3',
    year: 2022,
    category: 'Économique',
    price: 38,
    transmission: 'Manuelle',
    seats: 5,
    fuelType: 'Essence',
    description: 'Compacte et facile à conduire, idéale pour les trajets quotidiens.'
  },
  {
    id: '12',
    brand: 'Audi',
    model: 'A4',
    year: 2021,
    category: 'Premium',
    price: 95,
    transmission: 'Automatique',
    seats: 5,
    fuelType: 'Diesel',
    description: 'Une berline premium avec un confort et des performances exceptionnels.'
  }
];

const VehicleDetailsPage = ({ user }) => {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === id);
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!vehicle) {
    return <div>Véhicule non trouvé.</div>;
  }

  const handleReserve = async () => {
    setError('');
    setSuccess('');
    if (!user) {
      navigate('/login');
      return;
    }
    if (!pickupDate || !pickupTime || !dropoffDate || !dropoffTime) {
      setError('Veuillez remplir toutes les informations de réservation.');
      return;
    }
    try {
      const response = await fetch('/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          vehicleId: vehicle.id,
          pickupDate,
          pickupTime,
          dropoffDate,
          dropoffTime
        })
      });
      if (response.ok) {
        setSuccess('Réservation réussie !');
        // Optionally redirect or clear form
      } else {
        const data = await response.json();
        setError(data.error || 'Erreur lors de la réservation.');
      }
    } catch (err) {
      setError('Erreur réseau lors de la réservation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-20">
      <h1 className="text-3xl font-bold mb-4">{vehicle.brand} {vehicle.model} ({vehicle.year})</h1>
      <p className="mb-2"><strong>Catégorie:</strong> {vehicle.category}</p>
      <p className="mb-2"><strong>Prix:</strong> {vehicle.price}€ / jour</p>
      <p className="mb-2"><strong>Transmission:</strong> {vehicle.transmission}</p>
      <p className="mb-2"><strong>Nombre de sièges:</strong> {vehicle.seats}</p>
      <p className="mb-2"><strong>Type de carburant:</strong> {vehicle.fuelType}</p>
      <p className="mt-4 mb-6">{vehicle.description}</p>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Date de prise en charge</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Heure de prise en charge</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Date de retour</label>
        <input
          type="date"
          value={dropoffDate}
          onChange={(e) => setDropoffDate(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Heure de retour</label>
        <input
          type="time"
          value={dropoffTime}
          onChange={(e) => setDropoffTime(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <button
        onClick={handleReserve}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
      >
        Réserver ce véhicule
      </button>
    </div>
  );
};

export default VehicleDetailsPage;
