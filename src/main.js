import React, {useState} from 'react';
import { Box, Button } from '@mui/material';
import {SectionsContainer, Section} from 'react-fullpage';

import logoDogCIn from './style/image/main/dog_cursorIn.png';
import logoCatCIn from './style/image/main/cat_cursorIn.png';
import logoOthersCIn from './style/image/main/others_cursorIn.png';
import logoDogCOut from './style/image/main/dog_cursorOut.png';
import logoCatCOut from './style/image/main/cat_cursorOut.png';
import logoOthersCOut from './style/image/main/others_cursorOut.png';


// import Example from './style/image/example.jpg';

// const Main = () => {
//   return (
      // <div className="snap-y snap-mandatory h-screen w-screen overflow-x-hidden">
      //   <div className="snap-start bg-yellow-200 h-screen w-screen flex items-center justify-center text-5xl">1</div>
      //   <div className="snap-start bg-blue-200   h-screen w-screen flex items-center justify-center text-5xl">2</div>
      //   <div className="snap-start bg-green-200  h-screen w-screen flex items-center justify-center text-5xl">3</div>
      // </div>
//   );
// };

let options = {
  anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
};

const stats = [
  { id: 1, name: '구조된 동물' , value: '44' },
  { id: 2, name: '입양된 동물', value: '18' },
  { id: 3, name: '유기된 동물', value: '152' },
]

const section2Data = [
  { id : 'logoDog', 
    className : "snap-start bg-yellow-200 h-screen w-screen flex flex-col items-center justify-center text-3xl",
    name : 'dog', 
    mouseEnterImg : logoDogCIn, 
    mouseLeaveImg : logoDogCOut,
    alt : 'dog',
    value1 : 15,
    value2 : 8,
    value3 : 75,
    href: '#',
  }, 
  { id : 'logoCat', 
    className : "snap-start bg-blue-200   h-screen w-screen flex flex-col items-center justify-center text-3xl",
    name : 'cat', 
    mouseEnterImg : logoCatCIn, 
    mouseLeaveImg : logoCatCOut,
    alt : 'cat',
    value1 : 15,
    value2 : 8,
    value3 : 75,
    href: '#',
  },
  { id : 'logoOthers',
    className : "snap-start bg-green-200  h-screen w-screen flex flex-col items-center justify-center text-3xl",
    name : 'others', 
    mouseEnterImg : logoOthersCIn, 
    mouseLeaveImg : logoOthersCOut,
    alt : 'others',
    value1 : 3,
    value2 : 2,
    value3 : 1,
    href: '#',
  },
]

const callouts = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]

const Main = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id) => {
    setIsHovered(id);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  

  return (
    <>
      <SectionsContainer {...options}>
        <Section>
          <Box
            sx={{
              bgcolor: "#f7f6cf",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="inner items-center justify-center text-5xl"
          >
            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="mx-auto flex max-w-xs flex-col gap-y-4"
                    >
                      <dt
                        className="text-base leading-7 text-gray-600"
                        style={{ width: "200px" }}
                      >
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
            <div className="vertical-text text-center">
              스<br />크<br />롤<br />↓
              {/* Scroll<br />↓ */}
            </div>
          </Box>
        </Section>
        
        <Section>
          <Box
            sx={{ bgcolor: "#b6d8f2", height: "100%" }}
            className="inner bg-blue items-center justify-center text-5xl">

            <div className="snap-x snap-mandatory h-screen w-screen flex overflow-x-hidden">
              
              {section2Data.map((data) => (
                <div className={data.className} key={data.id}>
                  <a href={data.href}
                     onMouseEnter={() => handleMouseEnter(data.id)}
                     onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={isHovered === data.id ? data.mouseEnterImg : data.mouseLeaveImg}
                      id={data.id}
                      className="logo"
                      alt={data.alt}
                    />
                  </a>
                  <p>구조된 동물.</p>
                </div>
              ))}
              
              {/* <div className="snap-start bg-yellow-200 h-screen w-screen flex flex-col items-center justify-center text-3xl">
                <a href="#"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={isHovered ? logoDogCIn : logoDogCOut}
                    id="logoDog"
                    className="logo"
                    alt="Dog"
                  />
                </a>
                <p>구조된 동물..</p>
              </div>

              <div className="snap-start bg-blue-200 h-screen w-screen flex flex-col items-center justify-center text-3xl">
                <a href="#"
                  onMouseEnter={() => { document.querySelector('#logoCat').src = logoCatCIn; }}
                  onMouseLeave={() => { document.querySelector('#logoCat').src = logoCatCOut; }}
                >
                <img src={logoCatCOut} id="logoCat" className="logo" alt="Dog" />
                </a>
                <p>구조된 동물</p>
              </div>

              <div className="snap-start bg-green-200 h-screen w-screen flex flex-col items-center justify-center text-3xl">
                <a href="#"
                  onMouseEnter={() => { document.querySelector('#logoOthers').src = logoOthersCIn; }}
                  onMouseLeave={() => { document.querySelector('#logoOthers').src = logoOthersCOut; }}
                >
                <img src={logoOthersCOut} id="logoOthers" className="logo" alt="Dog" />
                </a>
                <p>구조된 동물</p>
              </div> */}

            </div>
            
          </Box>
        </Section>

        {/* 페이지 2에 사진을 강아지, 고양이, 다른동물들(토끼 등 모여있는사진) 
        으로 3개의 Section을 만들고, 동물별로 오늘 발생건수, 입양건수, 파양건수를 보여준다.
        화면 전체의 3분의 1씩 잡아먹게 만들어도 괜찮을듯.*/}
        {/* <Section>
          <Box
            sx={{ bgcolor: "#b6d8f2", height: "100%" }}
            className="inner bg-blue items-center justify-center text-5xl"
          >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Collections
                  </h2>

                  <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {callouts.map((callout) => (
                      <div key={callout.name} className="group relative">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                          <img
                            src={callout.imageSrc}
                            alt={callout.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        {/* <h3 className="mt-6 text-sm text-gray-500">
                          <a href={callout.href}>
                            <span className="absolute inset-0" />
                            {callout.name}
                          </a>
                        </h3> 
                        <p className="text-base font-semibold text-gray-900">
                          {callout.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </Box>
        </Section> */}

        <Section>
          <Box
            sx={{ bgcolor: "#f4cfdf", height: "100%" }}
            className="inner bg-pink items-center justify-center text-5xl"
          >
            3
          </Box>
        </Section>
      </SectionsContainer>
    </>
  );
};

export default Main;
