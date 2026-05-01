import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Citiway Real Estate | Premium Property in Dubai, UAE',
  description: 'Citiway Real Estate — Dubai\'s premier partner for buying, selling, renting, and managing luxury properties. Expert consultation, bespoke management, and curated investment opportunities.',
  keywords: 'Dubai real estate, luxury property Dubai, off-plan Dubai, property management, investment advisory UAE',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
