//contact
import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm">
                        <span className="mr-2">Contactez-nous:</span>
                        <Link to="/contact" className="text-blue-400 hover:underline">
                            <i className="fas fa-envelope"></i> Envoyer un message
                        </Link>
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default Contact;
