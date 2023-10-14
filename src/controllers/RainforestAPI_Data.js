const RainforestAPI_Data = (req, res) => {

  const {input, filter, currentPage} = req.params

  // set up the request parameters
  const params = {
    api_key: "7D4C46625211439F88B3C0C247F23B44",
    type: "search",
    amazon_domain: "amazon.in",
    search_term: input,
    sort_by: filter,
    page: currentPage,
  };

  // make the http GET request to Rainforest API
  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((response) => {
       res.json(response?.data)
    })
    .catch((error) => {
      console.log(error);
      res.json(error)
    });
};

export default RainforestAPI_Data;
