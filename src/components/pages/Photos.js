import { useState, useRef, useEffect } from 'react';

//Denemelik Data
import data from "../deleteAfter/data.json";
import Button from '../micros/Button';

const Photos = () => {
  const [datas, setDatas] = useState(data.resources)
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [dateInfo, setDateInfo] = useState(datas.photos[currentIndex].date)

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
         currentIndex >= datas.photos.length-1
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
    setDateInfo(datas.photos[currentIndex].date)
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <>
    <div className=" w-[34.5%]">
    <div className="relative overflow-hidden">
      <div className="flex justify-between absolute w-full h-full">
        <button
          onClick={movePrev}
          className="hover:bg-blue-900/75 rounded-l-3xl text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          disabled={isDisabled('prev')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={moveNext}
          className="hover:bg-blue-900/75 rounded-r-3xl text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          disabled={isDisabled('next')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        ref={carousel}
        className="rounded-3xl relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
      >
        {datas.photos.map((resource, index) => {
          const date = resource.date.toString();
          const year = date.slice(0, 4)
          const month = date.slice(4, 6)
          const day = date.slice(6)
          return (
            <div
              key={index}
              className="carousel-item text-center relative sm:h-40 md:h-52 xl:h-80 3xl:h-[402px] snap-start"
              onClick={() => {
                setDateInfo(resource.date)
              }}
            >
              <a
                href={resource.link}
                className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
              >
                <img
                  src={resource.imageUrl || ''}
                  alt={`${day}.${month}.${year}`}
                  className="w-full aspect-square hidden"
                />
              </a>
              <a
                className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
              >
                <h3 className="text-white py-6 px-3 mx-auto text-xl">
                  {`${day}.${month}.${year}`}
                </h3>
              </a>
            </div>
          );
        })}
      </div>
      
    </div>
    <div className='flex items-center justify-center mt-7'>
      <Button handleOnClick={() => {}}>Fotoğraf Yükle</Button>
    </div>
  </div>
  {
    dateInfo && (
      <div className='absolute flex min-w-max bg-purple-300 shadow-purple-300 shadow-md rounded-3xl p-5 left-[18%]'>
        <table className='table-auto rounded-3xl'>
          <caption className='min-w-max font-bold'>Fotoğraf Tarihindeki Ölçüleriniz</caption>
          <thead>
            <tr>
              <th className='w-20'></th>
              <th className='w-20'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='shadow-md shadow-white'>
              <td className='text-end'>Kilo:</td>
              <td>{ datas.progress.find((arg) => arg.date === dateInfo).weight }kg</td>
            </tr>
            <tr className='shadow-md shadow-white'>
              <td className='text-end'>Yağ Oranı:</td>
              <td>%{ datas.progress.find((arg) => arg.date === dateInfo).fat }</td>
            </tr>
            <tr className='shadow-md shadow-white'>
              <td className='text-end'>Boyun:</td>
              <td>{ datas.progress.find((arg) => arg.date === dateInfo).neck }cm</td>
            </tr>
            <tr className='shadow-md shadow-white '>
              <td className='text-end'>Göğüs:</td>
              <td>{ datas.progress.find((arg) => arg.date === dateInfo).chest }cm</td>
            </tr>
            <tr className='shadow-md shadow-white'>
              <td className='text-end'>Bel:</td>
              <td>{ datas.progress.find((arg) => arg.date === dateInfo).waist }cm</td>
            </tr>
            <tr className='shadow-md shadow-white'>
              <td className='text-end'>Kalça:</td>
              <td>{ datas.progress.find((arg) => arg.date === dateInfo).hip }cm</td>
            </tr>
            <tr className='shadow-md shadow-white'>
              <td className='text-end'>Kol:</td>
              <td>{ datas.progress.find((arg) => arg.date === dateInfo).arm }cm</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  <div className='absolute w-32 right-1/4 flex items-center justify-center font-extrabold'>
    BU SAYFA FOTOĞRAF DEPOLAMA MALİYETİ DOLAYISIYLA SADECE DEMO HALİYLEDİR VE İŞLEVSİZDİR.
  </div>
  </>
  )
}

export default Photos