import React from 'react';

function SearchForm({
  activeFilters,
  handleFilterChange,
  resetFilters,
  uniqueCategories,
  uniqueBrands,
  uniqueTransmissions,
  uniqueFuelTypes,
  maxPriceValue
}) {
  return (
    <div className="search-form p-4 bg-white rounded shadow mb-6">
      <h2 className="text-2xl font-semibold mb-4">Filtres de recherche</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2">Catégories</h3>
          {uniqueCategories.map(category => (
            <label key={category} className="block">
              <input
                type="checkbox"
                checked={activeFilters.categories.includes(category)}
                onChange={() => handleFilterChange('categories', category)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-semibold mb-2">Marques</h3>
          {uniqueBrands.map(brand => (
            <label key={brand} className="block">
              <input
                type="checkbox"
                checked={activeFilters.brands.includes(brand)}
                onChange={() => handleFilterChange('brands', brand)}
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>

        {/* Transmissions */}
        <div>
          <h3 className="font-semibold mb-2">Transmissions</h3>
          {uniqueTransmissions.map(transmission => (
            <label key={transmission} className="block">
              <input
                type="checkbox"
                checked={activeFilters.transmissions.includes(transmission)}
                onChange={() => handleFilterChange('transmissions', transmission)}
                className="mr-2"
              />
              {transmission}
            </label>
          ))}
        </div>

        {/* Fuel Types */}
        <div>
          <h3 className="font-semibold mb-2">Types de carburant</h3>
          {uniqueFuelTypes.map(fuelType => (
            <label key={fuelType} className="block">
              <input
                type="checkbox"
                checked={activeFilters.fuelTypes.includes(fuelType)}
                onChange={() => handleFilterChange('fuelTypes', fuelType)}
                className="mr-2"
              />
              {fuelType}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-2">Prix par jour (€)</h3>
          <label className="block mb-1">
            Min: 
            <input
              type="number"
              value={activeFilters.minPrice}
              min={0}
              max={activeFilters.maxPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="ml-2 w-20 border border-gray-300 rounded p-1"
            />
          </label>
          <label className="block">
            Max: 
            <input
              type="number"
              value={activeFilters.maxPrice}
              min={activeFilters.minPrice}
              max={maxPriceValue}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="ml-2 w-20 border border-gray-300 rounded p-1"
            />
          </label>
        </div>

        {/* Minimum Seats */}
        <div>
          <h3 className="font-semibold mb-2">Nombre minimum de sièges</h3>
          <input
            type="number"
            value={activeFilters.minSeats}
            min={0}
            onChange={(e) => handleFilterChange('minSeats', e.target.value)}
            className="w-20 border border-gray-300 rounded p-1"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={resetFilters}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
