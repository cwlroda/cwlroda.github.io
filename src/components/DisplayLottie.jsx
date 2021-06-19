import React, { Suspense } from 'react';
import Lottie from 'react-lottie';
import Loading from './Loading'

const GreetingLottie = ({ name, animationData }) => {
  var defaultOptions;

  if (name === 'backend') {
    defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        width: '100%',
        height: '100%',
        preserveAspectRatio: 'xMaxYMax meet',
        viewBoxSize: '0 100 1006.06371 1000.2279'
      },
    };
  }
  else if (name === 'frontend') {
    defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        width: '100%',
        height: '100%',
        preserveAspectRatio: 'xMaxYMax meet',
        viewBoxSize: '0 100 1006.06371 1000.2279'
      },
    };
  }
  else if (name === 'cloud') {
    defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        width: '100%',
        height: '100%',
        preserveAspectRatio: 'xMaxYMax meet',
        viewBoxSize: '0 100 1006.06371 1000.2279'
      },
    };
  }
  else if (name === 'ml') {
    defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        width: '100%',
        height: '100%',
        preserveAspectRatio: 'xMaxYMax meet',
        viewBoxSize: '0 200 1006.06371 500.2279'
      },
    };
  }
  else {
    defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };
  }


  return (
    <Suspense fallback={<Loading />}>
      {/* To override default onClick pause by Lottie */}
      <div onClick={() => null}>
        <Lottie
          options={defaultOptions}
        />
      </div>
    </Suspense>
  )
}

export default GreetingLottie;
