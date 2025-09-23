import { Hero, type HeroItem } from "@/components/layout/hero"
import { Newsletter } from "@/components/ui/newsletter";
import PartnerCompanies from "@/components/layout/partner-companies"
import News from "@/components/layout/news";
import festaImg from "@/assets/festa-junina-pp.jpg"
import quadra from "@/assets/quadra-pp.jpg"
import fundo from "@/assets/fundo-pp.png"

const heroItems: HeroItem[] = [
  {
    imageUrl: festaImg,
    title: "Festa Junina do Pão dos Pobres",
    description:
      "Comemoraremos em junho de 2026 a tradicional Festa Junina do Pão dos Pobres para todos que quiserem vir e celebrar com a gente!",
    location: "Rua da República, 801 - Cidade Baixa, Porto Alegre",
    date: "20 de junho",
    time: "10:30",
    buttonLabel: "Ir para o site",
    buttonLink: "https://www.paodospobres.org.br/"
  },
  {
    imageUrl: quadra,
    title: "Todo dia um futuro novo!",
    description: "Conheça nossos projetos e como você pode ajudar.",
    location: "Rua da República, 801 - Cidade Baixa, Porto Alegre",
    date: "20 de junho",
    time: "10:30",
    buttonLabel: "Ir para o site",
    buttonLink: "/doacao "
  },
  {
    imageUrl: fundo,
    title: "Mais uma imagem!",
    description: "Uma tela hero mais clean."
  },
]

const Home = () => {
  return (
    <div className="flex flex-col bg-gray-200">
      <Hero
        items={heroItems}
      />

      <div>
        <News/> 
        <Newsletter />
        <PartnerCompanies />

      </div>
    </div>

  )
}

export default Home