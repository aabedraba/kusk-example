import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

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
    <div>
      {userInfo ? (
        <pre className="flex">{JSON.stringify(userInfo, null, 2)}</pre>
      ) : (
        <button>Logged in</button>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      userLoggedIn: false,
    },
  };
};

export default Index;
