import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const suffix = "site:filmyzilla.com.by"; // Define your prefix here

  
  const handleSearch = () => {
    if (searchQuery) {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' ' + suffix)}`;
      window.open(googleSearchUrl, '_blank'); // Open in a new tab
    }
  };


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4c1eef5a8d388386187a3426bc2345be`
        );
        setMovie(response.data);
        setSearchQuery(response.data.title)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="p-5">
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Skeleton
          variant="text"
          width="60%"
          height={30}
          style={{ marginTop: 10 }}
        />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
      </div>
    );
  }

  if (!movie) return <p>Movie not found</p>;
  return (
    <>
      <button
        onClick={() => navigate(-1)} // Navigate back on click
        className="ml-8 lg:ml-20 my-5 bg-zinc-900 w-40 text-zinc-50 py-3"
      >
        Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 lg:p-10">
        {/* Image Container */}
        <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
          <img
            className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {movie.title}
          </h1>
          <p className="text-sm lg:text-base text-zinc-600">{movie.tagline}</p>
          <p className="text-sm lg:text-base text-zinc-600">
            {movie.release_date}
          </p>
          <p className="text-base lg:text-lg text-zinc-700 leading-relaxed">
            {movie.overview}
          </p>
          <p className="text-sm lg:text-base text-zinc-600">
            <strong>Budget:</strong> ${movie.budget.toLocaleString()}
          </p>
          <p className="text-sm lg:text-base text-zinc-600">
            <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
          </p>
          <p className="text-sm lg:text-base text-zinc-600">
            <strong>Runtime:</strong> {movie.runtime} mins
          </p>
     <button onClick={handleSearch} className=" rounded-md bg-zinc-950 text-zinc-50 p-3 text-sm sm:text-base">Download</button>
        </div>
      </div>
      <Footer />

    </>
  );
}
