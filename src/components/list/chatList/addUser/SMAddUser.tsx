import "./adduser.css";
import Avatar from "../../../../assets/avatar.png";
export default function SMAddUser() {
  return (
    <>
      <div className="addUser">
        <form>
          <input type="text" placeholder="Username" name="username" />
          <button>Search</button>
        </form>
        <div className="user">
          <div className="detail">
            <img src={Avatar} alt="" />
            <span>Jane Doe</span>
          </div>
          <button>Add User</button>
        </div>
      </div>
    </>
  );
}
