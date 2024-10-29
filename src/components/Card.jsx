import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export default function Card({ data, loading }) {
  return (
    <>
      {loading ? (
        // Show skeletons while loading
        Array.from(new Array(8)).map((_, index) => (
          <div key={index} style={{ margin: "10px", width: 200 }}>
            <Skeleton variant="rectangular" width={200} height={300} />
            <Skeleton variant="text" width="60%" height={30} style={{ marginTop: 10 }} />
            <Skeleton variant="text" width="40%" height={20} />
          </div>
        ))
      ) : data.length === 0 ? (
        // Display a message if no data is available after loading
        <Typography variant="h6" style={{ textAlign: "center", marginTop: 20 }}>
          No movies found.
        </Typography>
      ) : (
        // Display movie cards if data is available
        data.map((movie, i) => (
          movie.poster_path ? ( // Check if poster_path exists
            <NavLink to={`/movie/${movie.id}`} key={i} style={{ textDecoration: "none" }}>
              <ImageListItem>
                <img
                  srcSet={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={movie.title}
                  subtitle={movie.release_date}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${movie.title}`}
                    />
                  }
                />
              </ImageListItem>
            </NavLink>
          ) : null // Do not render anything if poster_path is null
        ))
      )}
    </>
  );
}