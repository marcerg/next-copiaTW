import Avatar from "components/Avatar";
import useTimeAgo from "../../hooks/useTimeAgo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Devit({
  avatar,
  userName,
  content,
  createdAt,
  id,
  img,
}) {
  const timeago = useTimeAgo(createdAt);
  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };
  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>·</span>
            <Link href={`status/${id}`} style={{ textDecoration: "none" }}>
              <time>{timeago}</time>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        span {
          margin: 0 5px;
        }

        time {
          color: #555;
          font-size: 14px;
        }
        time:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
