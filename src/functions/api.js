import axios from "axios";


// set your url
var rootUrl = "rootUrl";


module.exports = function(method, serverRoute, params, data){
  var url  = `${rootUrl}${serverRoute}`;

  if (method === 'get'){
    return axios({
      method: method,
      url: url,
      params: params
    })
    .then( response => {
      return response.data;
    })
    .catch( error => {
      if (error.response){
        throw error.response;
      }
      if (error.request){
        throw error.request;
      }

    });
  }

  if (method === "post"){
    return axios({
      method: method,
      url: url,
      params: params,
      data: data,
    })
    .then( response => {
      return response.data;
    })
    .catch( error => {
      if (error.response){
        throw error.response;
      }
      if (error.request){
        throw error.request;
      }

    });

  }

  if (method === "put"){
    return axios({
      method: method,
      url: url,
      params: params,
      data: data,
    })
    .then( response => {
      return response.data;
    })
    .catch( error => {
      if (error.response){
        throw error.response;
      }
      if (error.request){
        throw error.request;
      }

    });

  }



};
