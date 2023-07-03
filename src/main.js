import React from 'react';
import { Box } from '@mui/material';
import {SectionsContainer, Section} from 'react-fullpage';
// import Example from './style/image/example.jpg';

// const Main = () => {
//   return (
//       <div className="snap-y snap-mandatory h-screen w-screen overflow-x-hidden">
//         <div className="snap-start bg-yellow-200 h-screen w-screen flex items-center justify-center text-5xl">1</div>
//         <div className="snap-start bg-blue-200   h-screen w-screen flex items-center justify-center text-5xl">2</div>
//         <div className="snap-start bg-green-200  h-screen w-screen flex items-center justify-center text-5xl">3</div>
//       </div>
//   );
// };

let options = {
  anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
};

const stats = [
  { id: 1, name: '구조된 동물' , value: '44 million' },
  { id: 2, name: '입양된 동물', value: '$119 trillion' },
  { id: 3, name: '유기된 동물', value: '47,000' },
]

const Main = () => {
  return (
    <>
      <SectionsContainer {...options}>

        <Section>
        <Box
  sx={{
    bgcolor: '#f7f6cf',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }}
  className="inner items-center justify-center text-5xl"
>
  <div className="py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">
              {stat.name}
            </dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
  <div className="vertical-text">스<br />크<br />롤<br />↓</div>
</Box>

          {/* <Box sx={{ bgcolor: '#f7f6cf', height: '100%' }} className="inner bg-[url(./style/image/example.jpg)] items-center justify-center text-5xl">
            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">

                      <dt className="text-base leading-7 text-gray-600">
                        {stat.name}
                      </dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        {stat.value}
                      </dd>

                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="vertical-text">스<br />크<br />롤</div>
          </Box> */}
        </Section>

        <Section>
          <Box sx={{ bgcolor: '#b6d8f2', height: '100%' }}className="inner bg-blue items-center justify-center text-5xl">
            2
          </Box>
        </Section>

        <Section>
        <Box sx={{ bgcolor: '#f4cfdf', height: '100%' }}className="inner bg-pink items-center justify-center text-5xl">
            3
          </Box>
        </Section>

      </SectionsContainer>
    </>
  );
};

export default Main;
