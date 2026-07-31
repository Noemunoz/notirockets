"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import RutaPrivada from '../../../../components/RutaPrivada';
import PanelEditor from '../../../../components/PanelEditor';

export default function EditarNotaPage() {
  const params = useParams();

  return (
    <RutaPrivada>
      <div className="min-h-screen bg-[#0f0f12] py-10">
        <PanelEditor id={params.id} />
      </div>
    </RutaPrivada>
  );
}