import React, {useEffect, useRef} from 'react';

export function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    const context = canvas.getContext('2d');

    // Start drawing
    context.fillStyle = 'blue';
    context.fillRect(500, 500, 5000, 5000);
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
}