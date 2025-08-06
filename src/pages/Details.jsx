import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetchdetails from "../hooks/usefetchdetails";
import Divider from "../components/Divider";
import moment from "moment";
import useFetch from "../hooks/useFetch";
import HorizontalScollCard from "../components/HorizontalScollCard.jsx";
import Videoplay from "../components/Videoplay.jsx";

const Details = () => {
  const params = useParams();
  const imgUrl = useSelector((state) => state.movieData.imgUrl);
  const { data } = useFetchdetails(`/${params?.explore}/${params?.id}`);
  const { data: picdata } = useFetchdetails(
    `/${params?.explore}/${params?.id}/images`
  );
  console.log("data", picdata?.backdrops[0]?.file_path);
  const { data: castData } = useFetchdetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similardata } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recomendation } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );
  const [playvideo, setplayvideo] = useState(false);
  const [playvideoid, setplayvideoid] = useState("");

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");
  const director = castData?.crew
    ?.filter((el) => el?.job === "Director")
    ?.map((el) => el?.name)
    ?.join(", ");
  const handlePlayVideo = (data) => {
    setplayvideoid(data);
    setplayvideo(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <div>
      <div className="w-full h-[380px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imgUrl + data?.backdrop_path}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imgUrl + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white ">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>

            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Staus : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>

            <Divider />
          </div>

          <div>
            <p>
              <span className="text-white">Director</span> : {director}
            </p>

            <Divider />

            <p>
              <span className="text-white">Writer : {writer}</span>
            </p>
          </div>

          <Divider />
          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,120px)] gap-5 my-4">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starcast, index) => {
                return (
                  <div key={starcast.id}>
                    <div>
                      <img
                        src={imgUrl + starcast?.profile_path}
                        className="w-30 h-30 object-cover rounded-full"
                      />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-400">
                      {starcast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <Divider />
        <h2 className="text-white text-2xl font-bold mb-2 ml-20">
          Screen-Shots :
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-20 mt-13">
          {picdata?.backdrops
            ?.sort(() => 0.5 - Math.random()) // Shuffle array
            ?.slice(0, 6) // Pick first 6 randomly
            ?.map((shot, idx) => (
              <img
                key={idx}
                src={imgUrl + shot.file_path}
                alt={`Screenshot ${idx + 1}`}
                className="w-full h-[180px] object-cover rounded"
              />
            ))}
        </div>

        <HorizontalScollCard
          data={similardata}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScollCard
          data={recomendation}
          heading={"Recommended " + params?.explore}
          media_type={params?.explore}
        />
      </div>
      {playvideo && (
        <Videoplay
          data={playvideoid}
          close={() => setplayvideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default Details;
