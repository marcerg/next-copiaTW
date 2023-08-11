import Head from "next/head";
import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { colors } from "../style/theme";
import Button from "../components/Button";
import GitHub from "../components/Icons/GitHub";

import { loginWithGitHub, onAuthStateChanged } from "../firebase/client";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devter-logo.png" alt="Logo" />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 👨‍💻👩‍💻
          </h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>
        {`
          img {
            width: 120px;
          }

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }

          h1 {
            color: ${colors.secondary};
            font-weight: 800;
            margin-bottom: 16px;
          }

          h2 {
            color: ${colors.primary};
            font-size: 17px;
            margin: 0;
          }

          div {
            margin-top: 8px;
          }
        `}
      </style>
    </>
  );
}
