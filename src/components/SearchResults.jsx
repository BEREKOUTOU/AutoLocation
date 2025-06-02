import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ filteredVehicles, formatDate }) {
  if (filteredVehicles.length === 0) {
    return <p className="text-center text-gray-600">Aucun véhicule ne correspond aux critères de recherche.</p>;
  }

  return (
    <div className="search-results grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVehicles.map(vehicle => (
        <div key={vehicle.id} className="bg-white rounded shadow p-4">
          <div className="h-48 overflow-hidden mb-4">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold mb-1">{vehicle.brand} {vehicle.model}</h3>
          <p className="text-gray-600 mb-2">{vehicle.year} • {vehicle.transmission} • {vehicle.seats} sièges • {vehicle.fuelType}</p>
          <p className="text-gray-700 mb-2">{vehicle.description}</p>
          <ul className="text-sm text-gray-600 mb-2 list-disc list-inside">
            {vehicle.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">{vehicle.price}€ / jour</span>
            <Link
              to={`/vehicles/${vehicle.id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Voir détails
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
