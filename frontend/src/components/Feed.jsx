import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const [pins, setPins] = useState();

  useEffect(() => {
    if (category) {
      setLoading(true);
      const query = searchQuery(category);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [category]);
  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
