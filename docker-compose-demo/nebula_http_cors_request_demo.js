const ServerAddr = "https://localhost:9443";
// You should add {credentials: "include"} to fetch option for share the cookie issue.
function login(
  options = {
    username: "root",
    password: "password",
    address: "graphd",
    port: 9669,
  }
) {
  return fetch(`${ServerAddr}/api/db/connect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(options),
  }).then((response) => response.json());
}

function logout() {
  return fetch(`${ServerAddr}/api/db/disconnect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json());
}

let G_nsid = null;
function exec(
  queryData = {
    gql: "show spaces;",
  }, 
  nsid = null
) {
  G_nsid = nsid || G_nsid || null;
  return fetch(`${ServerAddr}/api/db/exec`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "nsid":`${G_nsid}`,
    },
    credentials: "include",
    body: JSON.stringify(queryData),
  }).then((response) => response.json());
}

//0. Login at first
login()
  .then((loginRes) => {
    console.log("login :", loginRes);
    let nsid = loginRes.data;
    G_nsid = nsid;
    //1. create the data
    return exec({ gql: "CREATE SPACE demo (vid_type = INT64)" }, nsid);
  })
  .then((createRes) => {
    console.log("create :", createRes);
    //2. query the tabel, we can run more querys here.
    return exec({ gql: "show spaces" });
  })
  .then((queryRes) => {
    console.log("Query res: ", queryRes);
    //3. Suggest logout when finished the queries
    return logout();
  })
  .then((logoutRes) => {
    console.log("logout res: ", logoutRes);
  })
  .catch((e) => {
    console.log("err:", e);
  });
