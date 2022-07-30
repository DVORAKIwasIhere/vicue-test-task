import axios from "axios";
import { Link } from "react-router-dom";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchBar } from "../../components/SearchBar";
import { IBrew } from "../../interfaces/Interfaces";

export const Home = () => {
  const [brew, setBrew] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [counterPage, setCounterPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [searchField, setSearchField] = useState("");

  const [searchValue] = useDebounce(searchField, 500);

  useLayoutEffect(() => {
    const findEndPage = async (page: number) => {
      setLoading(true);

      if (!searchField) {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
        );
        if (res.data.length !== 0) {
          await findEndPage(page + 1);
          return;
        }
        setCounterPage(page - 1);
        setLoading(false);
      } else {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&page=${page}&per_page=${perPage}`
        );
        if (res.data.length !== 0) {
          await findEndPage(page + 1);
          return;
        }
        setCounterPage(page - 1);
        setLoading(false);
      }
    };
    findEndPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, perPage]);

  useLayoutEffect(() => {
    const fetchBrew = async () => {
      setLoading(true);

      if (!searchField) {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
        );
        setBrew(res.data);
        setLoading(false);
      } else {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&page=${page}&per_page=${perPage}`
        );
        setBrew(res.data);
        setLoading(false);
      }
    };

    fetchBrew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchValue, perPage]);

  if (loading && brew.length === 0) {
    return <h2>Loading</h2>;
  }

  const currentBrew: IBrew[] = brew.slice();

  const handlePage = (page: number) => {
    setPage(page);
    console.log(page);
  };



  const handleChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setPerPage(35)}>35</button>
      <SearchBar value={searchField} onChange={handleChangeSearchBar} />
      {[...Array(counterPage)].map((_, index) => (
        <button onClick={() => handlePage(index + 1)} key={index}>
          {index + 1}
        </button>
      ))}
      {currentBrew.map((row) => (
        
        <div key={row.id}>
            <Link to={`/brew/${row.id}`} className="link">
          <span>{row.id}</span>
          
          <span>{row.description.substring(0, 140)+"..."}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};
