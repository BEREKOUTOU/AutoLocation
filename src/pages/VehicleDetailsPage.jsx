import React from 'react';
import { useParams } from 'react-router-dom';

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

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return <div>Véhicule non trouvé.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-20">
      <h1 className="text-3xl font-bold mb-4">{vehicle.brand} {vehicle.model} ({vehicle.year})</h1>
      <p className="mb-2"><strong>Catégorie:</strong> {vehicle.category}</p>
      <p className="mb-2"><strong>Prix:</strong> {vehicle.price}€ / jour</p>
      <p className="mb-2"><strong>Transmission:</strong> {vehicle.transmission}</p>
      <p className="mb-2"><strong>Nombre de sièges:</strong> {vehicle.seats}</p>
      <p className="mb-2"><strong>Type de carburant:</strong> {vehicle.fuelType}</p>
      <p className="mt-4">{vehicle.description}</p>
    </div>
  );
};

export default VehicleDetailsPage;
