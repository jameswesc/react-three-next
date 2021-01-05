import { Suspense } from 'react'
import BackButton from '@/components/dom/back/back'
import useStore from '@/helpers/store'
import Head from 'next/head'
import { PerspectiveCamera } from '@react-three/drei'
import { editable as e } from 'react-three-editable'

// import Bird from '@/components/canvas/Bird/Bird'

import dynamic from 'next/dynamic'
const Bird = dynamic(() => import('@/components/canvas/Bird/Bird'), {
  ssr: false,
})

const Birds = () => {
  return new Array(5).fill().map((_, i) => {
    const x = (7.5 + Math.random() * 15) * (Math.round(Math.random()) ? -1 : 1)
    const y = -7.5 + Math.random() * 5
    const z = -2.5 + Math.random() * 5
    const bird = ['stork', 'parrot', 'flamingo'][Math.round(Math.random() * 2)]
    let speed = bird === 'stork' ? 0.5 : bird === 'flamingo' ? 2 : 5
    let factor =
      bird === 'stork'
        ? 0.5 + Math.random()
        : bird === 'flamingo'
        ? 0.25 + Math.random()
        : 1 + Math.random() - 0.5

    return (
      <Bird
        key={i}
        index={i}
        position={[x, y, z]}
        rotation={[0, x > 0 ? Math.PI : 0, 0]}
        speed={speed}
        factor={factor}
        url={`/glb/${bird}.glb`}
      />
    )
  })
}

const Canvas = () => {
  const ECamera = e(PerspectiveCamera, 'perspectiveCamera')

  return (
    <>
      <ECamera makeDefault uniqueName='Birds Camera' />
      <e.group uniqueName='Birds Group' position={[0, 0, -25]}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <Birds />
        </Suspense>
      </e.group>
    </>
  )
}

const Dom = () => {
  return (
    <div>
      <Head>
        <title>Oiseaux</title>
      </Head>
      <BackButton />
      <h1>BIRDS DOM</h1>
    </div>
  )
}

const Page = () => {
  useStore.setState({ loading: false })
  return (
    <>
      <Canvas r3f />
      <Dom />
    </>
  )
}

export default Page
