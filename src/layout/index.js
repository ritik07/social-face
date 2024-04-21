import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import InfoBar from "../components/InfoBar/InfoBar";
import { PENDING_TXT } from "../constants/Text";
import { message } from "antd";
import { getUserDetails } from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataRedux } from "../redux/actions/userData";
import Spinner from "../components/spinner/Spinner";
import BottomActionBar from "../components/BottomActionBar/BottomActionBar";

const LayoutWrapper = () => {
  let userToken = localStorage.getItem("ss_token");
  const userData = useSelector((state) => state.userData.userData);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const [userData, setUserData] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, []);
  // 8618940315
  let maxTry = 6;
  const verifyUser = async () => {
    try {
      maxTry--;
      if (userToken) {
        let response = await getUserDetails(userToken);
        console.log("first", response.userDetail);
        // setUserData(response.userDetail);
        dispatch(setUserDataRedux(response.userDetail));
        setIsLoading(false);
        navigate("/home");
      } else {
        localStorage.clear();
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error.response.data);
      if (error.response.data.code === 401) {
        localStorage.clear();
        return navigate("/login");
      }
      if (maxTry === 0) {
        setIsLoading(false);
        messageApi.open({
          type: "error",
          content: "Something went wrong!!",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Something went wrong, pelase wait",
        });
        setTimeout(() => {
          verifyUser();
        }, 6000);
      }
      // localStorage.clear();
      // navigate("/login");
    }
  };

  return !isLoading ? (
    <div>
      {contextHolder}
      {userToken && <InfoBar state={userData?.VerificationType?.name} />}
      <Outlet />
      {userToken && <BottomActionBar />}
    </div>
  ) : (
    <Spinner />
  );
};
export default LayoutWrapper;
