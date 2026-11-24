import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { useLanguage } from "@/lib/i18n";

export default function FavoriteButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { slugs, toggle } = useFavorites();
  const { lang } = useLanguage();
  const saved = slugs.includes(slug);
  const label = saved
    ? lang === "es" ? `Quitar ${name} de favoritos` : `Remove ${name} from favorites`
    : lang === "es" ? `Guardar ${name} en favoritos` : `Save ${name} to favorites`;
  return (
    <button type="button" className={`fav-btn ${saved ? "is-saved" : ""} ${className}`} aria-label={label} title={label} aria-pressed={saved}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug); }}>
      <Heart size={18} strokeWidth={1.7} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
    </button>
  );
}
