import "./App.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

function App() {
  const [postsData, setpostsData] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [order, setorder] = useState("ASC");

  //states for filter
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [nameComments, setnameComments] = useState("");
  const [bodyComments, setbodyComments] = useState("");

  const PostsPerPage = 5;

  //track the number of pages visited by the user
  //we need to extract the correct records from the Posts. By using numberOfRecordsVisited, we can find out which 5 records are required.
  const NumberOfPostsVistited = pageNumber * PostsPerPage;

  //this function will decide what happens when the user navigates from one page to another.
  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  //sorting
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...postsData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setpostsData(sorted);
      setorder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...postsData].sort((a, b) => {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      setpostsData(sorted);
      setorder("ASC");
    }
  };

  //filter
  const dataToShow = postsData.filter((data) => {
    if (
      title === "" &&
      body === "" &&
      nameComments === "" &&
      bodyComments === ""
    )
      return data;
    else if (
      title !== "" &&
      data.title.toLowerCase().includes(title.toLowerCase())
    )
      return data;
    else if (
      body !== "" &&
      data.body.toLowerCase().includes(body.toLowerCase())
    )
      return data;
    else if (nameComments !== "") {
      //get comments data
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`)
        .then((res) =>
          res.data.map((comm) => {
            if (comm.name.toLowerCase().includes(nameComments.toLowerCase()))
              return data;
          })
        );
    } else if (bodyComments !== "") {
      //get comments data
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`)
        .then((res) =>
          res.data.map((comm) => {
            if (comm.body.toLowerCase().includes(bodyComments.toLowerCase()))
              return data;
          })
        );
    }
  });

  //teba3 bare pagination
  const totalPages = Math.ceil(dataToShow.length / PostsPerPage);

  const ShowPosts = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => sorting("title")}>
              Title
            </th>
            <th scope="col" onClick={() => sorting("body")}>
              Body
            </th>
          </tr>
        </thead>
        <tbody>
          {dataToShow
            .slice(NumberOfPostsVistited, NumberOfPostsVistited + PostsPerPage)
            .map((data, idx) => {
              return (
                <tr key={idx}>
                  <td>{data.title}</td>
                  <td>{data.body}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      setpostsData(await res.clone().json());
    };

    fetchPosts();
  }, []);

  return (
    <div className="container my-5 text-center">
      <div className="row">
        <div className="col col-md-3">
          <div className="row">
            <p className="fw-bold display-6">Filter</p>
          </div>
          <div className="row my-3">
            <input
              type="text"
              placeholder="Title ..."
              className="form-control"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            ></input>
          </div>
          <div className="row my-3">
            <input
              type="text"
              placeholder="body ..."
              className="form-control"
              onChange={(e) => {
                setbody(e.target.value);
              }}
            ></input>
          </div>
          <div className="row my-3">
            <p className="fw-bold my-3">Filter by comments:</p>
            <input
              type="text"
              placeholder="name ..."
              className="form-control my-3"
              onChange={(e) => {
                setnameComments(e.target.value);
              }}
            ></input>

            <input
              type="text"
              placeholder="body ..."
              className="form-control"
              onChange={(e) => {
                setbodyComments(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="col col-md-9">
          <ShowPosts />
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName={"navigationButtons"}
            previousLinkClassName={"previousButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"navigationDisabled"}
            activeClassName={"navigationActive"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
