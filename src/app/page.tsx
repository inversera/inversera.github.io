import Challenges from "@/components/home/challenges";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Industries from "@/components/home/industries";
import OurApproach from "@/components/home/our-approach";
import OurStory from "@/components/home/our-story";
import ProactiveIT from "@/components/home/proactive-it";
import Services from "@/components/home/services";
import WhyInversEra from "@/components/home/why-inversera";

export default function Home() {
  return (
    <main className="w-full min-w-0">
      <Hero />
      <ProactiveIT />
      <Challenges />
      <Services />
      <OurApproach />
      <WhyInversEra />
      <Industries />
      <OurStory />
      <Contact />
    </main>
  );
}
