import { GetServerSideProps } from "next";
import { useState } from "react";

type IndexPageProps = {
  userLoggedIn: boolean;
};

const Index = ({ userLoggedIn }: IndexPageProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(userLoggedIn);

  return (
    <div>
      {loggedIn ? <p>You're already logged in</p> : <button>Logged in</button>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  context
) => {
  return {
    props: {
      userLoggedIn: false,
    },
  };
};

export default Index;
