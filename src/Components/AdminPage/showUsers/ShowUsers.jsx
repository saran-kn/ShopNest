import { useNavigate } from "react-router-dom";
import Button from "../../ReusbleComponents/Button";
import "./showUsers.css";

const ShowUsers = () => {
  const storedData = localStorage.getItem("registeredUsers");
  const users = storedData ? JSON.parse(storedData) : [];
  const userCount = users.length;
  const navigate = useNavigate();

  return (
    <div className="showuser-main-container">
      <div className="showuser-count">
        <div className="showuser-head">
          <box-icon type="solid" name="user" color="#27548A" />
          <span>User Count</span>
        </div>
        <span>{userCount}</span>
      </div>

     
      <table className="showuser-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.userName}</td>
              <td>{user.userMail}</td>
              <td>{user.userMobile}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="user-back-button">
        <Button
          buttonName="Go back"
          className="go-back"
          handleClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default ShowUsers;
