import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState('buy'); // 'buy' | 'login'
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check if already has access
    fetch('/api/verify')
      .then(r => r.json())
      .then(d => { if (d.access) setHasAccess(true); })
      .catch(() => {})
      .finally(() => setChecked(true));

    // Show cancelled message
    if (window.location.search.includes('cancelled')) {
      setShowModal(true);
    }
  }, []);

  async function handleCheckout(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, coupon: coupon.trim().toUpperCase() || undefined }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Грешка при плащане');
      }
    } catch {
      setError('Грешка. Опитай отново.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = '/academy';
      } else {
        setLoginError(data.error || 'Грешка. Опитай отново.');
      }
    } catch {
      setLoginError('Грешка. Опитай отново.');
    } finally {
      setLoginLoading(false);
    }
  }

  if (!checked) return null;

  return (
    <>
      <Head>
        <title>PillowPoint Academy</title>
        <meta name="description" content="PillowPoint Academy - 13 видео урока за плетени основи, интерактивен генератор за 5 форми и Viber общност. Плети красиви панери с текстилна прежда по метода на Кристина от PillowPoint." />
      </Head>

      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>Pillow<span>Point</span></div>
          <nav className={styles.nav}>
            {hasAccess
              ? <a href="/academy" className="btn">Към академията →</a>
              : <button className="btn" onClick={() => setShowModal(true)}>Отключи академията</button>
            }
          </nav>
        </header>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroKicker}>PillowPoint Academy</div>
          <h1 className={styles.heroTitle}>
            Плетенето е <em>изкуство.</em><br/>
            Нека ви помогна да усвоите<br/>принципите на плетене с текстилни прежди.
          </h1>
          <p className={styles.heroText}>
            Аз съм Кристина от PillowPoint — плета от 2018 г. и помагам на жени по целия свят да създават красиви ръчно изработени панери и чанти. В академията ще намериш видео уроци стъпка по стъпка и интерактивен генератор, който изчислява точно колко бримки са ти нужни за всяка основа по метода на моя бранд.
          </p>
          <div className={styles.heroActions}>
            {hasAccess ? (
              <a href="/academy" className="btn gold">Отвори академията →</a>
            ) : (
              <>
                <button className="btn gold" onClick={() => setShowModal(true)}>
                  Отключи академията — €14.90
                </button>
                <a href="/academy" className="btn ghost">Разгледай безплатно</a>
              </>
            )}
          </div>

        </section>

        {/* What's included */}
        <section className={styles.features}>
          <div className={styles.featureGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎬</div>
              <h3>Видео уроци</h3>
              <p>13 видео урока с аудио обяснения на български - от избор на прежда до всички форми на основи.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🧮</div>
              <h3>Генератор за основи</h3>
              <p>Избери форма и размер - генераторът изчислява точния брой бримки на всеки ред по PillowPoint метода.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📐</div>
              <h3>Реални мерки</h3>
              <p>Всички данни са измерени лично - кръг, квадрат, триъгълник, овал, правоъгълник с реални сантиметри.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>Достъп за 6 месеца</h3>
              <p>Еднократно плащане, достъп за 6 месеца. Новите уроци се добавят автоматично.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={styles.pricing}>
          <div style={{
            maxWidth: 720,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 24,
            padding: 'clamp(28px, 5vw, 52px)',
            boxShadow: '0 24px 64px -20px rgba(107,76,59,.18)',
            border: '1px solid rgba(201,169,110,.2)',
          }}>
            {/* Price header */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'Montserrat', fontWeight: 600, marginBottom: 12 }}>Пълен достъп</div>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(48px,8vw,72px)', fontWeight: 600, color: 'var(--brown)', lineHeight: 1 }}>€14.90</div>
              <p style={{ fontSize: 13, color: 'var(--brown2)', marginTop: 8 }}>Еднократно плащане · Достъп за 6 месеца</p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,169,110,.3),transparent)', marginBottom: 28 }} />

            {/* List */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                [<><strong>13 видео урока</strong>, които ще те научат как да плетеш перфектни панери с плетени основи</>, '🎬'],
                [<>Моят начин за <strong>невидимо съединяване</strong> на редове</>, '🪡'],
                [<><strong>Генератор за 5 форми</strong> в желан от теб размер - квадрат, кръг, овал, правоъгълник и триъгълник</>, '🧮'],
                [<>Насоки - <strong>кой номер кука</strong> да избереш, спрямо дебелината на твоята прежда</>, '📐'],
                [<><strong>Съвети за всеки ред</strong></>, '💡'],
                [<><strong>Viber общност</strong> само за членове - ще получаваш преференциални условия за новите продукти и услуги от бранда</>, '💬'],
                [<><strong>Помощ от мен</strong> и отговори на въпроси ако имаш нужда и нещо не ти е ясно</>, '🤝'],
                [<>Достъп от <strong>всяко устройство</strong> по всяко време</>, '📱'],
                [<>Достъп за <strong>6 месеца</strong></>, '⏳'],
              ].map(([text, icon], i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '10px 14px', borderRadius: 12, background: 'linear-gradient(90deg,rgba(201,169,110,.06),transparent)' }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <span style={{ fontSize: 14, color: 'var(--brown2)', lineHeight: 1.6 }}>{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="btn gold" style={{ width: '100%', textAlign: 'center', fontSize: 14, padding: '16px 24px' }} onClick={() => setShowModal(true)}>
              Отключи академията — €14.90
            </button>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--brown2)', marginTop: 12, opacity: .7 }}>🔒 Плащането е защитено от Stripe</p>
          </div>
        </section>

        {/* Masterclass teaser */}
        <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,48px)', background: 'linear-gradient(135deg,var(--blush),var(--cream))' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'Montserrat', fontWeight: 600, marginBottom: 12 }}>Допълнително</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(28px,5vw,42px)', fontWeight: 600, color: 'var(--brown)', marginBottom: 12, lineHeight: 1.2 }}>Майсторски класове</h2>
            <p style={{ fontSize: 14, color: 'var(--brown2)', lineHeight: 1.7, marginBottom: 28, maxWidth: 540, margin: '0 auto 28px' }}>Детайлни видео уроци за конкретни изделия с гласови инструкции на български език. Еднократно плащане - вечен достъп. Независими от академията.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
              {[
                { image: '/masterclass-chicken.jpg', title: 'Панер кокошка', badge: 'Лесни проекти', badgeColor: '#2d7a4f', price: '€4.99' },
                { image: '/masterclass-box.jpg', title: 'Панер с дървена основа и капак', badge: 'За напреднали', badgeColor: '#8B4513', price: '€4.99' },
              ].map((mc, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 24px rgba(107,76,59,.12)', textAlign: 'left' }}>
                  <div style={{ paddingTop: '75%', backgroundImage: `url(${mc.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: 10, left: 10, background: mc.badgeColor, color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px', fontFamily: 'Montserrat' }}>{mc.badge}</span>
                    <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: 12, fontWeight: 700, borderRadius: 999, padding: '3px 10px', fontFamily: 'Montserrat' }}>{mc.price}</span>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 17, fontWeight: 600, color: 'var(--brown)', lineHeight: 1.3 }}>{mc.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/academy" className="btn" style={{ background: 'var(--brown)', color: 'var(--cream)' }}>Разгледай всички майсторски класове →</a>
          </div>
        </section>

        {/* Masterclasses teaser */}
        <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,4vw,40px)', background: 'linear-gradient(135deg,var(--blush),var(--cream))' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'Montserrat', fontWeight: 600, marginBottom: 12 }}>Отделно от академията</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, color: 'var(--brown)', marginBottom: 12 }}>Майсторски класове</h2>
              <p style={{ fontSize: 14, color: 'var(--brown2)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>Детайлни видео уроци за конкретни изделия с гласови инструкции на български. Еднократно плащане - вечен достъп. Независими от академията.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginBottom: 32 }}>
              {[
                { image: '/masterclass-chicken.jpg', title: 'Панер кокошка, плетен от въже', badge: 'Лесни проекти', badgeColor: '#2d7a4f', price: '€4.99' },
                { image: '/masterclass-box.jpg', title: 'Панер с дървена основа, интересна плетка и дървен капак', badge: 'За напреднали', badgeColor: '#8B4513', price: '€4.99' },
              ].map((mc, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 32px -12px rgba(107,76,59,.2)', border: '1px solid var(--line)' }}>
                  <div style={{ position: 'relative', paddingTop: '100%', backgroundImage: `url(${mc.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <span style={{ position: 'absolute', top: 14, left: 14, background: mc.badgeColor, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 999, padding: '4px 12px', fontFamily: 'Montserrat' }}>{mc.badge}</span>
                    <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: 13, fontWeight: 700, borderRadius: 999, padding: '4px 12px', fontFamily: 'Montserrat' }}>{mc.price}</span>
                  </div>
                  <div style={{ padding: '18px 20px 20px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 19, fontWeight: 600, color: 'var(--brown)', lineHeight: 1.3 }}>{mc.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href="/academy" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--brown)', color: 'var(--cream)', fontFamily: 'Montserrat', fontSize: 13, fontWeight: 600, padding: '14px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '.06em', textTransform: 'uppercase' }}>
                Разгледай майсторски класове →
              </a>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerLogo}>PillowPoint</div>
          <p>© PillowPoint Academy · pillow-point.com</p>
        </footer>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>

            {/* Табове */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e8e0d8', marginBottom: 20 }}>
              <button onClick={() => setModalTab('buy')} style={{
                flex: 1, padding: '10px', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600, letterSpacing: '.06em',
                color: modalTab === 'buy' ? 'var(--brown)' : '#aaa',
                borderBottom: modalTab === 'buy' ? '2px solid var(--gold)' : '2px solid transparent',
              }}>Отключи достъп</button>
              <button onClick={() => setModalTab('login')} style={{
                flex: 1, padding: '10px', border: 'none', background: 'none', cursor: 'pointer',
                fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600, letterSpacing: '.06em',
                color: modalTab === 'login' ? 'var(--brown)' : '#aaa',
                borderBottom: modalTab === 'login' ? '2px solid var(--gold)' : '2px solid transparent',
              }}>Вече имам достъп</button>
            </div>

            {modalTab === 'buy' ? (
              <>
                <h2>Отключи академията</h2>
                <p className={styles.modalSub}>Въведи имейла си - с него ще влизаш в академията по всяко време. Ще ти изпратя бележка и потвърждение за плащането 🧶</p>
                <form onSubmit={handleCheckout}>
                  <label className={styles.formLabel}>Имейл адрес</label>
                  <input
                    type="email"
                    required
                    placeholder="твоят@имейл.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={styles.formInput}
                  />
                  <label className={styles.formLabel}>Промо код (ако имаш)</label>
                  <input
                    type="text"
                    placeholder="Въведи промо код"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value.toUpperCase())}
                    className={styles.formInput}
                  />
                  {error && <p className={styles.formError}>{error}</p>}
                  <button type="submit" className="btn gold" style={{width:'100%'}} disabled={loading}>
                    {loading ? 'Зареждане...' : 'Отключи академията →'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Влез в академията</h2>
                <p className={styles.modalSub}>Въведи имейла, с който си платил/а — ще те разпознаем автоматично.</p>
                <form onSubmit={handleLogin}>
                  <label className={styles.formLabel}>Имейл адрес</label>
                  <input
                    type="email"
                    required
                    placeholder="твоят@имейл.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className={styles.formInput}
                  />
                  {loginError && <p className={styles.formError}>{loginError}</p>}
                  <button type="submit" className="btn gold" style={{width:'100%'}} disabled={loginLoading}>
                    {loginLoading ? 'Проверяване...' : 'Влез в академията →'}
                  </button>
                </form>
              </>
            )}
            <p className={styles.modalNote}>🔒 Плащането е защитено от Stripe. Не съхраняваме данни от карти.</p>
          </div>
        </div>
      )}
    </>
  );
}
