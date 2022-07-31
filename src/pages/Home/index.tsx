import axios from "axios";
import { Link } from "react-router-dom";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchBar } from "../../components/SearchBar";
import { IBrew } from "../../interfaces/Interfaces";

import "./styles.scss";
import { Header } from "../../components/Header";

export const Home = () => {
  const [brew, setBrew] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [counterPage, setCounterPage] = useState(1);
  const [perPage] = useState(25);
  const [searchField, setSearchField] = useState("");

  const [searchValue] = useDebounce(searchField, 500);

  useLayoutEffect(() => {
    const findEndPage = async (page: number) => {
      if (!searchField) {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
        );
        if (res.data.length !== 0) {
          await findEndPage(page + 1);
          return;
        }
        setCounterPage(page - 1);
      } else {
        const res = await axios.get(
          `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&page=${page}&per_page=${perPage}`
        );
        if (res.data.length !== 0) {
          await findEndPage(page + 1);
          return;
        }
        setCounterPage(page - 1);
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
  };

  const handleChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      <Header>
        <SearchBar value={searchField} onChange={handleChangeSearchBar} />
      </Header>
      <div className="container">
        {!!brew.length && (
          <div className="page-selector-wrapper">
            <button
              className="page-selector"
              onClick={() => handlePage(1)}
              disabled={page === 1}
            >
              {"<<"}
            </button>
            <button
              className="page-selector"
              onClick={() => handlePage(page - 1)}
              disabled={page - 1 < 1}
            >
              {"<"}
            </button>
            {page > 1 && (
              <button
                className="page-selector"
                onClick={() => handlePage(page - 1)}
              >
                {page - 1}
              </button>
            )}
            <button className="page-selector" disabled>
              {page}
            </button>
            {page < counterPage && (
              <button
                className="page-selector"
                onClick={() => handlePage(page + 1)}
              >
                {page + 1}
              </button>
            )}
            <button
              className="page-selector"
              onClick={() => handlePage(page + 1)}
              disabled={page + 1 > counterPage}
            >
              {">"}
            </button>
            <button
              className="page-selector"
              onClick={() => handlePage(counterPage)}
              disabled={page === counterPage}
            >
              {">>"}
            </button>
          </div>
        )}
        <div className="cards-collection">
          {currentBrew.map((row) => (
            <div key={row.id} className="card">
              <Link to={`/brew/${row.id}`} className="link">
                <div className="card-img-wrapper">
                  <img src={row.image_url} alt=""/>
                </div>
                <h2 className="card-title">{row.name}</h2>
                <p className="card-description">
                  {row.description.substring(0, 140) + "..."}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
