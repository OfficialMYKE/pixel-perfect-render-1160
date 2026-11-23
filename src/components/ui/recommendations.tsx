import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { getByCategory, getBySub } from "@/lib/products";
import { getRecLabel, type RecTarget } from "@/lib/catalog";

interface RecommendationsProps {
  targets: RecTarget[];
  title?: string | undefined;
  headingId?: string;
}

export default function Recommendations({ targets, title, headingId }: RecommendationsProps) {
  const { lang } = useLanguage();

  const visible = targets.filter((target) =>
    target.sub
      ? getBySub(target.category, target.sub).length > 0
      : getByCategory(target.category).length > 0,
  );

  if (visible.length === 0) return null;

  const id = headingId ?? "recs-title";

  return (
    <section className="recs" aria-labelledby={id}>
      <h2 id={id} className="recs__title">
        {title ?? (lang === "es" ? "También te puede gustar" : "You may also like")}
      </h2>
      <ul className="recs__list">
        {visible.map((target) => (
          <li key={`${target.category}/${target.sub ?? ""}`}>
            {target.sub ? (
              <Link
                to="/shop/$category/$sub"
                params={{ category: target.category, sub: target.sub }}
                className="chip"
              >
                {getRecLabel(target, lang)}
              </Link>
            ) : (
              <Link to="/shop/$category" params={{ category: target.category }} className="chip">
                {getRecLabel(target, lang)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
