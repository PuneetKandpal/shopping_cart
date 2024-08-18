import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { cn } from "../utils";

function _roundToNearestHalf(number: number) {
  return Math.round(number * 2) / 2;
}

function _getRatingIntegerAndDecimal(rating: number | null) {
  if (!rating) return [0, 0];

  const roundedOffRatingToNearestHalf = _roundToNearestHalf(rating);
  const ratingInteger = Math.trunc(roundedOffRatingToNearestHalf);
  const ratingDecimal = rating - ratingInteger;
  return [ratingInteger, ratingDecimal];
}

export function ProductRatings({
  rating,
  classForStars,
  classForRating,
}: {
  rating: number | null;
  classForStars?: string;
  classForRating?: string;
}) {
  if (!rating)
    return <span className="text-gray-600">No ratings available</span>;
  const TotalRatings = 5;
  const [ratingInteger, ratingDecimal] = _getRatingIntegerAndDecimal(rating);
  const emptyStars = Math.floor(TotalRatings - (ratingInteger + ratingDecimal));

  return (
    <div className="flex items-center">
      {new Array(ratingInteger).fill(0).map((_, index) => {
        return (
          <FaStar
            className={cn(
              "h-5 w-5 text-yellow-400 border-yellow-500",
              classForStars
            )}
            key={index}
          />
        );
      })}
      {ratingDecimal > 0 ? (
        <FaRegStarHalfStroke
          className={cn(
            "h-5 w-5 text-yellow-400 border-yellow-500",
            classForStars
          )}
        />
      ) : null}

      {emptyStars > 0
        ? new Array(emptyStars).fill(0).map((_, index) => {
            return (
              <FaRegStar
                className={cn(
                  "h-5 w-5 text-yellow-400 border-yellow-500",
                  classForStars
                )}
                key={index}
              />
            );
          })
        : null}
      <span
        className={cn(
          "py-1 text-center mr-2 ml-3 rounded bg-yellow-200  w-10  text-xs font-semibold",
          classForRating
        )}
      >
        {rating}
      </span>
    </div>
  );
}
