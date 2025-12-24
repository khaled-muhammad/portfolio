import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export interface Certificate {
  id: number;
  title: string;
  image: string;
  link?: string;
  [key: string]: any;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full"
    >
      <div className="relative p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:bg-white/20 transition-all duration-300 h-full flex flex-col">
        {/* Glassmorphic sheen effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-4">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
            <img 
              src={certificate.image} 
              alt={certificate.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-between">
          <h3 className="text-xl font-bold text-white mb-2 comfortaa-700 group-hover:text-cyan-300 transition-colors">
            {certificate.title}
          </h3>
          
          <div className="flex justify-end mt-4">
             {certificate.link ? (
                certificate.link.startsWith('http') ? (
                  <a 
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    View Certificate
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <Link 
                    to={certificate.link}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    View Certificate
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                )
             ) : (
                <span className="text-white/50 text-sm italic">No link available</span>
             )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
