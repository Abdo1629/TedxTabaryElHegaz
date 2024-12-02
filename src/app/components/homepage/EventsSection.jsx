import Link from "next/link";
import Image from "next/image";

// @tokhy -> retransfer the code to make it more cleaner (make an event component and use props.)

const EventsSection = () => {
  return (
    <div>
      <div>
        <div>
          <span>Events</span>
          <div>
            <h2>Seasons</h2>
          </div>
        </div>
        <div>
          <span>مُستمرون</span>
          <div>
            <h2>المواسم</h2>
          </div>
        </div>
        <div>
          {/* Event 1 */}
          <Link href="#">
            <button>
              <Image
                src="/images/tred.jpg"
                alt="Event Thumbnail"
                width={500}
                height={300}
                loading="lazy"
              />
              <div>
                <div>
                  <div>
                    <p>ليس سوى ان تريد</p>
                    <h4>Season 1</h4>
                    <h4>Ended</h4>
                  </div>
                  <span>30/10/2021</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <p>ليس سوى ان تريد</p>
                    <h4>الموسم 1</h4>
                    <h4>إنتهى</h4>
                  </div>
                  <span>30/10/2021</span>
                </div>
              </div>
            </button>
          </Link>

          {/* Event 2 */}
          <Link href="#">
            <button>
              <Image
                src="/images/3azm.jpg"
                alt="Event Thumbnail"
                width={500}
                height={300}
                loading="lazy"
              />
              <div>
                <div>
                  <div>
                    <p>على قدر أهل العزم</p>
                    <h4>Season 2</h4>
                    <h4>Ended</h4>
                  </div>
                  <span>27/8/2022</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <p>على قدر أهل العزم</p>
                    <h4>الموسم 2</h4>
                    <h4>إنتهى</h4>
                  </div>
                  <span>27/8/2022</span>
                </div>
              </div>
            </button>
          </Link>

          {/* Event 3 */}
          <Link href="event-3.html">
            <button>
              <Image
                src="/images/3azm.jpg"
                alt="Event Thumbnail"
                width={500}
                height={300}
                loading="lazy"
              />
              <div>
                <div>
                  <div>
                    <p>عودُ على بدء</p>
                    <h4>Season 3</h4>
                    <h4>Soon</h4>
                  </div>
                  <span>15/2/2025</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <p>عودُ على بدء</p>
                    <h4>الموسم 3</h4>
                    <h4>قريباً</h4>
                  </div>
                  <span>15/2/2025</span>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
