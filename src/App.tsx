import {CSSProperties, useEffect, useState} from "react";
import {motion, useSpring, useTransform, useViewportScroll} from "framer-motion";

import './App.css';

function App() {
  const {innerHeight, innerWidth} = window;
  const {scrollY} = useViewportScroll();

  const xRange = useTransform(scrollY, [0, innerHeight * 1.8], [0, -1 * innerWidth * 2])
  const x = useSpring(xRange, {stiffness: 400, damping: 90})

  const scrollRange = useTransform(scrollY, [0, innerHeight * 1.8], [0, 2.8])
  const scrollSpring = useSpring(scrollRange, {stiffness: 400, damping: 90})
  const [propStyle, setPropStyle] = useState<CSSProperties>({});

  useEffect(() => {
    scrollSpring?.onChange(y => {
      const containerSize = Math.min(document.body.clientWidth * .88, 1_400); // 88% or 1_400
      const nestScale = Math.min(.5, y / 2) + 1; // max 1.5
      const circleSize = containerSize * nestScale * .134 / 2;
      const nextTranslate = containerSize * nestScale * .005; // 55 at half;

      const oldCircle = Math.max((y * Math.min(y / 3, 1) / 2.8) * Math.max(innerHeight, innerWidth), 60);

      setPropStyle({
        '--container-size': `${containerSize}`,
        '--nest-scale-progress': `${nestScale}`,
        '--nest-translate-progress': `${nextTranslate}px`,
        '--clip-scenario-progress': `${100 - Math.min(y, 1) * 100}%`,
        '--clip-circle-progress': `${Math.max(oldCircle, circleSize)}px`,
      } as CSSProperties)
    });

    return () => scrollSpring.destroy();
  }, [])

  return (
      <div>
       <section className={'bg-gray-50'}>
         <div className="container py-4 mb-5 text-center">
           <p className={'text-sm'}>Prototype, inspired by <a href="https://store.google.com/product/nest_doorbell_battery"
           target={'_blank'} rel={'noreferrer'}>Google store</a>, coded by <a href="https://www.sentiero.digital/" target="_blank">Sentiero.digital</a> check the
             code on <a href="https://github.com/Sentiero-digital/ikea-card-system" target="_blank"
                        rel="noreferrer">Github</a></p>
         </div>
       </section>

        <motion.div className="App relative"
                    style={propStyle}>

          <header className={'min-h-[280vh] bg-white z-10'}>
            <div className="container">
              <h2 className="text-center font-bold text-3xl lg:text-7xl ">
                <span className="text-gray-800">Tieni d’occhio ciò che conta davvero.</span>
                <em className="block text-gray-400 not-italic">Fuori dalla tua porta.</em>
              </h2>
            </div>

            <div className="sticky z-20 top-0 min-h-screen">

              <div className="block absolute overflow-hidden inset-0 z-10">
                <div className="container">
                  <img
                      src="https://lh3.googleusercontent.com/ZcZLGe-qvr_1cWQKYZ8Mv-3YDGGXm2KQnXrUUyljvYl6DFYJSJwjRseMnd7XMsHCtwfaSnrqlWbLnUBN1yaLPr77Rg3_Pgmx=w2000"
                      alt=""
                      style={{}}
                      className={'nest w-full h-auto'}
                  />
                </div>
              </div>

              <div className="clip-sipario relative z-20 min-h-screen">
                <div className="absolute inset-0 pointer-events-none z-20 bg-stone-200 overflow-hidden">
                  <div className="absolute inset-0">
                    <motion.span className="scrolling-title whitespace-nowrap	"
                                 aria-hidden={true}
                                 style={{x}}>Hola Hi Bonjour こんにちは
                    </motion.span>
                  </div>
                </div>

                <div className="absolute z-30 inset-0 clip-circle">
                  <video playsInline disableRemotePlayback muted role="img"
                         aria-label="Friends, family and guests arrive for a birthday party and are spotted by the doorbell."
                         loop
                         className="absolute w-full h-full top-0 left-0 object-center object-cover"
                  >
                    <source
                        src="https://storage.googleapis.com/mannequin/blobs/0ee22f5a-40d1-4164-9d4e-2016198b0982.mp4"/>
                  </video>
                </div>
              </div>

            </div>
          </header>

        </motion.div>
        <div className="min-h-screen py-10" />
      </div>
  )
}

export default App
