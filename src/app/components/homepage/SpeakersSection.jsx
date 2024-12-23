import Image from "next/image";
import Link from "next/link";

// @tokhy -> don't forget to replace all `a` tags with Link component.

const SpeakersSection = () => {
  return (
    <div className="margintop events-container">
      <div className="">
        <div className="content arabic-content">
          <span>نرحل ويبقى الأثر</span>
          <div className="EventsHeader">
            <h2>شخصيات هامة</h2>
            <Link href="/more-speakers">
              <button className="btn">عرض المزيد</button>
            </Link>
          </div>
        </div>
        {/* 
          <div className="content arabic-content">
            <span>We leave, yet the impact remains</span>
            <div className="EventsHeader">
              <h2>Important People</h2>
              <Link href="/more-speakers">
                <button className="btn">View All</button>
              </Link>
            </div>
          </div> */}
      </div>

      <div className="events-cards">
        {/* Speaker Ahmed */}
        <div className="  card1">
          <Link href="#">
            <Image
              className="thumb"
              src="/images/ahmed.jpg"
              alt="Ahmed Mostafa"
              width={500}
              height={500}
              loading="lazy"
            />
            <div className="card-info">
              <p>
                <span className="highlight">TEDx</span>
              </p>
              <div className="card-name">
                <h3>Ahmed Mostafa</h3>
                <h4>Founder & President</h4>
              </div>
            </div>
          </Link>
        </div>

        {/* Speaker Osama Elzero */}
        <div className="card1">
          <Link href="#">
            <div>
              <Image
                className="thumb"
                src="/images/elzero.jpg"
                alt="Osama Elzero"
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="card-info">
                <p>
                  <span className="highlight">Season 1</span>
                </p>
                <h3>Osama Elzero</h3>
                <h4>Programmer</h4>
              </div>
            </div>
          </Link>

        </div>

        {/* Speaker Nadeem Barakat */}
        <div className="card1">
          <Link href="#">
            <div>
              <Image
                className="thumb"
                src="/images/nadeem.jpg"
                alt="Nadeem Barakat"
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="card-info">
                <p>
                  <span className="highlight">Season 1</span>
                </p>
                <h3>Nadeem Barakat</h3>
                <h4>Business</h4>
              </div>
            </div>
          </Link>
        </div>

        {/* Speaker Yousef Magdy */}
        <div className="card1">
          <Link href="#">
            <div>
              <Image
                className="thumb"
                src="/images/magdy.jpg"
                alt="Yousef Magdy"
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="card-info">
                <p>
                  <span className="highlight">Season 1</span>
                </p>
                <h3>Yousef Magdy</h3>
                <h4>Content Creator</h4>
              </div>
            </div>
          </Link>
        </div>

        {/* Speaker Ahmed Saudi */}
        <div className="card1">
          <Link href="#">
            <div>
              <Image
                className="thumb"
                src="/images/ahmed_s.jpg"
                alt="Ahmed Saudi"
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="card-info">
                <p>
                  <span className="highlight">Season 2</span>
                </p>
                <h3>Ahmed Saudi</h3>
                <h4>Content Creator</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpeakersSection;
