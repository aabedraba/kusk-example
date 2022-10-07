import { useState } from "react";

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      {loggedIn ? <p>You're already logged in</p> : <button>Logged in</button>}
    </div>
  );
};

export default Index;
