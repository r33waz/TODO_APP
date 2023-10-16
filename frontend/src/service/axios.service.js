import axios from "axios";

const SERVER_URL = process.env.REACT_APP_MAIN_URL;

//*Service method to post data
export const postData = async (url, data) => {
  try {
    const resp = await axios.post(`${SERVER_URL}${url}`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//* Service method to get data 
export const getData = async (url) => {
  try {
    const resp = await axios.get(`${SERVER_URL}${url}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

//* service to delete the todo list
export const deletedata = async (url) => {
  try {
    const resp = await axios.delete(`${SERVER_URL}${url}`);
    return resp.data
  } catch (error) {
    
  }
}

//*Api to updatedata
export const updatedata = async (url,data) => {
  try {
    const resp = await axios.patch(`${SERVER_URL}${url}`, data);
    return resp.data
  } catch (error) {
    
  }
}