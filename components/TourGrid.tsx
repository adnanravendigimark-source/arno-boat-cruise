import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import TourCard from "./TourCard";

export default async function TourGrid() {
  const content = await getHomepageContent();
  const tours = await getTours();

  const orderedTours = content.showFeaturedTour
    ? [...tours].sort((a, b) => {
        if (a.id === content.featuredTourId) return -1;
        if (b.id === content.featuredTourId) return 1;
        return 0;
      })
    : tours;

  return (
    <section id="tours" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600">
          {content.sections.tours.eyebrow}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          {content.sections.tours.heading}
        </h2>
        <p className="mt-3 text-base text-slate-600">{content.sections.tours.subheading}</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orderedTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            bookNowText={content.header.bookNowText}
            recommended={
              content.showFeaturedTour && tour.id === content.featuredTourId
                ? {
                    badgeLabel: content.featuredBadgeLabel,
                    reasons: content.featuredReasons,
                    urgencyText: content.featuredUrgencyText,
                  }
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
