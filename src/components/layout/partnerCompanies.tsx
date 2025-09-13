import React from 'react';
import inconfidenciaLogo from '../../assets/PartnerCompanies/Inconfidencia.png';
import tkeLogo from '../../assets/PartnerCompanies/TKE.png';
import pontalLogo from '../../assets/PartnerCompanies/Pontal.png';
import jockeyLogo from '../../assets/PartnerCompanies/JockeyRS.png';
import cwaLogo from '../../assets/PartnerCompanies/CWA.png';
import metaLogo from '../../assets/PartnerCompanies/MetaAgenciaDigital.png';
import paimLogo from '../../assets/PartnerCompanies/Paim.png';
import cindapaLogo from '../../assets/PartnerCompanies/Cindapa.png';
import maisALogo from '../../assets/PartnerCompanies/maisA.png'; 
import ondawebLogo from '../../assets/PartnerCompanies/OndaWeb.png';

const partners = [
  { src: inconfidenciaLogo, alt: 'Logo Inconfidência' },
  { src: tkeLogo, alt: 'Logo TKE' },
  { src: pontalLogo, alt: 'Logo Pontal' },
  { src: jockeyLogo, alt: 'Logo Jockey Club' },
  { src: cwaLogo, alt: 'Logo CWA' },
  { src: metaLogo, alt: 'Logo Meta Agência Digital' },
  { src: paimLogo, alt: 'Logo Paim' },
  { src: cindapaLogo, alt: 'Logo CINDAPA' },
  { src: maisALogo, alt: 'Logo maisA' }, 
  { src: ondawebLogo, alt: 'Logo OndaWeb' },
];

const PartnerCompanies = () => {
  return (
    <div className="bg-[#005172] flex flex-col items-center p-6 md:p-12 lg:p-24 gap-6 md:gap-12">
      <h2 className="text-white font-manrope font-bold text-3xl leading-[48px] tracking-[0.5px] w-full text-center">Empresas Parceiras</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
        {partners.map((partner, index) => (
          <img
            key={index}
            src={partner.src}
            alt={partner.alt} 
            className="w-full h-auto object-contain max-h-24" 
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-white w-[278px] h-[63px] py-3 px-2 justify-center items-center rounded-[10px] shadow-lg hover:bg-gray-200 transition-colors duration-300"
          onClick={() => {
            const redirect = true;
            const urlNormal = 'https://paodospobre.com.br';
            const linkMock = 'https://mock.com';
            window.location.href = redirect ? urlNormal : linkMock;
          }}
        >
          Saiba mais
        </button>
      </div>
    </div>
  );
};

export default PartnerCompanies;