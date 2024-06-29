import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationData() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const pageSize = 5;

  const countryApi = async () => {
    try {
      const api = await fetch("https://restcountries.com/v3.1/all");
      const res = await api.json();
      setAllData(res);
      return res;
    } catch (error) {
      console.log("Fetching has some error", error);
      alert("Data fetching error");
      return [];
    }
  };

  const loadData = (data, page) => {
    const pagination = data.slice((page - 1) * pageSize, page * pageSize);
    setData(pagination);
    setTotalPages(Math.ceil(data.length / pageSize));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await countryApi();
      loadData(data, currentPage);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = allData.filter((item) =>
      item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    loadData(filteredData, currentPage);
  }, [searchTerm, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10 mb-5">
        <input
          type="text"
          className="border border-black w-3/5 h-12 rounded-2xl flex justify-center items-center px-4"
          onChange={handleSearch}
          placeholder="Search your favorite country"
          value={searchTerm}
        />
      </div>
      <div>
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-black m-2 p-2 flex justify-between"
          >
            <h1>{item.name.common}</h1>
            <img src={item.flags.png} alt={item.name.common} width="100" />
          </div>
        ))}
      </div>
      <Stack spacing={2} className="mt-5 flex justify-center items-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </>
  );
}

export default PaginationData;
