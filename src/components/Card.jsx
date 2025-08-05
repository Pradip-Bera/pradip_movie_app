import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router";

const Card = ({ data, trending, index, media_type }) => {
  const imgUrl = useSelector((state) => state.movieData.imgUrl);

  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[235px] max-w-[235px] h-80 overflow-hidden block rounded bg-gray-200 relative hover:scale-105 transition-all no-underline"
    >
      {data?.poster_path ? (
        <img
          className="w-full h-full object-cover"
          src={imgUrl + data?.poster_path}
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-neutral-300">
          No image found
        </div>
      )}

      <div className="absolute top-4">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden text-white text-sm">
            #{index} Trending
          </div>
        )}
      </div>

      {/* Ultra compact bottom section - h-16 */}
      <div className="absolute bottom-0 h-13 backdrop-blur-3xl w-full bg-black/60 px-2 py-0.5 flex flex-col justify-center">
        <h2 className="text-xs font-medium text-white overflow-hidden whitespace-nowrap text-ellipsis leading-none">
          {data?.title || data?.name}
        </h2>
        <div className="flex justify-between items-center text-xs mt-0.5">
          <span className="text-gray-300 truncate flex-1 mr-1">
            {moment(data.release_date).format("MMMM Do YYYY")}
          </span>
          <span className="text-white mr-3">
            ★{Number(data.vote_average).toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
