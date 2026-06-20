// Questo file va messo in: app/+html.tsx
// Forza il tema CHIARO su tutti i browser, anche se l'utente ha il dark mode
// attivo nel sistema o nel browser. Risolve i colori strani e la bandiera che cambia.

import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Forza il tema chiaro: niente inversione colori in dark mode */}
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#8B1A1A" />

        <ScrollViewStyleReset />

        {/* CSS che blocca il dark mode automatico */}
        <style dangerouslySetInnerHTML={{ __html: forcedLightStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const forcedLightStyle = `
:root {
  color-scheme: light only;
}
html, body {
  background-color: #FBF6EC;
}
/* Impedisce al browser di reinterpretare i colori in dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: light only;
  }
  html, body {
    background-color: #FBF6EC !important;
  }
}
`;
