
import { Navigation } from "@/components/Navigation";
import { BottomNav } from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { BackgroundUpload } from "@/components/gallery/BackgroundUpload";
import { CountdownTimer } from "@/components/gallery/CountdownTimer";
import { toast } from "sonner";

const Gallery = () => {
  const [galleryName, setGalleryName] = useState("The Grand Gallery");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallerySettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('gallery_settings')
          .select('gallery_name, background_image')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching gallery settings:', error);
          return;
        }

        if (data) {
          setGalleryName(data.gallery_name);
          if (data.background_image) {
            const { data: imageUrl } = supabase.storage
              .from('gallery_images')
              .getPublicUrl(data.background_image);
            setBackgroundImage(imageUrl.publicUrl);
          }
        } else {
          const { error: insertError } = await supabase
            .from('gallery_settings')
            .insert({ user_id: user.id });

          if (insertError) {
            console.error('Error creating gallery settings:', insertError);
            toast.error("Failed to initialize gallery settings");
          }
        }
      }
    };

    fetchGallerySettings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gallery.soft via-murakami.cream to-murakami.teal/20 pb-20 relative overflow-hidden">
      {/* Artistic door background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-full h-full opacity-90 bg-cover bg-center transform transition-transform duration-1000 hover:scale-105"
          style={{ 
            backgroundImage: `url(${backgroundImage || '/lovable-uploads/7efa2f9c-52e4-474d-a4bd-61252fa24863.png'})`,
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: '50% 30%' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-murakami.teal/30 via-transparent to-murakami.pink/30" />
        <div className="absolute w-96 h-96 bg-murakami.cream/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-murakami.teal/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" />
      </div>
      
      <Navigation />
      <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center relative">
        <div className="max-w-4xl w-full text-center space-y-8 backdrop-blur-sm bg-white/20 p-12 rounded-2xl shadow-lg border border-white/30 animate-fade-up">
          <GalleryHeader galleryName={galleryName} setGalleryName={setGalleryName} />
          <BackgroundUpload onBackgroundChange={setBackgroundImage} />
          <p className="font-serif text-gallery.accent/80 text-xl leading-relaxed max-w-xl mx-auto italic">
            Behind these doors lie extraordinary creations waiting to be unveiled.
          </p>
          <CountdownTimer />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Gallery;
