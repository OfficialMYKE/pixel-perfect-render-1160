import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const FavoritesContext = createContext<{ slugs: string[]; toggle: (slug: string) => void }>({
  slugs: [],
  toggle: () => undefined,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem("avnyc-favorites") ?? "[]");
      if (Array.isArray(saved))
        setSlugs(saved.filter((value): value is string => typeof value === "string"));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("avnyc-favorites", JSON.stringify(slugs));
    } catch {
      /* Keep session favorites usable. */
    }
  }, [slugs, loaded]);
  const toggle = (slug: string) =>
    setSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  return (
    <FavoritesContext.Provider value={{ slugs, toggle }}>{children}</FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
