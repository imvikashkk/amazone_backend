import axios  from "axios";

const RainforestAPI_Data = (req, res) => {

  const {input, filter, currentPage} = req.query


  if(!input || !currentPage){
   return res.json({
        sucess:false,
        message:"required parameter not found !"
    })
  }

  // set up the request parameters
  const params = {
    api_key: "1D01319C579941AD9C2AE61C584F2D89",
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
