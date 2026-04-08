import { useEffect, useState } from 'react'
import './App.css'
import { listProperties } from './services/imobtecApi'

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

function resolveAdvertiser(property) {
  return property.advertiser?.name || property.organization?.name || 'Curadoria ImobPrime'
}

function resolveMetrics(property) {
  return [
    { label: 'Quartos', value: property.bedrooms || 0 },
    { label: 'Banheiros', value: property.bathrooms || 0 },
    { label: 'Vagas', value: property.parking_spaces || 0 },
    { label: 'Area', value: property.area_total ? `${Number(property.area_total)}m2` : 'n/d' },
  ]
}

function App() {
  const [properties, setProperties] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadProperties() {
      try {
        const data = await listProperties()

        if (!active) {
          return
        }

        setProperties(data)
        setStatus('success')
      } catch (error) {
        if (!active) {
          return
        }

        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Falha ao consultar a API.')
      }
    }

    loadProperties()

    return () => {
      active = false
    }
  }, [])

  const featuredProperties = properties.slice(0, 3)
  const spotlightProperty = featuredProperties[0]

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brandmark">
          <div className="brandmark-icon">▣</div>
          <div>
            <strong>ImobPrime</strong>
          </div>
        </div>

        <nav className="main-nav" aria-label="Principal">
          <a className="active" href="#inicio">Inicio</a>
          <a href="#destaques">Imoveis</a>
          <a href="#favoritos">Favoritos</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="hero-banner" id="inicio">
        <div className="hero-layout">
          <div className="hero-content">
            <span className="eyebrow">Mercado Premium</span>
            <h1>Uma vitrine mais autoral, elegante e pronta para o seu projeto.</h1>
            <p className="hero-copy">
              A home agora combina visual editorial com dados reais da API, destacando imoveis com foco em alto padrao e navegacao mais refinada.
            </p>

            <div className="hero-actions">
              <a className="primary-cta" href="#destaques">Explorar destaques</a>
              <a className="secondary-cta" href="#contato">Falar com consultoria</a>
            </div>

            <div className="hero-pills">
              <span>{status === 'success' ? `${properties.length} imoveis carregados` : 'Consultando API'}</span>
              <span>Curadoria ImobPrime</span>
              <span>127.0.0.1:8000</span>
            </div>
          </div>

          {spotlightProperty && status === 'success' && (
            <aside className="hero-spotlight">
              <div className="spotlight-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 18, 39, 0.12), rgba(8, 18, 39, 0.78)), url(${resolvePrimaryImage(spotlightProperty)})` }}>
                <span className="spotlight-tag">Selecao da semana</span>
                <div className="spotlight-copy">
                  <strong>{formatCurrency(spotlightProperty.price)}</strong>
                  <h3>{spotlightProperty.title}</h3>
                  <p>{resolveDistrict(spotlightProperty)}, {resolveLocation(spotlightProperty)}</p>
                </div>
              </div>

              <div className="spotlight-meta">
                <span>{resolveTypeLabel(spotlightProperty)}</span>
                <span>{resolveAdvertiser(spotlightProperty)}</span>
              </div>
            </aside>
          )}
        </div>

        <div className={`status-banner status-${status}`}>
          {status === 'loading' && 'Consultando o backend para montar a vitrine.'}
          {status === 'success' && 'Conexao ativa com a API de imoveis.'}
          {status === 'error' && `Falha na conexao: ${errorMessage}`}
        </div>
      </section>

      <section className="stats-strip" aria-label="Resumo da vitrine">
        <article>
          <strong>{properties.length}</strong>
          <span>Imoveis publicados</span>
        </article>
        <article>
          <strong>{featuredProperties.filter((property) => property.is_featured).length || 1}</strong>
          <span>Destaques ativos</span>
        </article>
        <article>
          <strong>{status === 'success' ? 'Online' : 'Sync'}</strong>
          <span>Status da API</span>
        </article>
      </section>

      <section className="showcase" id="destaques">
        <div className="section-heading showcase-heading">
          <div>
            <span className="section-kicker">Destaques</span>
            <h2>Imoveis em Destaque</h2>
          </div>

          <a className="ghost-link" href="#destaques">Ver todos</a>
        </div>

        {status === 'loading' && (
          <div className="empty-state">
            <p>Carregando os imoveis em destaque...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="empty-state error-state">
            <p>Nao foi possivel montar a home porque a API nao respondeu.</p>
            <p className="hint-text">Com o backend ativo em 127.0.0.1:8000, esta vitrine preenche automaticamente.</p>
          </div>
        )}

        {status === 'success' && featuredProperties.length === 0 && (
          <div className="empty-state">
            <p>Nenhum imovel publicado foi retornado pela API.</p>
          </div>
        )}

        {status === 'success' && featuredProperties.length > 0 && (
          <div className="property-grid featured-grid">
            {featuredProperties.map((property) => (
              <article key={property.id} className="property-card visual-card">
                <div
                  className="property-image"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 24, 52, 0.04), rgba(8, 24, 52, 0.7)), url(${resolvePrimaryImage(property)})` }}
                >
                  <div className="property-image-top">
                    <span className="badge">{resolveTypeLabel(property)}</span>
                    <button className="favorite-button" type="button" aria-label="Favoritar imovel">
                      ♡
                    </button>
                  </div>

                  <div className="property-image-bottom">
                    <strong>{formatCurrency(property.price)}</strong>
                  </div>
                </div>

                <div className="property-body">
                  <h3>{property.title || 'Imovel sem titulo'}</h3>
                  <p className="location-line">◉ {resolveDistrict(property)}, {resolveLocation(property)}</p>

                  <div className="metrics-row">
                    {resolveMetrics(property).map((metric) => (
                      <span key={`${property.id}-${metric.label}`}>{metric.value} {metric.label}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
