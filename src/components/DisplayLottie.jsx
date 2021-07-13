import React, { Suspense } from 'react';
import Lottie from 'react-lottie';

const EducationLottie = ({ name, animationData }) => {
  var defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      width: '100%',
      height: '100%',
      preserveAspectRatio: 'xMaxYMax meet',
      viewBoxSize: '0 100 506.06371 500.2279'
    },
  }

  return (
    <Suspense>
      {/* To override default onClick pause by Lottie */}
      <div onClick={() => null}>
        <Lottie
          options={defaultOptions}
        />
      </div>
    </Suspense>
  )
}

const ExperienceLottie = ({ name, animationData }) => {
  var defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      width: '100%',
      height: '100%',
      preserveAspectRatio: 'xMaxYMax meet',
      viewBoxSize: '0 100 506.06371 500.2279'
    },
  }

  return (
    <Suspense>
      {/* To override default onClick pause by Lottie */}
      <div onClick={() => null}>
        <Lottie
          options={defaultOptions}
        />
      </div>
    </Suspense>
  )
}

const SkillsLottie = ({ name, animationData }) => {
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
        viewBoxSize: '0 160 1006.06371 1000.2279'
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
        viewBoxSize: '0 210 1006.06371 1000.2279'
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
        viewBoxSize: '0 180 1006.06371 1000.2279'
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
        viewBoxSize: '0 0 1006.06371 700.2279'
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
    <Suspense>
      {/* To override default onClick pause by Lottie */}
      <div onClick={() => null}>
        <Lottie
          options={defaultOptions}
        />
      </div>
    </Suspense>
  )
}

const ContactLottie = ({ name, animationData }) => {
  var defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  }

  return (
    <Suspense>
      {/* To override default onClick pause by Lottie */}
      <div onClick={() => null}>
        <Lottie
          options={defaultOptions}
        />
      </div>
    </Suspense>
  )
}

export {
  EducationLottie,
  ExperienceLottie,
  SkillsLottie,
  ContactLottie,
};
