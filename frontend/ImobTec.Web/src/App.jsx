import { useEffect, useState } from 'react'
import './App.css'
import { listProperties } from './services/imobtecApi'

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Apartamento Vista Mar',
    type: 'apartment',
    price: 850000,
    city: 'Santos',
    state: 'SP',
    district: 'Gonzaga',
    bedrooms: 3,
    bathrooms: 2,
    parking_spaces: 2,
    area_total: 120,
    is_featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80', is_primary: true }],
  },
  {
    id: 2,
    title: 'Casa em Condominio Fechado',
    type: 'house',
    price: 1250000,
    city: 'Campinas',
    state: 'SP',
    district: 'Alphaville',
    bedrooms: 4,
    bathrooms: 3,
    parking_spaces: 3,
    area_total: 280,
    is_featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80', is_primary: true }],
  },
  {
    id: 3,
    title: 'Studio Moderno Centro',
    type: 'apartment',
    price: 420000,
    city: 'Sao Paulo',
    state: 'SP',
    district: 'Consolacao',
    bedrooms: 1,
    bathrooms: 1,
    parking_spaces: 1,
    area_total: 45,
    is_featured: true,
    images: [{ url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80', is_primary: true }],
  },
  {
    id: 4,
    title: 'Cobertura Duplex Jardins',
    type: 'apartment',
    price: 2100000,
    city: 'Sao Paulo',
    state: 'SP',
    district: 'Jardim Paulista',
    bedrooms: 4,
    bathrooms: 4,
    parking_spaces: 3,
    area_total: 320,
    is_featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80', is_primary: true }],
  },
  {
    id: 5,
    title: 'Terreno Residencial',
    type: 'land',
    price: 350000,
    city: 'Sorocaba',
    state: 'SP',
    district: 'Cajuru',
    bedrooms: 0,
    bathrooms: 0,
    parking_spaces: 0,
    area_total: 450,
    is_featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80', is_primary: true }],
  },
  {
    id: 6,
    title: 'Sala Comercial Premium',
    type: 'commercial',
    price: 680000,
    city: 'Sao Paulo',
    state: 'SP',
    district: 'Itaim Bibi',
    bedrooms: 0,
    bathrooms: 2,
    parking_spaces: 2,
    area_total: 85,
    is_featured: false,
    images: [{ url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80', is_primary: true }],
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

function resolveLocation(property) {
  const city = property.address?.city || property.city
  const state = property.address?.state || property.state
  return [city, state].filter(Boolean).join(' - ') || 'Localizacao nao informada'
}

function resolveTypeLabel(property) {
  const type = property.property_type || property.type || 'imovel'
  const labels = {
    apartment: 'Apartamento',
    house: 'Casa',
    land: 'Terreno',
    commercial: 'Comercial',
    studio: 'Studio',
    farm: 'Fazenda',
  }
  return labels[type] || 'Imovel'
}

function resolvePrimaryImage(property) {
  const images = Array.isArray(property.images) ? property.images : []
  const primary = images.find((image) => image.is_primary)
  return primary?.url || images[0]?.url || 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80'
}

function resolveDistrict(property) {
  return property.address?.district || property.district || 'Bairro n/d'
}

function resolveMetrics(property) {
  return [
    property.bedrooms > 0 && { label: 'Quartos', value: property.bedrooms },
    property.bathrooms > 0 && { label: 'Banheiros', value: property.bathrooms },
    property.parking_spaces > 0 && { label: 'Vagas', value: property.parking_spaces },
    property.area_total && { label: 'Area', value: `${Number(property.area_total)}m\u00B2` },
  ].filter(Boolean)
}

function App() {
  const [properties, setProperties] = useState(MOCK_PROPERTIES)
  const [dataSource, setDataSource] = useState('mock')
  const [searchCity, setSearchCity] = useState('')
  const [searchType, setSearchType] = useState('all')

  useEffect(() => {
    let active = true

    async function loadProperties() {
      try {
        const data = await listProperties()
        if (!active) return
        if (data && data.length > 0) {
          setProperties(data)
          setDataSource('api')
        }
      } catch {
        // API indisponivel — mantém dados mock
      }
    }

    loadProperties()
    return () => { active = false }
  }, [])

  const filtered = properties.filter((p) => {
    const matchCity = !searchCity || (p.city || '').toLowerCase().includes(searchCity.toLowerCase())
    const matchType = searchType === 'all' || (p.property_type || p.type) === searchType
    return matchCity && matchType
  })

  const featuredProperties = filtered.filter((p) => p.is_featured)
  const allProperties = filtered
  const spotlightProperty = featuredProperties[0] || allProperties[0]

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brandmark">
          <div className="brandmark-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <strong>ImobTec</strong>
        </div>

        <nav className="main-nav" aria-label="Principal">
          <a className="active" href="#inicio">Inicio</a>
          <a href="#destaques">Destaques</a>
          <a href="#catalogo">Catalogo</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero-banner" id="inicio">
        <div className="hero-layout">
          <div className="hero-content">
            <span className="eyebrow">Plataforma Imobiliaria</span>
            <h1>Encontre o imovel ideal com tecnologia e praticidade.</h1>
            <p className="hero-copy">
              Busque entre os melhores imoveis disponiveis. Casas, apartamentos, terrenos e salas comerciais em um so lugar.
            </p>

            <div className="search-bar">
              <div className="search-field">
                <label htmlFor="search-city">Cidade</label>
                <input
                  id="search-city"
                  type="text"
                  placeholder="Ex: Sao Paulo"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                />
              </div>
              <div className="search-field">
                <label htmlFor="search-type">Tipo</label>
                <select id="search-type" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                  <option value="all">Todos</option>
                  <option value="apartment">Apartamento</option>
                  <option value="house">Casa</option>
                  <option value="land">Terreno</option>
                  <option value="commercial">Comercial</option>
                </select>
              </div>
              <button className="search-button" type="button">Buscar</button>
            </div>

            <div className="hero-pills">
              <span>{allProperties.length} imoveis disponiveis</span>
              <span>{featuredProperties.length} destaques</span>
              <span className={`source-pill source-${dataSource}`}>
                {dataSource === 'api' ? '● API conectada' : '○ Dados demonstrativos'}
              </span>
            </div>
          </div>

          {spotlightProperty && (
            <aside className="hero-spotlight">
              <div className="spotlight-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 18, 39, 0.08), rgba(8, 18, 39, 0.82)), url(${resolvePrimaryImage(spotlightProperty)})` }}>
                <span className="spotlight-tag">Destaque</span>
                <div className="spotlight-copy">
                  <strong>{formatCurrency(spotlightProperty.price)}</strong>
                  <h3>{spotlightProperty.title}</h3>
                  <p>{resolveDistrict(spotlightProperty)}, {resolveLocation(spotlightProperty)}</p>
                </div>
              </div>
              <div className="spotlight-meta">
                <span>{resolveTypeLabel(spotlightProperty)}</span>
                <span>{spotlightProperty.area_total}m² · {spotlightProperty.bedrooms} quartos</span>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section className="stats-strip" aria-label="Resumo">
        <article>
          <strong>{allProperties.length}</strong>
          <span>Imoveis</span>
        </article>
        <article>
          <strong>{featuredProperties.length}</strong>
          <span>Destaques</span>
        </article>
        <article>
          <strong>{new Set(allProperties.map((p) => p.city)).size}</strong>
          <span>Cidades</span>
        </article>
        <article>
          <strong>{dataSource === 'api' ? 'Online' : 'Demo'}</strong>
          <span>Status</span>
        </article>
      </section>

      {featuredProperties.length > 0 && (
        <section className="showcase" id="destaques">
          <div className="section-heading showcase-heading">
            <div>
              <span className="section-kicker">Destaques</span>
              <h2>Imoveis em Destaque</h2>
            </div>
            <a className="ghost-link" href="#catalogo">Ver todos</a>
          </div>

          <div className="property-grid featured-grid">
            {featuredProperties.map((property) => (
              <article key={property.id} className="property-card visual-card">
                <div
                  className="property-image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 24, 52, 0.04), rgba(8, 24, 52, 0.7)), url(${resolvePrimaryImage(property)})` }}
                >
                  <div className="property-image-top">
                    <span className="badge">{resolveTypeLabel(property)}</span>
                    <button className="favorite-button" type="button" aria-label="Favoritar imovel">♡</button>
                  </div>
                  <div className="property-image-bottom">
                    <strong>{formatCurrency(property.price)}</strong>
                  </div>
                </div>
                <div className="property-body">
                  <h3>{property.title}</h3>
                  <p className="location-line">📍 {resolveDistrict(property)}, {resolveLocation(property)}</p>
                  <div className="metrics-row">
                    {resolveMetrics(property).map((m) => (
                      <span key={`${property.id}-${m.label}`}>{m.value} {m.label}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="showcase" id="catalogo">
        <div className="section-heading showcase-heading">
          <div>
            <span className="section-kicker">Catalogo</span>
            <h2>Todos os Imoveis</h2>
          </div>
          <span className="result-count">{allProperties.length} resultados</span>
        </div>

        {allProperties.length === 0 && (
          <div className="empty-state">
            <p>Nenhum imovel encontrado com os filtros atuais.</p>
          </div>
        )}

        {allProperties.length > 0 && (
          <div className="property-grid">
            {allProperties.map((property) => (
              <article key={property.id} className="property-card visual-card">
                <div
                  className="property-image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 24, 52, 0.04), rgba(8, 24, 52, 0.7)), url(${resolvePrimaryImage(property)})` }}
                >
                  <div className="property-image-top">
                    <span className="badge">{resolveTypeLabel(property)}</span>
                    <button className="favorite-button" type="button" aria-label="Favoritar imovel">♡</button>
                  </div>
                  <div className="property-image-bottom">
                    <strong>{formatCurrency(property.price)}</strong>
                  </div>
                </div>
                <div className="property-body">
                  <h3>{property.title}</h3>
                  <p className="location-line">📍 {resolveDistrict(property)}, {resolveLocation(property)}</p>
                  <div className="metrics-row">
                    {resolveMetrics(property).map((m) => (
                      <span key={`${property.id}-${m.label}`}>{m.value} {m.label}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="site-footer" id="contato">
        <div className="footer-grid">
          <div className="footer-brand">
            <strong>ImobTec</strong>
            <p>Plataforma imobiliaria inteligente. Conectando voce ao imovel ideal.</p>
          </div>
          <div className="footer-links">
            <h4>Navegacao</h4>
            <a href="#inicio">Inicio</a>
            <a href="#destaques">Destaques</a>
            <a href="#catalogo">Catalogo</a>
          </div>
          <div className="footer-links">
            <h4>Contato</h4>
            <p>contato@imobtec.com.br</p>
            <p>(11) 99999-0000</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ImobTec — Todos os direitos reservados</p>
        </div>
      </footer>
    </main>
  )
}

export default App
