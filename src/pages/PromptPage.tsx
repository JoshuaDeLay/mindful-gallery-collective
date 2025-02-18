
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Layout, 
  Brain, 
  PenTool, 
  ScrollText, 
  Globe,
  Heart 
} from 'lucide-react';

export const PromptPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Define roles with their icons and descriptions
  const roles = [
    {
      title: "Painter",
      icon: Palette,
      description: "Captures the mood through color, form, and texture",
      gradient: "from-[#fec6a1] to-[#fee2d4]"
    },
    {
      title: "Designer",
      icon: Layout,
      description: "Shapes the experience, structuring space and composition",
      gradient: "from-[#98d8d8] to-[#c1e8e8]"
    },
    {
      title: "Philosopher",
      icon: Brain,
      description: "Asks questions, explores the meaning behind the moment",
      gradient: "from-[#9b87f5] to-[#b8a9f7]"
    },
    {
      title: "Writer",
      icon: PenTool,
      description: "Translates emotions into narrative and text",
      gradient: "from-[#f1f1f1] to-[#ffffff]"
    },
    {
      title: "Poet",
      icon: ScrollText,
      description: "Distills the essence of an idea into rhythmic expression",
      gradient: "from-[#fde1d3] to-[#fef0e8]"
    },
    {
      title: "All Roles",
      icon: Globe,
      description: "Blends multiple forms of expression into one voice",
      gradient: "from-[#1eaedb] to-[#45bde3]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f1f1f1] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Roles Grid - Now at the top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                className={`
                  p-6 rounded-xl backdrop-blur-sm
                  bg-gradient-to-br ${role.gradient}
                  ${role.title === 'All Roles' ? 'md:col-span-2 lg:col-span-3' : ''}
                  hover:shadow-lg transition-shadow duration-300
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <role.icon className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-semibold">{role.title}</h3>
                    <p className="text-sm mt-1 opacity-80">{role.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Header and Image */}
          <div className="relative mt-8">
            <img 
              src="/starry-night.jpg" 
              className="w-full h-64 object-cover rounded-xl shadow-xl"
              alt="Night into Day"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="absolute bottom-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-lg"
            >
              <Heart 
                className={`w-6 h-6 ${isLiked ? 'text-pink-500 fill-pink-500' : 'text-white'}`}
              />
            </motion.button>
          </div>

          {/* Title and Prompt */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold">
              T.S. Eliot's Prelude No. 1 - The Infinite Gentle Suffering of Night into Day
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                T.S. Eliot's Prelude No. 1 illustrates the infinite gentle suffering of the night into day. 
                Describing a scene of a man in the middle of the night, restless as his mind flickers his soul onto the ceiling. 
                Before he knows it, the morning calls his name, he hears the sparrows in the gutters, and the light creeps toward the shutters. 
                He has a vision of the street, as the street hardly understands. 
                It feels like every day we experience this monumental moment of tucking back our dreams and bracing the cold sweat of a new day.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Take the week to reflect on this simultaneous fortitude and fragility, and how your story unfolds through these moments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
