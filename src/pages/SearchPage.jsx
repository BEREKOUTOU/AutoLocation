import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Renault from '/assets/images/Renault Clio.jpg';
import Peugeot from '/assets/images/Peugeot 3008.jpg';
import Citroen from '/assets/images/Citroën C3.jpg';
import Audi from '/assets/images/Audi_A4_B9_Limousine_3.0_TDI_quattro.webp';
import Volkswagen from '/assets/images/volkswagen-golf-r-mk85-2024.webp';
import Toyota from '/assets/images/Yaris_mobile_Large-Landscape.webp';
import BMW from '/assets/images/BMW X3.webp';
import Mercedes from '/assets/images/Mercedes Classe s.webp';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    brands: [],
    transmissions: [],
    fuelTypes: [],
    minPrice: 0,
    maxPrice: 500,
    minSeats: 0,
  });

  // Search parameters from URL
  const location = searchParams.get('location') || '';
  const pickupDate = searchParams.get('pickupDate') || '';
  const pickupTime = searchParams.get('pickupTime') || '';
  const dropoffDate = searchParams.get('dropoffDate') || '';
  const dropoffTime = searchParams.get('dropoffTime') || '';

  // Mock data - would be fetched from API in real app
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockVehicles = [
        {
          id: 1,
          brand: 'Renault',
          model: 'Clio',
          year: 2022,
          category: 'Économique',
          image: '/assets/images/Renault Clio.jpg',
          price: 35,
          transmission: 'Manuelle',
          seats: 5,
          fuelType: 'Essence',
          available: true,
          description: 'Parfaite pour la ville avec sa taille compacte et sa consommation économique.',
          features: ['Climatisation', 'Bluetooth', 'GPS', 'Régulateur de vitesse']
        },
        {
          id: 2,
          brand: 'Peugeot',
          model: '3008',
          year: 2021,
          category: 'SUV',
          image: '/assets/images/Peugeot 3008.jpg',
          price: 65,
          transmission: 'Automatique',
          seats: 5,
          fuelType: 'Diesel',
          available: true,
          description: 'SUV idéal pour les voyages en famille avec un grand espace de chargement.',
          features: ['Climatisation', 'Bluetooth', 'GPS', 'Caméra de recul', 'Régulateur de vitesse adaptatif']
        },
        {
          id: 3,
          brand: 'Citroën',
          model: 'C3',
          year: 2022,
          category: 'Économique',
          image: '/assets/images/Citroën C3.jpg',
          price: 38,
          transmission: 'Manuelle',
          seats: 5,
          fuelType: 'Essence',
          available: true,
          description: 'Compacte et économique, idéale pour les déplacements urbains.',
          features: ['Climatisation', 'Bluetooth', 'Régulateur de vitesse']
        },
        {
          id: 4,
          brand: 'Audi',
          model: 'A4',
          year: 2021,
          category: 'Premium',
          image: '/assets/images/Audi_A4_B9_Limousine_3.0_TDI_quattro.webp',
          price: 95,
          transmission: 'Automatique',
          seats: 5,
          fuelType: 'Diesel',
          available: true,
          description: 'Berline premium avec finitions haut de gamme et performances exceptionnelles.',
          features: ['Climatisation bi-zone', 'Système audio premium', 'GPS', 'Sièges chauffants', 'Caméra 360°']
        },
        {
          id: 5,
          brand: 'Volkswagen',
          model: 'Golf',
          year: 2021,
          category: 'Compacte',
          image: '/assets/images/volkswagen-golf-r-mk85-2024.webp',
          price: 45,
          transmission: 'Manuelle',
          seats: 5,
          fuelType: 'Essence',
          available: true,
          description: 'La référence des compactes avec un équilibre parfait entre confort et performances.',
          features: ['Climatisation', 'Bluetooth', 'GPS', 'Régulateur de vitesse']
        },
        {
          id: 6,
          brand: 'Toyota',
          model: 'Yaris',
          year: 2022,
          category: 'Économique',
          image: '/assets/images/Yaris_mobile_Large-Landscape.webp',
          price: 40,
          transmission: 'Automatique',
          seats: 5,
          fuelType: 'Hybride',
          available: true,
          description: 'Citadine hybride économique et écologique pour des déplacements urbains.',
          features: ['Climatisation', 'Bluetooth', 'Caméra de recul']
        },
        {
          id: 7,
          brand: 'BMW',
          model: 'X3',
          year: 2021,
          category: 'SUV',
          image: '/assets/images/BMW X3.webp',
          price: 110,
          transmission: 'Automatique',
          seats: 5,
          fuelType: 'Diesel',
          available: false,
          description: 'SUV premium alliant confort, espace et performances.',
          features: ['Climatisation bi-zone', 'Système audio premium', 'GPS', 'Sièges chauffants', 'Toit panoramique']
        },
        {
          id: 8,
          brand: 'Mercedes',
          model: 'Classe C',
          year: 2021,
          category: 'Premium',
          image: '/assets/images/mercedes--classe-s-berline--2024-m-1.jpg',
          price: 120,
          transmission: 'Automatique',
          seats: 5,
          fuelType: 'Diesel',
          available: true,
          description: 'Berline de luxe avec confort premium et technologies avancées.',
          features: ['Climatisation bi-zone', 'Système audio premium', 'GPS', 'Sièges chauffants et ventilés', 'Assistant de conduite']
        }
      ];
      
      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles.filter(v => v.available));
      setIsLoading(false);
    }, 1000);
  }, []);

  // Calculate unique values for filters
  const uniqueCategories = [...new Set(vehicles.map(v => v.category))];
  const uniqueBrands = [...new Set(vehicles.map(v => v.brand))];
  const uniqueTransmissions = [...new Set(vehicles.map(v => v.transmission))];
  const uniqueFuelTypes = [...new Set(vehicles.map(v => v.fuelType))];
  const maxPriceValue = Math.max(...vehicles.map(v => v.price), 500);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'minPrice' || filterType === 'maxPrice' || filterType === 'minSeats') {
        newFilters[filterType] = Number(value);
      } else {
        // Handle arrays (categories, brands, etc.)
        if (newFilters[filterType].includes(value)) {
          // Remove the value if it's already in the array
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          // Add the value if it's not in the array
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      }
      
      return newFilters;
    });
  };

  // Apply filters whenever activeFilters changes
  useEffect(() => {
    let filtered = vehicles.filter(vehicle => vehicle.available);
    
    // Filter by categories
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(v => activeFilters.categories.includes(v.category));
    }
    
    // Filter by brands
    if (activeFilters.brands.length > 0) {
      filtered = filtered.filter(v => activeFilters.brands.includes(v.brand));
    }
    
    // Filter by transmissions
    if (activeFilters.transmissions.length > 0) {
      filtered = filtered.filter(v => activeFilters.transmissions.includes(v.transmission));
    }
    
    // Filter by fuel types
    if (activeFilters.fuelTypes.length > 0) {
      filtered = filtered.filter(v => activeFilters.fuelTypes.includes(v.fuelType));
    }
    
    // Filter by price range
    filtered = filtered.filter(v => 
      v.price >= activeFilters.minPrice && v.price <= activeFilters.maxPrice
    );
    
    // Filter by minimum seats
    if (activeFilters.minSeats > 0) {
      filtered = filtered.filter(v => v.seats >= activeFilters.minSeats);
    }
    
    setFilteredVehicles(filtered);
  }, [activeFilters, vehicles]);

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      brands: [],
      transmissions: [],
      fuelTypes: [],
      minPrice: 0,
      maxPrice: maxPriceValue,
      minSeats: 0,
    });
  };

  // Format dates for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };  

  return (
    <div className="search-page">
      <SearchForm
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        uniqueCategories={uniqueCategories}
        uniqueBrands={uniqueBrands}
        uniqueTransmissions={uniqueTransmissions}
        uniqueFuelTypes={uniqueFuelTypes}
        maxPriceValue={maxPriceValue}
      />
      <SearchResults
        filteredVehicles={filteredVehicles}
        formatDate={formatDate}
      />
    </div>
  );
};

export default SearchPage;
