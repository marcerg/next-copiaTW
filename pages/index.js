import Head from "next/head";
import { useEffect } from "react";
import { colors } from "../style/theme";
import Button from "../components/Button";
import GitHub from "../components/Icons/GitHub";
import Logo from "../components/Icons/Logo";
import useUser, { USER_STATES } from "../hooks/useUser";

import { useRouter } from "next/router";

import { loginWithGitHub } from "../firebase/client";

export default function Home() {
  const user = useUser;
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Logo height="100px" />
        <h1>Devter</h1>
        <h2>
          Talk about development
          <br />
          with developers 👨‍💻👩‍💻
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

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
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom: 16px;
          }

          h2 {
            color: ${colors.secondary};
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
