import * as React from "react"
import Button from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"

type CTA =
  | { label: string; href: string; onClick?: never; external?: boolean }
  | { label: string; onClick: () => void; href?: never; external?: boolean }

export type HeroItem = {
  id?: string | number
  imageUrl: unknown
  title: string
  description?: string
  location?: string
  date?: string
  time?: string
  imageAlt?: string
  buttonLabel?: string
  buttonLink?: string
  overlayClassName?: string
}

export type HeroProps = {
  items: HeroItem[]
  className?: string
  showArrows?: boolean
  showIndicators?: boolean
}

function resolveSrc(img: unknown): string {
  if (!img) return ""
  if (typeof img === "string") return img
  const anyImg = img as any
  if (typeof anyImg.src === "string") return anyImg.src
  if (typeof anyImg.default === "string") return anyImg.default
  if (typeof anyImg.default?.src === "string") return anyImg.default.src
  return ""
}

export function Hero({
  items,
  className,
  showArrows = true,
  showIndicators = true,
}: HeroProps) {
  const [index, setIndex] = React.useState(1)
  const count = items.length

  // /* FEATURE FUTURA – autoplay/transição: */
  // React.useEffect(() => {
  //   const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
  //   return () => clearInterval(id)
  // }, [count])

  const go = (dir: -1 | 1) => {
    setIndex((i) => {
      const next = i + dir
      if (next < 0) return count - 1
      if (next >= count) return 0
      return next
    })
  }

  return (
    <section
      aria-roledescription={count > 1 ? "carousel" : undefined}
      className={cn(
        // tela cheia, sem borda arredondada
        "relative w-full h-[60svh] min-h-[480px] overflow-hidden bg-black",
        className,
      )}
    >
      <div className="absolute inset-0">
        {items.map((item, i) => {
          const visible = i === index
          const hasInfo = !!(item.location || item.date || item.time)
          const src = resolveSrc(item.imageUrl)

          return (
            <article
              key={item.id ?? i}
              aria-roledescription="slide"
              aria-hidden={!visible}
              className={cn(
                "absolute inset-0",
                visible ? "opacity-100" : "opacity-0 pointer-events-none",
              )}
            >
              <img
                src={src}
                alt={item.imageAlt ?? ""}
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                onError={() => console.warn("[Hero] Falha ao carregar imagem:", src)}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60",
                  item.overlayClassName,
                )}
                aria-hidden
              />
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full gap-4 sm:gap-6 md:grid-cols-12">
                  {/* Coluna esquerda: título + descrição */}
                  <div className="md:col-span-7 lg:col-span-8 max-w-xl">
                    <h1 className="text-balance max-w-[22ch] sm:max-w-[26ch] lg:max-w-[30ch] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow">
                      {item.title}
                    </h1>

                    {item.description && (
                      <p
                        className="mt-3 max-w-2xl text-pretty text-sm/6 sm:text-base/7 md:text-lg/8 text-white px-4 py-2 inline-block bg-[#00D1D3]/90 rounded-lg ">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {hasInfo && (
                    <div className="md:col-span-5 lg:col-span-4">
                      <div className="ml-auto max-w-sm rounded-xl bg-[#00D1D3]/70 p-4 backdrop-blur-md shadow-lg">
                        <dl className="space-y-3 text-sm text-white">
                          {item.location && (
                            <div>
                              <div className="flex items-center gap-2">
                                <span aria-hidden className="inline-block h-5 w-5">
                                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
                                    <path d="M12 21s7-6.17 7-11a7 7 0 1 0-14 0c0 4.83 7 11 7 11Z" strokeWidth="1.5" />
                                    <circle cx="12" cy="10" r="2.5" strokeWidth="1.5" />
                                  </svg>
                                </span>
                                <dt className="font-medium">Local</dt>
                              </div>
                              <dd className="mt-1 pl-7 text-left text-white">{item.location}</dd>
                            </div>
                          )}

                          {item.date && (
                            <div>
                              <div className="flex items-center gap-2">
                                <span aria-hidden className="inline-block h-5 w-5">
                                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
                                    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
                                    <path d="M8 2v4M16 2v4M3 10h18" strokeWidth="1.5" />
                                  </svg>
                                </span>
                                <dt className="font-medium">Data</dt>
                              </div>
                              <dd className="mt-1 pl-7 text-left text-white">{item.date}</dd>
                            </div>
                          )}

                          {item.time && (
                            <div>
                              <div className="flex items-center gap-2">
                                <span aria-hidden className="inline-block h-5 w-5">
                                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
                                    <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                                    <path d="M12 7v5l3 2" strokeWidth="1.5" />
                                  </svg>
                                </span>
                                <dt className="font-medium">Horário</dt>
                              </div>
                              <dd className="mt-1 pl-7 text-left text-white">{item.time}</dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      <div className="mt-4">
                        <Button
                          size="small"
                          variant="quaternary"
                          onClick={() =>
                            window.open(item.buttonLink!)
                          }
                        >
                          {item.buttonLabel}
                        </Button>
                      </div>
                    </div>
                  )}


                </div>
              </div>
            </article>
          )
        })}
      </div>
      {
        showArrows && count > 1 && (
          <>
            <button
              aria-label="Slide anterior"
              onClick={() => go(-1)}
              className="group absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80 md:left-4"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-900 group-active:translate-x-[-1px] transition">
                <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button
              aria-label="Próximo slide"
              onClick={() => go(1)}
              className="group absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80 md:right-4"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-900 group-active:translate-x-[1px] transition">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </>
        )
      }

      {
        showIndicators && count > 1 && (
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 md:bottom-4">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir para o slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "pointer-events-auto h-2.5 w-2.5 rounded-full border border-white/70 transition",
                  i === index ? "bg-white" : "bg-white/20 hover:bg-white/40",
                )}
              />
            ))}
          </div>
        )
      }
    </section >
  )
}