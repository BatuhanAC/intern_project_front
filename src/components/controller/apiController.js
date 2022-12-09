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
        console.log(response.data) 
      })
      .catch((err) => {
        setter(err.response.data)
        console.log(err.response.data)
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
        console.log(response.data) 
      })
      .catch((err) => {
        setter(err.response.data)
        console.log(err.response.data)
      })
  }
  
}

export const foodProcess = (owner, food, setter, reqName, newFood) => {
  if(reqName === "/getAllFood"){
    axios
   .post(`${baseUrl}${reqName}`, {
    owner:owner
   })
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
    owner:owner,
    amount:newFood.amount
   })
   .then((response) => {
    setter([...food, response.data.data])
   })
   .catch((err) => {
    console.log(err.message)
   })
  }
  
}

export const progressProcess = (owner, setter, reqName, progressData) => {
  if(reqName === "/getAllProgress"){
    axios
      .post(`${baseUrl}${reqName}`, {
        owner: owner
      })
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
        owner,
        values: [
          progressData
        ]
      })
      .then((response) => {
        if(response.data.success)
          console.log("Success")
        else
          console.log(response.data.success)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

