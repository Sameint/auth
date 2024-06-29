import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
function InfiniteScrol() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const countryApi = async (pages) => {
    try {
      const api = await fetch("https://restcountries.com/v3.1/all");
      const res = await api.json();
      const pageSize = 20;
      const paginateData = res.slice(pages * pageSize, (pages + 1) * pageSize);
      return paginateData;
    } catch (error) {
      console.log("Fetching have some error", error);
      alert("Data fetching error");
      return [];
    }
  };

  const lodedData = async () => {
    const newData = await countryApi(page);
    setData([...data, ...newData]);
    setPage(page + 1);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    lodedData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilterData(filtered);
  }, [search, data]);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearch(text);
  };
  return (
    <>
      <div className="flex justify-center items-center mt-10 mb-5">
        <input
          type="text"
          className="border border-black w-3/5 h-12 rounded-2xl flex justify-center items-center px-4"
          onChange={handleSearch}
          placeholder="Search your favorite country"
          value={search}
        />
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={lodedData}
        hasMore={hasMore}
        loader={<h4>loading....</h4>}
        endMessage={<p>End of the list</p>}
      >
        {filterData.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>{item.name.common}</h1>
            <img src={item.flags.png} alt={item.name.common} width="100" />
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default InfiniteScrol;
