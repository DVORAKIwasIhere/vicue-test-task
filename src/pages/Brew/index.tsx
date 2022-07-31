import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { ISingleBeer } from "../../interfaces/Interfaces";

export const Brew = () => {
  const [singleBeer, setSingleBeer] = useState<ISingleBeer[]>();
  const params = useParams();
  useEffect(() => {
    const fetchSingleBrew = async () => {
      const res = await axios.get(
        `https://api.punkapi.com/v2/beers/${params.brewId}`
      );
      setSingleBeer(res.data);
    };
    fetchSingleBrew();
  }, []);

  return (
    <>
      <Header>
        <Link to={`/`} className="link">
          {"< Back to home"}
        </Link>
      </Header>
      <div className="container">
        {singleBeer &&
          singleBeer.map((beer) => {
            console.log(beer);
            return (
              <div key={beer.id}>
                <img src={beer.image_url} className="beer-img-wrapper" alt="" />
                <div className="beer-collection">
                  <h1 className="beer-title">{beer.name}</h1>
                  <h3 className="beer-title">{beer.tagline}</h3>
                  <div>{beer.description}</div>
                  <div>{"Alcohol by volume: " + beer.abv + " %"}</div>
                  <div>{"Better serve with: " + beer.food_pairing}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
