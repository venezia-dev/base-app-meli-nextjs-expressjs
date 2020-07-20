import axios from "axios";


export const productService = {
  getById,
  increaseAll,
  increase,
  status
};

async function getById(id) {
  console.log(id);
  return await axios.get(`/api/cars/${id}`, {
    withCredentials: true
  })
}

async function increaseAll(value) {
      console.log(value);
      await axios
      .post("/api/increaseall", value)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          status: false,
          data: err,
        };
      });
}

async function increase(value) {
  console.log(value);
  await axios
  .post("/api/increase", value)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return {
      status: false,
      data: err,
    };
  });
}

async function status(value) {
  console.log(value);
  await axios
  .post("/api/status", value)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return {
      status: false,
      data: err,
    };
  });
}

