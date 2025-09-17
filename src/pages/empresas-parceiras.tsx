import inconfidenciaLogo from '@/assets/PartnerCompanies/Inconfidencia.png';
import tkeLogo from '@/assets/PartnerCompanies/TKE.png';
import pontalLogo from '@/assets/PartnerCompanies/Pontal.png';
import jockeyLogo from '@/assets/PartnerCompanies/JockeyRS.png';
import cwaLogo from '@/assets/PartnerCompanies/CWA.png';
import metaLogo from '@/assets/PartnerCompanies/MetaAgenciaDigital.png';
import cindapaLogo from '@/assets/PartnerCompanies/Cindapa.png';
import ondawebLogo from '@/assets/PartnerCompanies/OndaWeb.png';
import grupoZaffariLogo from '@/assets/PartnerCompanies/GrupoZaffari.png';
import sidersulLogo from '@/assets/PartnerCompanies/Sidersul.png';
import planaltoLogo from '@/assets/PartnerCompanies/Planalto.png';
import dryStoreLogo from '@/assets/PartnerCompanies/DryStore.png';
import banrisulLogo from '@/assets/PartnerCompanies/Banrisul.png';
import paimLogo from '@/assets/PartnerCompanies/Paim.png';
import maisALogo from '@/assets/PartnerCompanies/maisA.png';
import sindilojasLogo from '@/assets/PartnerCompanies/Sindilojas.png';
import oabLogo from '@/assets/PartnerCompanies/OAB.png';
import institutoClaroLogo from '@/assets/PartnerCompanies/InstitutoClaro.png';
import Button from '@/components/ui/button';

const companies = [
  { src: inconfidenciaLogo, alt: 'Logo Inconfidência' },
  { src: tkeLogo, alt: 'Logo TKE' },
  { src: pontalLogo, alt: 'Logo Pontal' },
  { src: jockeyLogo, alt: 'Logo Jockey Club' },
  { src: cwaLogo, alt: 'Logo CWA' },
  { src: metaLogo, alt: 'Logo Meta Agência Digital' },
  { src: cindapaLogo, alt: 'Logo CINDAPA' },
  { src: ondawebLogo, alt: 'Logo OndaWeb' },
  { src: grupoZaffariLogo, alt: 'Logo Grupo Zaffari' },
  { src: sidersulLogo, alt: 'Logo Sidersul' },
  { src: planaltoLogo, alt: 'Logo Planalto' },
  { src: dryStoreLogo, alt: 'Logo Dry Store' },
  { src: banrisulLogo, alt: 'Logo Banrisul' },
];

const institutions = [
  { src: paimLogo, alt: 'Logo Paim' },
  { src: maisALogo, alt: 'Logo maisA' },
  { src: sindilojasLogo, alt: 'Logo Sindilojas' },
  { src: oabLogo, alt: 'Logo OAB' },
  { src: institutoClaroLogo, alt: 'Logo Instituto Claro' },
];

const email = 'relacaoinstitucional@paodospobres.com.br'

const partners = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="
        bg-white
        flex flex-col items-center 
        px-6 md:px-12 lg:px-24 
        pt-8 md:pt-16 lg:pt-20 
        pb-8 md:pb-12 lg:pb-16 
        gap-4 md:gap-8
        flex-1"
      >
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[#f68537] font-manrope font-bold text-sm md:text-base uppercase tracking-wider mb-4">
            NOSSOS APOIADORES
          </p>
          <h1 className="text-[#00D1D3] font-manrope font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            VEJA QUEM JÁ CRIA NOVOS FUTUROS 
          </h1>
        </div>

        <h2 className="
        text-[#005172] font-manrope font-bold 
        text-3xl leading-[48px] tracking-[0.5px] 
        self-center md:self-start
        text-center md:text-start mb-8"
        >EMPRESAS PARCEIRAS</h2>
            
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 w-full mb-12 md:mb-16">
          {companies.map((company, index) => (
            <img
              key={index}
              src={company.src}
              alt={company.alt} 
              className="w-48 h-48 object-contain max-h-24" 
            />
          ))}
        </div>

        <h2 className="
        text-[#005172] font-manrope font-bold 
        text-3xl leading-[48px] tracking-[0.5px] 
        self-center md:self-start
        text-center md:text-start mb-8"
        >INSTITUIÇÕES PARCEIRAS</h2>

       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 w-full">
        {institutions.map((institution, index) => (
          <img
            key={index}
            src={institution.src}
            alt={institution.alt} 
            className="w-48 h-48 object-contain max-h-24" 
          />
        ))}
       </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <Button
            variant="secondary"
            size="large"
            className="!text-xl !font-bold"
            onClick={() => {
              window.location.href = `mailto:${email}`;
            }}
          >
            Faça parte
          </Button>
        </div>
      </main>
  </div>
  );
};

export default partners;