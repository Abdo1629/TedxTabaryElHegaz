import Image from "next/image";
import Link from "next/link";

// @tokhy -> don't forget to replace all `a` tags with Link component.

const SpeakersSection = () => {
  return (
      <div className="margintop">
        <div className="events-container">
          <div className="content arabic-content">
            <span>نرحل ويبقى الأثر</span>
            <div className="EventsHeader">
              <h2>شخصيات هامة</h2>
              <Link href="/more-speakers">
                <button className="btn">عرض المزيد</button>
              </Link>
            </div>
          </div>

          <div className="content arabic-content">
            <span>We leave, yet the impact remains</span>
            <div className="EventsHeader">
              <h2>Important People</h2>
              <Link href="/more-speakers">
                <button className="btn">View All</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="events-cards">
          {/* Speaker Ahmed */}
          <div className=" content card1">
            <Link href="#">

              <Image className="thumb"
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
            <div className="more-info">
              <div className="description">
                <p>
                  أحمد مصطفى هو رائد أعمال طموح ومؤسس TEDx طبري. يدرس للحصول على
                  درجة البكالوريوس في التجارة من جامعة القاهرة، مع تخصص في إدارة
                  الأعمال. يتمتع بشغف كبير بالابتكار والقيادة...
                </p>
              </div>
              <div className="description">
                <p>
                  Ahmed Mostafa is an aspiring entrepreneur, pursuing a Bachelor
                  of Commerce degree at Cairo University, with a focus on business
                  administration...
                </p>
              </div>
              <div className="social-media">
                <a
                    href="https://www.facebook.com/ahmdabdrabou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-facebook"
                ></a>
                <a
                    href="https://www.linkedin.com/in/ahmdabdrabou/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-linkedin"
                ></a>
              </div>
            </div>
          </div>

          {/* Speaker Osama Elzero */}
          <div className="card1">
            <Link href="#">
              <div>
                <Image className="thumb"
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
            <div className="more-info">
              <div className="description">
                <p>
                  أسامة الزيرو هو مهندس برمجيات ومدرب مصري له حضور قوي على
                  YouTube. يشتهر بتقديم محتوى تعليمي عن لغات البرمجة...
                </p>
              </div>
              <div className="description">
                <p>
                  Osama Elzero is an Egyptian software engineer and trainer with a
                  strong presence on YouTube. He is known for his educational
                  content on various programming languages...
                </p>
              </div>
              <div className="social-media">
                <a
                    href="https://www.facebook.com/OsElzero/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-facebook"
                ></a>
                <a
                    href="https://eg.linkedin.com/in/osamaelzero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-linkedin"
                ></a>
                <a
                    href="https://www.youtube.com/channel/UCSNkfKl4cU-55Nm-ovsvOHQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-youtube"
                ></a>
              </div>
            </div>
          </div>

          {/* Speaker Nadeem Barakat */}
          <div className="card1">
            <Link href="#">
              <div>
                <Image className="thumb"
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
            <div className="more-info">
              <div className="description">
                <p>
                  نديم بركات هو خبير تطوير أعمال ذو خبرة واسعة في بناء وإدارة
                  الأعمال الناجحة. لديه سجل حافل في تحديد الفرص الجديدة...
                </p>
              </div>
              <div className="description">
                <p>
                  Nadeem Barakat is a seasoned business development professional
                  with extensive experience in building and managing successful
                  businesses...
                </p>
              </div>
              <div className="social-media">
                <a
                    href="https://www.facebook.com/NadeemBarakat7/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-facebook"
                ></a>
                <a
                    href="https://www.linkedin.com/in/nadeem-barakat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-linkedin"
                ></a>
              </div>
            </div>
          </div>

          {/* Speaker Yousef Magdy */}
          <div className="card1">
            <Link href="#">
              <div>
                <Image className="thumb"
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
            <div className="more-info">
              <div className="description">
                <p>
                  يوسف مجدي هو صانع محتوى تعليمي مصري مشهور بمقاطع الفيديو
                  التعليمية المبسطة...
                </p>
              </div>
              <div className="description">
                <p>
                  Yousef Magdy is an Egyptian content creator known for his
                  simplified and easy-to-understand educational videos...
                </p>
              </div>
              <div className="social-media">
                <a
                    href="https://www.facebook.com/zambaolakkedaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-facebook"
                ></a>
                <a
                    href="https://www.instagram.com/youssefmagdii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-instagram"
                ></a>
                <a
                    href="https://www.tiktok.com/@zambaolak_keda?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fab fa-tiktok"
                ></a>
              </div>
            </div>
          </div>

          {/* Speaker Ahmed Saudi */}
          <div className="card1">
            <Link href="#">
              <div>
                <Image  className="thumb"
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
            <div className="more-info">
              <div className="description">
                <p>
                  أحمد سعودي هو صانع محتوى بارز معروف بإنتاج فيديوهات عالية الجودة
                  وجذابة بصريًا...
                </p>
              </div>
              <div className="description">
                <p>
                  Ahmed Saudi is a prominent content creator who is known for
                  producing high-quality, visually stunning videos...
                </p>
              </div>
              <div className="social-media">
                <a
                    href="https://www.facebook.com/profile.php?id=100093255678792"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-facebook"
                ></a>
                <a
                    href="https://www.instagram.com/ahmed_saudi01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fa fa-instagram"
                ></a>
                <a
                    href="https://www.tiktok.com/@ahmed_saudi1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fab fa-tiktok"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SpeakersSection;
