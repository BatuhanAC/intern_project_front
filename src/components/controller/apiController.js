import axios from "axios"

const baseUrl = process.env.REACT_APP_URL

export const signProcess = (email, password, setter, reqName, name="", lastName="") => {
  if(reqName === "/login"){
    axios
      .post(`${baseUrl}${reqName}`, {
        email: email,
        password: password
      })
      .then((response) => {
        setter(response.data)
      })
      .catch((err) => {
        setter(err.response.data)
      })
  }
  
  if(reqName === "/register"){
    axios
      .post(`${baseUrl}${reqName}`, {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        setter(response.data)
      })
      .catch((err) => {
        setter(err.response.data)
      })
  }
  
}

export const foodProcess = (token, food, setter, reqName, newFood) => {
  if(reqName === "/getAllFood"){
    axios
   .get(`${baseUrl}${reqName}`, {headers: {"Authorization":`Bearer ${token}`}})
   .then((response) => {
    setter([...food, ...response.data.data])
   })
   .catch((err) => {
    console.log(err.message)
   })
  }
  if(reqName === "/addFood"){
    axios
   .post(`${baseUrl}${reqName}`, {
    name:newFood.name,
    amount:newFood.amount
   }, {headers: {"Authorization":`Bearer ${token}`}})
   .then((response) => {
    setter([...food, response.data.data])
   })
   .catch((err) => {
    console.log(err.message)
   })
  }
  
}

export const progressProcess = (token, setter, reqName, progressData) => {
  if(reqName === "/getAllProgress"){
    axios
      .get(`${baseUrl}${reqName}`, {headers: {"Authorization":`Bearer ${token}`}})
      .then((response) => {
        setter(response.data.data.values)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  if(reqName === "/addProgress"){
    axios
      .post(`${baseUrl}${reqName}`, {
        values: [
          progressData
        ]
      }, {headers: {"Authorization":`Bearer ${token}`}})
      .then((response) => {
        if(response.data.success)
          {
            setter.setResponse(response.data)
            setter.setData(response.data.data.values)
        }
        else
          console.log(response.data.success)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

