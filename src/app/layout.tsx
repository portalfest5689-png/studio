
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Imóveis - imobTrack CRM',
  description: 'Sistema de Gestão Imobiliária Profissional',
  icons: {
    icon: 'https://iili.io/CoixRJ1.md.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="custom-scroll">
      <head>
        <link rel="icon" href="https://iili.io/CoixRJ1.md.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#F4F6F8]">{children}</body>
    </html>
  );
}
