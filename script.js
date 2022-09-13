let users = [
  {
    id: 1,
    name: "Vusal",
    username: "vusal",
    password: "111",
    isUser: true,
  },
  {
    id: 2,
    name: "Rafiq",
    username: "rafiq",
    password: "111",
    isUser: true,
  },
  {
    id: 3,
    name: "Emin",
    username: "emin",
    password: "111",
    isUser: true,
  },
  {
    id: 4,
    name: "Arif",
    username: "arif",
    password: "111",
    isUser: true,
  },
  {
    id: 5,
    name: "Ruslan",
    username: "ruslan",
    password: "111",
    isUser: true,
  },
  {
    id: 6,
    name: "Fariz",
    username: "fariz",
    password: "111",
    isUser: true,
  },
];

let posts = [];


let sign = document.getElementById("signin");
let logout = document.getElementById("logout");

let post = document.getElementById("post");

let idf = 0;
sign.addEventListener("click", () => {
  if (localStorage.getItem("posts")===null) {
    localStorage.setItem("posts",JSON.stringify(posts))
  }
  let signname = document.getElementById("signname").value;
  let signpassword = document.getElementById("signpassword").value;

  let user = users.find(
    (x) => x.username === signname && x.password === signpassword
  );
  if (user.isUser === true) {
    document.querySelector(".users").classList.remove("d-none");
  }
});

posted();

let idr=0;
function posted() {
  post.addEventListener("click", () => {
    let dbpost=JSON.parse(localStorage.getItem("posts"))
    let signname = document.getElementById("signname").value;
    let signpassword = document.getElementById("signpassword").value;

    let user = users.find(
      (x) => x.username === signname && x.password === signpassword
    );
    let text = document.getElementById("textvalue").value;
    let time = new Date(document.getElementById("timevalue").value).getTime();
    let current = new Date().getTime();
    idr++;
    let obj = {
      id: idr,
      username: user.username,
      text: text,
      futureDate: time,
      currentDate: current,
    };

    dbpost.push(obj);
    localStorage.setItem("posts",JSON.stringify(dbpost))
    
    getposts();
  });
}

logout.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".users").classList.add("d-none");
});


let table = document.getElementById("tabel");
let oldtable = document.getElementById("oldtabel");
let mytable = document.getElementById("mytabel");
setInterval(getposts, 1000);
function getposts() {
  let getpost=JSON.parse(localStorage.getItem("posts"));
  console.log(getpost);
  let signname = document.getElementById("signname").value;
  let signpassword = document.getElementById("signpassword").value;

  let user = users.find(
    (x) => x.username === signname && x.password === signpassword
  );
  let indikitime = new Date().getTime();
  // console.log(new Date(indikitime).toDateString());
  table.innerHTML = ``;
  oldtable.innerHTML = ``;
  mytable.innerHTML = ``;
  getpost=getpost?.sort((a, b) => {
    return b.currentDate - a.currentDate;
  });
  getpost?.map((p) => {
    if (p?.username === user?.username) {
      if (indikitime <= p?.futureDate) {
        mytable.innerHTML += ` <tr>
        <th scope="row">${p?.id}</th>
        <td>${p?.username}</td>
        <td>${p?.text}</td>
        <td>${
          new Date(p?.currentDate).toLocaleDateString() +
          " " +
          new Date(p?.currentDate).toLocaleTimeString()
        }</td>
        <td>${
          new Date(p?.futureDate).toLocaleDateString() +
          " " +
          new Date(p?.futureDate).toLocaleTimeString()
        }</td>
      </tr>`;
      } else {
        oldtable.innerHTML += `
      <tr>
                  <th scope="row">${p?.id}</th>
                  <td>${p?.username}</td>
                  <td>${p?.text}</td>
                  <td>${
                    new Date(p?.currentDate).toLocaleDateString() +
                    " " +
                    new Date(p?.currentDate).toLocaleTimeString()
                  }</td>
                  <td>${
                    new Date(p?.futureDate).toLocaleDateString() +
                    " " +
                    new Date(p?.futureDate).toLocaleTimeString()
                  }</td>
                </tr> 
      `;
      }
    } else {
      if (indikitime <= p?.futureDate) {
        table.innerHTML += `
        <tr>
                    <th scope="row">${p.id}</th>
                    <td>${p?.username}</td>
                    <td>${p?.text}</td>
                    <td>${
                      new Date(p?.currentDate).toLocaleDateString() +
                      " " +
                      new Date(p?.currentDate).toLocaleTimeString()
                    }</td>
                    <td>${
                      new Date(p?.futureDate).toLocaleDateString() +
                      " " +
                      new Date(p?.futureDate).toLocaleTimeString()
                    }</td>
                  </tr>
        `;
      }
    }
  });
}
