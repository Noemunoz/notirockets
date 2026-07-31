"use client";

import React from 'react';
import RutaPrivada from '../../components/RutaPrivada';
import ListaNotas from '../../components/ListaNotas';

export default function AdminPage() {
  return (
    <RutaPrivada>
      <div className="min-h-screen">
        <ListaNotas />
      </div>
    </RutaPrivada>
  );
}