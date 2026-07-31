"use client";

import React from 'react';
import RutaPrivada from '../../../components/RutaPrivada';
import PanelColaborador from '../../../components/PanelColaborador';

export default function NuevaNotaPage() {
  return (
    <RutaPrivada>
      <div className="min-h-screen bg-[#0f0f12] py-10">
        <PanelColaborador />
      </div>
    </RutaPrivada>
  );
}