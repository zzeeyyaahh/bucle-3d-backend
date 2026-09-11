import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

const services = ['Custom Web Apps', 'Product Engineering', 'UI/UX Engineering']

export function Overlay() {
  const setActiveService = useStore((state) => state.setActiveService)

  return (
    <div className="scroll-container" style={{ position: 'relative', zIndex: 10, color: 'white' }}>
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>Bucle by Zeens</h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1rem', color: '#ccc' }}>Engineering Next-Gen Web Applications</p>
        </motion.div>
      </section>

      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Our Expertise</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              whileHover={{ scale: 1.05 }}
              onPointerEnter={() => setActiveService(service)}
              onPointerLeave={() => setActiveService(null)}
            >
              <h3>{service}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Build Your Next Product</h2>
          <button style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontSize: '1rem' }}>
            Start a Project
          </button>
        </div>
      </section>
    </div>
  )
}