import axios from "axios";


export const userService = {
  login
};



async function login(value) {
      console.log(value);
      await axios
      .post("/api/login", value)
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



