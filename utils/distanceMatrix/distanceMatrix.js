var axios = require("axios");

async function getDistanceMatrix(origin, destination) {
  let key = process.env.GOOGLE_MAPS_API_KEY;
  let url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
    origin +
    "&destinations=" +
    destination +
    "&units=metric&key=" +
    key

  var config = {
    method: "get",
    url: url,
    headers: {},
  };

  let res = await axios(config);
  return res;
}

module.exports = getDistanceMatrix