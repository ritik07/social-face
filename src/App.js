import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import LayoutWrapper from "./layout";
import "./index.css";
import Register from "./pages/register/Register";
import PersonalInfo from "./pages/personal-info/PersonalInfo";
import Profile from "./pages/profile/Profile";
import PersonalInfoReadOnly from "./pages/personal-info/PersonalInfoReadOnly";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00B96B",
          borderRadius: 8,
          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/profile-personal-info"
            element={<PersonalInfoReadOnly />}
          />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
