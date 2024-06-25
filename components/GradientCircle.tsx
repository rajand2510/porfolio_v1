// components/CustomCursor.js
import React from 'react';
import AnimatedCursor from 'react-animated-cursor';

const GradientCircle = () => {
  return (
    <AnimatedCursor
      color="138, 43, 226" // Initial color (red)
      innerSize={8}
      outerSize={12}
      outerAlpha={0.5}
      innerScale={0.7}
      outerScale={5}
      // Optional: Uncomment to apply mixBlendMode styles
       outerStyle={{ mixBlendMode: 'difference' }}
      innerStyle={{ mixBlendMode: 'difference' }}
      // Optional: Uncomment to apply a custom animation effect
      // disableInteraction={true}
      // animationDuration={0.6}
      // trailAmplitude={6}
      // trailLength={30}
    />
  );
};

export default GradientCircle;
