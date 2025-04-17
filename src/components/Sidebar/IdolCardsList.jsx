import React, { useContext, useEffect, useState } from "react";
import IdolCard from "./IdolCard";
import { IdolContext } from "../Context/IdolContext";

import StarsIcon from "@mui/icons-material/Stars";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import IdolCardSkeleton from "../Skeleton/IdolCardSkeleton";

function IdolCardsList() {
  const { idolList } = useContext(IdolContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (idolList && idolList.productList?.length > 0) {
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [idolList]);

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-white min-h-screen py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <StarsIcon fontSize="large" className="text-yellow-500" />
          <h2 className="text-3xl font-bold text-sky-700">Our Idols Collection</h2>
          <AutoAwesomeIcon fontSize="large" className="text-sky-500" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, idx) => (
              <IdolCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {idolList.productList?.map((idol) => (
              <IdolCard
                key={idol._id}
                id={idol._id}
                title={idol.title}
                thumbnail={idol.thumbnail?.image_url}
                category={idol.category.name}
                price={idol.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default IdolCardsList;
