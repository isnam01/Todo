import * as React from "react";
import "./home-page.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogout } from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IHomeProps {}

interface userData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilepic: string | null;
}

interface Notes {
  title: string;
  note: string;
  createdBy: any;
  lastModified: Date;
}

export default function HomePage(props: IHomeProps) {
  const [user, setUser] = React.useState<userData>();
  const [selected, setSelected] = React.useState<string>("allnotes");
  const [title, settitle] = React.useState<string>("");
  const [note, setnote] = React.useState<string>("");
  const [send,setsend]=React.useState<number>(0);
  const [notes, setnotes] = React.useState<Array<Notes> | undefined>();
  const history = useHistory();

  React.useEffect(() => {
    fetch("http://localhost:5000/user", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("todoToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.info(data.error);
        } else {
          setUser(data.user);
          console.log(data.user, "userdata");
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/note", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("todoToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.info(data.error);
        } else {
          setnotes([...data.notes]);
          console.log(data.notes, "userdata");
          setSelected("allnotes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  React.useEffect(()=>{
    fetch("http://localhost:5000/note", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("todoToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.info(data.error);
        } else {
          setnotes([...data.notes]);
          console.log(data.notes, "userdata");
          setSelected("allnotes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[send])

  const submitHandler = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:5000/note", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("todoToken"),
      },
      body: JSON.stringify({
        title: title,
        note: note,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.info(data.error);
        } else {
          toast.info(data.message);
          setSelected("allnotes");
          setsend(send+1)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home-page">
      <div className="sidebar">
        <div className="avatar">
          <img
            src={`${
              user?.profilepic
                ? user.profilepic
                : "https://image.shutterstock.com/image-vector/man-avatar-profile-picture-vector-260nw-229692004.jpg"
            }`}
          ></img>
          <p>{user?.firstName}</p>
        </div>
        <div className="options">
          <li onClick={() => setSelected("newnotes")}>
            <i className="fa fa-plus-circle"></i>
            New Note
          </li>
          <li onClick={() => setSelected("allnotes")}>
            <i className="fa fa-sticky-note"></i>All Note
          </li>
          <li onClick={() => setSelected("usersettings")}>
            <i className="fa fa-cog"></i>Settings
          </li>
        </div>
      </div>
      {/* {selected === "allnotes" &&
       } */}
      {selected === "newnotes" && (
        <div className="new-notes">
          <div>
            {user?.firstName}'s Diary
            <form onSubmit={(e) => submitHandler(e)}>
              <input
                placeholder="Enter title"
                onChange={(e) => settitle(e.target.value)}
              ></input>
              <textarea
                placeholder="Start writing here"
                onChange={(e) => setnote(e.target.value)}
              ></textarea>
              <button>Add Note</button>
            </form>
          </div>
        </div>
      )}
      {selected === "usersettings" && <div className="user-settings">user</div>}
    </div>
  );
}
