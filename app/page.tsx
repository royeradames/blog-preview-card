import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <article className="blog-card" aria-labelledby="article-title">
          <Image className="illustration" src="/images/illustration-article.svg" alt="" width={336} height={200} preload unoptimized />
          <div className="card-copy">
            <p className="category">Learning</p>
            <p className="published">Published <time dateTime="2023-12-21">21 Dec 2023</time></p>
            <h1 id="article-title"><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website" aria-describedby="sample-note">HTML &amp; CSS foundations</a></h1>
            <p className="excerpt">These languages are the backbone of every website, defining structure, content, and presentation.</p>
          </div>
          <p className="author"><Image src="/images/image-avatar.webp" alt="" width={32} height={32} unoptimized /><span>Greg Hooper</span></p>
        </article>
      </main>
      <footer>
        <p id="sample-note">Practice card with a sample author and date. The title opens MDN learning material.</p>
        <p>Challenge by <a href="https://www.frontendmentor.io/">Frontend Mentor</a>. Built by <a href="https://royeradames.com/">Royer Adames</a>.</p>
      </footer>
    </div>
  );
}
