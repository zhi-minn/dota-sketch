import React, { useEffect, useRef } from 'react';

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    const parent = canvas.parentElement;
    if (!parent) {return;}

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;


    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    let lastX = 0;
    let lastY = 0;

    const startDrawing = (event: MouseEvent) => {
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      lastX = event.clientX - rect.left;
      lastY = event.clientY - rect.top;
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawingRef.current) {return;}

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastX = x;
      lastY = y;
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
    };

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Clean up event listeners on unmount
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  return (
    <canvas id="drawing-board" ref={canvasRef} />
  );
}