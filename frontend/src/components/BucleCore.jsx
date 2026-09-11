import { useRef } from 'react'
import { motion } from 'framer-motion-3d'
import { useStore } from '../store/useStore'

export function BucleCore() {
  const meshRef = useRef()
  const activeService = useStore((state) => state.activeService)

  return (
    <motion.mesh
      ref={meshRef}
      scale={activeService ? 1.4 : 1}
      whileHover={{ scale: 1.15 }}
      animate={{
        rotateY: [0, Math.PI * 2],
        rotateX: [0, Math.PI / 2, 0],
      }}
      transition={{
        rotateY: { repeat: Infinity, duration: 12, ease: 'linear' },
        rotateX: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
        scale: { type: 'spring', stiffness: 200, damping: 20 },
      }}
    >
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshPhysicalMaterial
        color={activeService ? '#00f0ff' : '#7000ff'}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </motion.mesh>
  )
}