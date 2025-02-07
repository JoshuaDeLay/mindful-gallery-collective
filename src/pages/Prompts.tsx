
import { Navigation } from "@/components/Navigation";
import { WeeklyPrompt } from "@/components/WeeklyPrompt";
import { BottomNav } from "@/components/BottomNav";

const Prompts = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Navigation />
      <div className="container mx-auto px-4 pt-32">
        <h1 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Weekly Prompts
        </h1>
        <WeeklyPrompt />
      </div>
      <BottomNav />
    </div>
  );
};

export default Prompts;
