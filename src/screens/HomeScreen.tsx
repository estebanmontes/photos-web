import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { colorFilters, orientationFilters } from "~/assets/filters";
import { Filter, Picture, Search } from "~/components";
import PictureSelectedContext from "~/context/PictureSelectedContext";
import { searchImages } from "~/services/api";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [error, setError] = useState<any>(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedOrientation, setSelectedOrientation] = useState<string>("");
  const [page, setPage] = useState(1);
  const screenRef = useRef(null);
  const router = useRouter();
  const { setImage } = useContext(PictureSelectedContext);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const fetchImages = async () => {
    try {
      setLoading(true);
      const results: any = await searchImages(
        debouncedSearchTerm,
        page,
        selectedColor,
        selectedOrientation
      );
      page === 1
        ? setSearchResults(results.results)
        : setSearchResults((prevImages) => [...prevImages, ...results.results]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleColorFilter = (color: any) => {
    setSelectedColor(color.value);
    setPage(1);
  };
  const handleOrientationFilter = (orientation: any) => {
    setSelectedOrientation(orientation.value);
    setPage(1);
  };
  const onUserScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    fetchImages();
  };
  const handlePressImg = (image: any) => {
    setImage(image);
    router.push("/picture");
  };
  useEffect(() => {
    window.addEventListener("scroll", onUserScroll);
    return () => window.removeEventListener("scroll", onUserScroll);
  }, [loading]);
  useEffect(() => {
    if (debouncedSearchTerm) fetchImages();
    if (!debouncedSearchTerm) {
      setSelectedColor("");
      setSelectedOrientation("");
      setSearchResults([]);
      setPage(1);
    }
  }, [debouncedSearchTerm, selectedColor, selectedOrientation]);

  return (
    <div className="p-2.5">
      <Search handleChange={handleSearch} searchTerm={searchTerm} />
      {searchResults.length >= 1 && (
        <Filter
          data={colorFilters}
          filter={selectedColor}
          handlePress={handleColorFilter}
        />
      )}
      {searchResults.length >= 1 && (
        <Filter
          data={orientationFilters}
          filter={selectedOrientation}
          handlePress={handleOrientationFilter}
        />
      )}
      {error && (
        <div role="alert" className="w-2/4 m-auto">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Oops!
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Something went wrong. Please try again later.</p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-3xl text-center">Loading...</div>
      ) : (
        <div
          ref={screenRef}
          className="grid lg:grid-cols-4 sm:grid-cols-1 sm:justify-center justify-center gap-4"
        >
          {searchResults.map((image: any) => (
            <Picture
              handlePressImg={() => handlePressImg(image)}
              key={image.id}
              url={image.urls.regular}
              title={image.alt_description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
