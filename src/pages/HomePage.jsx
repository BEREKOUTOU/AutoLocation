import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Renault from '/assets/images/Renault Clio.jpeg';
import Peugeot from '/assets/images/Peugeot 3008.jpg';
import Citroen from '/assets/images/citroen-c3.jpg';
import Audi from '/assets/images/Audi A4.jpg';
import Hero from '/assets/images/hero-bg.jpg';
function HomePage() {
  const [locations, setLocations] = useState([
    { id: 1, name: 'Paris' },
    { id: 2, name: 'Lyon' },
    { id: 3, name: 'Marseille' },
    { id: 4, name: 'Bordeaux' },
    { id: 5, name: 'Lille' }
  ]);
  
  const [featuredVehicles, setFeaturedVehicles] = useState([
    {
      id: 1,
      brand: 'Renault',
      model: 'Clio',
      year: 2022,
      category: 'Économique',
      image: '/assets/images/Renault Clio.jpeg',
      price: 35,
      transmission: 'Manuelle',
      seats: 5,
      fuelType: 'Essence'
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
      fuelType: 'Diesel'
    },
    {
      id: 3,
      brand: 'Citroën',
      model: 'C3',
      year: 2022,
      category: 'Économique',
      image: '/assets/images/citroen-c3.jpg',
      price: 38,
      transmission: 'Manuelle',
      seats: 5,
      fuelType: 'Essence'
    },
    {
      id: 4,
      brand: 'Audi',
      model: 'A4',
      year: 2021,
      category: 'Premium',
      image: '/assets/images/Audi A4.jpg',
      price: 95,
      transmission: 'Automatique',
      seats: 5,
      fuelType: 'Diesel'
    }
  ]);

  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1);
  
  const [formData, setFormData] = useState({
    location: '',
    pickupDate: currentDate.toISOString().split('T')[0],
    dropoffDate: tomorrowDate.toISOString().split('T')[0],
    pickupTime: '10:00',
    dropoffTime: '10:00',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create query string to pass to search page
    const searchParams = new URLSearchParams({
      location: formData.location,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      dropoffDate: formData.dropoffDate,
      dropoffTime: formData.dropoffTime
    }).toString();
    
    window.location.href = `/search?${searchParams}`;
  };
  
  // Hero section with animated background (using Tailwind utility classes)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[600px]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/assets/images/hero-bg.jpg')` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Louez la voiture idéale pour votre prochain voyage
            </h1>
            <p className="text-xl text-white mb-8">
              Découvrez notre flotte variée de véhicules pour tous vos besoins, à des tarifs compétitifs
            </p>
          </div>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-1">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Lieu de prise en charge
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Sélectionnez une ville</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Date de prise en charge
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      min={currentDate.toISOString().split('T')[0]}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <select
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                          {`${String(i).padStart(2, '0')}:00`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Date de retour
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      name="dropoffDate"
                      value={formData.dropoffDate}
                      onChange={handleInputChange}
                      min={formData.pickupDate}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <select
                      name="dropoffTime"
                      value={formData.dropoffTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                          {`${String(i).padStart(2, '0')}:00`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Rechercher un véhicule
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos véhicules populaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {vehicle.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {vehicle.year} • {vehicle.transmission} • {vehicle.seats} sièges • {vehicle.fuelType}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">{vehicle.price}€<span className="text-gray-600 text-sm font-normal">/jour</span></span>
                    <Link
                      to={`/vehicles/${vehicle.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/search"
              className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-6 py-3 rounded-md font-medium"
            >
              Voir tous les véhicules
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Comment ça fonctionne</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Recherchez</h3>
              <p className="text-gray-600">
                Indiquez vos dates et lieu de location pour trouver les véhicules disponibles.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Réservez</h3>
              <p className="text-gray-600">
                Choisissez le véhicule qui vous convient et réservez-le en quelques clics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Roulez</h3>
              <p className="text-gray-600">
                Récupérez votre véhicule à la date prévue et profitez de votre voyage.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Ce que disent nos clients</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">ML</span>
                </div>
                <div>
                  <h4 className="font-semibold">Marie Lambert</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Service impeccable ! La réservation était simple et la voiture était en parfait état. Je recommande vivement AutoLocation pour tous vos besoins de location."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">TD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Thomas Durand</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "J'ai loué un SUV pour un week-end en famille, et tout s'est déroulé parfaitement. Le processus est transparent et le personnel très professionnel."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Prix compétitifs et grand choix de véhicules. La seule petite critique serait le temps d'attente lors de la prise en charge, mais sinon tout était excellent."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;