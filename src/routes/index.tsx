import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Specials } from "@/components/Specials";
import { Trending } from "@/components/Trending";
import { Featured } from "@/components/Featured";
import { Reviews } from "@/components/Reviews";
import { Branches } from "@/components/Branches";
import { Deals } from "@/components/Deals";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Story />
      <Specials />
      <Trending />
      <Featured />
      <Deals />
      <Reviews />
      <Branches />
      <Gallery />
      <Footer />
    </div>
  );
}
