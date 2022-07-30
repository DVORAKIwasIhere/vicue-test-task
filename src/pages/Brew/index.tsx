import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  <div>
    {singleBeer && singleBeer.map((beer, index)=>{
        console.log(beer);
        return (
            <div key={index}>
                <div>{beer.id}</div> 
                <div>{beer.description}</div>
                <div>{beer.name}</div>
            </div>
        )
    })}
  </div>)
};
