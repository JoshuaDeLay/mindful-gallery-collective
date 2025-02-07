
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryHeaderProps {
  galleryName: string;
  setGalleryName: (name: string) => void;
}

export const GalleryHeader = ({ galleryName, setGalleryName }: GalleryHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(galleryName);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in to update gallery settings");
      return;
    }

    const { error } = await supabase
      .from('gallery_settings')
      .update({ gallery_name: editedName })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating gallery name:', error);
      toast.error("Failed to update gallery name");
      return;
    }

    setGalleryName(editedName);
    setIsEditing(false);
    toast.success("Gallery name updated successfully");
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="max-w-xs bg-white/60 border-white/40 text-gallery.accent/90"
          />
          <Button
            onClick={handleSave}
            className="bg-gallery.accent/90 hover:bg-gallery.accent text-white"
          >
            Save
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsEditing(false);
              setEditedName(galleryName);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <h1 className="font-serif text-5xl text-gallery.accent/90 drop-shadow-sm tracking-wider italic">
            {galleryName}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="hover:bg-white/20"
          >
            <Pencil className="h-4 w-4 text-gallery.accent/70" />
          </Button>
        </>
      )}
    </div>
  );
};
