import React, { useMemo, useState } from "react";

const typeLabels = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
  cobertura: "Cobertura",
  kitnet: "Kitnet",
  fazenda: "Fazenda",
  chacara: "Chacara",
};

const fallbackProperty = {
  id: "IMB-0001",
  title: "Apartamento moderno proximo ao centro",
  description:
    "Imovel de exemplo para a tela de detalhes. Aqui voce pode exibir fotos, descricao, caracteristicas e dados de contato do anunciante.",
  type: "apartamento",
  transaction: "venda",
  price: 580000,
  neighborhood: "Centro",
  city: "Sao Paulo",
  state: "SP",
  address: "Rua Exemplo, 123",
  bedrooms: 3,
  bathrooms: 2,
  parking_spots: 2,
  area: 98,
  contact_phone: "(11) 99999-9999",
  contact_email: "contato@imobtec.com",
  created_date: "2026-03-30",
  features: ["Varanda", "Elevador", "Portaria", "Vaga coberta"],
  images: [
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  ],
};

function formatPrice(price) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Nao informado";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Nao informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function FeatureCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default function PropertyDetail({ property = fallbackProperty, onBack }) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = useMemo(() => {
    if (Array.isArray(property?.images) && property.images.length > 0) {
      return property.images;
    }

    return fallbackProperty.images;
  }, [property]);

  const handleShare = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: "Confira este imovel na ImobTec",
          url: currentUrl,
        });
        return;
      } catch {
        return;
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl);
      window.alert("Link copiado para a area de transferencia.");
    }
  };

  const nextImage = () => {
    setCurrentImage((previous) => (previous + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((previous) => (previous - 1 + images.length) % images.length);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={onBack || (() => window.history.back())}
          className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
        >
          Voltar
        </button>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-slate-100">
                <img
                  src={images[currentImage]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-white"
                    >
                      Anterior
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-white"
                    >
                      Proxima
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-3 p-4">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setCurrentImage(index)}
                    className={`overflow-hidden rounded-2xl border ${
                      index === currentImage ? "border-slate-900" : "border-slate-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="h-20 w-28 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {property.transaction === "aluguel" ? "Aluguel" : "Venda"}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      {typeLabels[property.type] || property.type || "Imovel"}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-950">{property.title}</h1>
                  <p className="mt-2 text-sm text-slate-500">
                    {[property.address, property.neighborhood, `${property.city} - ${property.state}`]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-extrabold text-emerald-700">{formatPrice(property.price)}</p>
                  {property.transaction === "aluguel" && (
                    <p className="mt-1 text-sm text-slate-500">valor mensal</p>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {property.bedrooms > 0 && <FeatureCard value={property.bedrooms} label="Quartos" />}
                {property.bathrooms > 0 && <FeatureCard value={property.bathrooms} label="Banheiros" />}
                {property.parking_spots > 0 && <FeatureCard value={property.parking_spots} label="Vagas" />}
                {property.area > 0 && <FeatureCard value={`${property.area} m2`} label="Area" />}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Descricao</h2>
              <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600">
                {property.description || "Descricao nao informada."}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Caracteristicas</h2>

              {Array.isArray(property.features) && property.features.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-slate-500">Nenhuma caracteristica cadastrada.</p>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Contato</h2>

              <div className="mt-4 space-y-3">
                <a
                  href={property.contact_phone ? `tel:${property.contact_phone}` : "#"}
                  className="block rounded-2xl bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                >
                  {property.contact_phone || "Telefone nao informado"}
                </a>

                <a
                  href={property.contact_email ? `mailto:${property.contact_email}` : "#"}
                  className="block rounded-2xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                >
                  {property.contact_email || "E-mail nao informado"}
                </a>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Compartilhar anuncio
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Resumo</h2>

              <dl className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                  <dt>Codigo</dt>
                  <dd className="font-semibold text-slate-900">{property.id || "Sem codigo"}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                  <dt>Publicado em</dt>
                  <dd className="font-semibold text-slate-900">{formatDate(property.created_date)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                  <dt>Cidade</dt>
                  <dd className="font-semibold text-slate-900">{property.city || "Nao informada"}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt>Estado</dt>
                  <dd className="font-semibold text-slate-900">{property.state || "Nao informado"}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}