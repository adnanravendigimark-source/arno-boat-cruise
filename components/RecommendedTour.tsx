import TourPromoCard from "./TourPromoCard";
import { getTours } from "@/lib/data";

export default async function RecommendedTour({ tourId }: { tourId: string }) {
  const tours = await getTours();
  const tour = tours.find((t) => t.id === tourId);
  if (!tour) return null;
  return <TourPromoCard tour={tour} />;
}
