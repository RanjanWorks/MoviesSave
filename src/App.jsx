import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sort from "./components/Sort";
import Card from "./components/Card";
import { Outlet, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("top_rated");
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // loading state

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  async function fetchData() {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${type}?api_key=4c1eef5a8d388386187a3426bc2345be`
      );
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  }

  async function fetchDataSearch() {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4c1eef5a8d388386187a3426bc2345be&query=${searchQuery}`
      );
      setMovies(response.data.results || []);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  }

  // Fetch data based on the type
  useEffect(() => {
    fetchData();
  }, [type]);

  // Fetch data based on the search query
  useEffect(() => {
    if (searchQuery) {
      fetchDataSearch();
    } else {
      fetchData(); // If searchQuery is cleared, fetch based on the type
    }
  }, [searchQuery]);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout movies={movies} loading={loading} setType={setType} onSearch={handleSearchQuery} />}
      />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

function MainLayout({ movies, loading, setType, onSearch }) {
  return (
    <>
      <Header sendDataToParent={onSearch} />
      <Sort setType={setType} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 sm:px-8 lg:px-16 w-full mb-10">
        <Card data={movies} loading={loading} />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
