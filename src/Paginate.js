import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function Paginate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

//   calling country api
  const countryApi = async () => {
    setLoading(true);
    try {
      const api = await fetch("https://restcountries.com/v3.1/all");
      const res = await api.json();
      setData(res);
    } catch (error) {
      console.log("Fetching have some error", error);
      alert("Data fetching error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    countryApi();
  }, []);

//   loadedOption fuction for perform  AsyncPaginate
  const loadOptions = async (search, loadedOptions, { page }) => {
    const filteredData = data
      .map((country) => ({
        label: `${country.name.common} - ${
          country.currencies
            ? Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A"
        }`,
        value: country.currencies
          ? Object.keys(country.currencies).join(", ")
          : "N/A",
      }))
      .filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase())
      );

    return {
      options: filteredData,
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  };
  
  return(
     <div>
        {loading?<div>Data is loading.....</div>:
        <AsyncPaginate
        debounceTimeout={300}
        additional={{page:1}}
        loadOptions={loadOptions}
        placeholder="Select Country and Currency"
        />
        }
     </div>
    );
}

export default Paginate;
