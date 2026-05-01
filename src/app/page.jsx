import VideoHero from '../components/VideoHero';
import FeaturedProperties from '../components/FeaturedProperties';
import CinematicSections from '../components/CinematicSections';
import AnimatedStats from '../components/AnimatedStats';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import DevelopersMarquee from '../components/DevelopersMarquee';

export default function HomePage() {
  return (
    <>
      <VideoHero />
      <FeaturedProperties />
      <CinematicSections />
      <AnimatedStats />
      <Services />
      <DevelopersMarquee />
      <WhyUs />
      <Testimonials />
    </>
  );
}
