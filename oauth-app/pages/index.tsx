import React from "react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Layout } from "../components/Layout";

type UserInfo = {
  email: string;
  email_verified: boolean;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
};

const Index = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const bearerCookie = getCookie("BearerToken");

    if (!bearerCookie) {
      return; // user not logged in
    }

    const getUserInfo = async () => {
      const data = await fetch("https://aabedraba.eu.auth0.com/userinfo", {
        headers: {
          Authorization: `Bearer ${bearerCookie}`,
        },
      });
      const json = await data.json();
      setUserInfo(json);
    };

    getUserInfo();
  }, []);

  return (
    <Layout>
      <div>
        {userInfo ? (
          <div className="space-y-5 p-5 bg-green-100">
            <img
              src={userInfo.picture}
            />
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
        ) : (
          <button>Logged in</button>
        )}
      </div>
    </Layout>
  );
};

export default Index;
