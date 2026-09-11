import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BucleCore } from './BucleCore'

gsap.registerPlugin(ScrollTrigger)

function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    tl.to(camera.position, { z: 4, y: 0, x: 0 })
      .to(camera.position, { z: 6, y: 2, x: 3 })
      .to(camera.position, { z: 3, y: -1, x: 0 })

    return () => tl.kill()
  }, [camera])

  return null
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={[1, 2]}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <BucleCore />
      </Float>

      <Environment preset="city" />
      <CameraController />
    </Canvas>
  )
}