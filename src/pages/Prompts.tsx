
import { Navigation } from "@/components/Navigation";
import { WeeklyPrompt } from "@/components/WeeklyPrompt";
import { BottomNav } from "@/components/BottomNav";

const Prompts = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Navigation />
      <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl text-center mb-12 animate-fade-up">
            This Week's Inspiration
          </h1>
          <WeeklyPrompt />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Prompts;
