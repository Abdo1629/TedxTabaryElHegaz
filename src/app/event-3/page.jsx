"use client";
import { useState, useEffect } from "react";

export default function Event3Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        ticketType: "Classic - 250EGP",
        paymentMethod: "Instapay",
        referralCode: "",
        expectations: "",
        questions: ""
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically send the form data to your server
        alert("تم إرسال طلبك بنجاح!");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="palestinian-flag-background">
            <div className="content-wrapper fade-in">
                <h1 className="event-title text-shadow">عودٌ على بَدْء</h1>
                <div className="event-info">
                    <div className="event-info-item" style={{backgroundColor: "#CE1126", color: "#FFFFFF"}}><p>الموسم 3</p></div>
                    <div className="event-info-item" style={{backgroundColor: "#007A3D", color: "#FFFFFF"}}><p>22 فبراير 2025</p></div>
                    <div className="event-info-item" style={{backgroundColor: "#000000", color: "#FFFFFF"}}><p>10:00 صباحاً - 8:00 مساءً</p></div>
                    <div className="event-info-item" style={{backgroundColor: "#007A3D", color: "#FFFFFF"}}><p>87ش المقريزي، هليوبوليس، القاهرة، مصر</p></div>
                </div>

                <div className="event-description">
                    <p> الحياةُ مسرحٌ مليءٌ بالتحدياتِ يواجهُ المرءُ فيها مصيرَهُ متسلحًا بمقوماتِهِ الراسخةِ والتي يكمن بعضها في إرادتِهِ، فتحدثه نفسه أن <strong style={{color: "#CE1126"}}>ليس سوى أنْ تُريدَ</strong></p>
                    <p> كما يكمن جلها بيد خالقه .. يمنحه اياه لما يري عزمه  <strong style={{color: "#CE1126"}}>فعلى قدرِ أهلِ العزمِ تأتي العزائمُ</strong></p>
                    <p>وها نحنُ ذا نعود لنبدأُ، فمن حيثُ توقفنا، نحاولُ أن نخلقَ تغييرًا في قصتِنا فمن رجع عوده على بدئه لم يقطع ذهابه حتى يصله برجوعه ،  ف . <strong style={{color: "#CE1126"}}>عودٌ على بدءٍ</strong></p>
                </div>

                <div className="event-location">
                    <h2 className="section-title">العنوان على الخريطة</h2>
                    <div className="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.0843398645843!2d31.310457500000002!3d30.091770800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fd254f8f66f%3A0xf02f40b1a7cc3113!2sFaculty%20Of%20Education%20-%20Ain%20Shams%20University!5e0!3m2!1sen!2seg!4v1736476207223!5m2!1sen!2seg"
                            width="100%"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="event-registration">
                    <h2 className="section-title">حجز تذكرة</h2>
                    <div className="form-group">
                        <label htmlFor="name">الاسم ثلاثي</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">البريد الإلكتروني</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">رقم الهاتف</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ticketType">نوع التذكرة</label>
                        <select
                            id="ticketType"
                            name="ticketType"
                            value={formData.ticketType}
                            onChange={handleChange}
                        >
                            <option value="Classic - 250EGP">Classic - 250EGP</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentMethod">وسيلة الدفع</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="Instapay">Instapay</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="referralCode">كود خصم (اختياري)</label>
                        <input
                            type="text"
                            id="referralCode"
                            name="referralCode"
                            value={formData.referralCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expectations">ما هي توقعاتك؟</label>
                        <textarea
                            id="expectations"
                            name="expectations"
                            value={formData.expectations}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="questions">أي أسئلة؟</label>
                        <textarea
                            id="questions"
                            name="questions"
                            value={formData.questions}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    <div className="form-submit">
                        <button type="submit" className="btn-pals">
                            إرسال
                        </button>
                    </div>
                </form>

                <div className="event-rules">
                    <h2 className="section-title">قوانين الحدث</h2>
                    <ol>
                        <li><strong style={{color: "#CE1126"}}>التذكرة وإثبات الهوية:</strong> يجب على كل مشارك إظهار تذكرة صالحة عند الدخول. تأكد من أن لديك إثبات هوية جاهز عند الطلب من قبل موظفي الحدث.</li>
                        <li><strong style={{color: "#CE1126"}}>ترتيبات الجلوس:</strong> لضمان خصوصية وراحة جميع المشاركين، سيتم فصل أماكن الجلوس. سيكون هناك أقسام مخصصة للرجال وأخرى للنساء. نطلب من جميع المشاركين احترام هذه الترتيبات والجلوس في الأماكن المخصصة لهم.</li>
                        <li><strong style={{color: "#CE1126"}}>الاحترام والسلوك:</strong> يلتزم TEDx ببيئة شاملة ومحترمة وإيجابية. لن يتم التسامح مع أي سلوك مزعج أو غير محترم. يجب على المشاركين الامتناع عن استخدام لغة مسيئة أو إيماءات غير لائقة أو أي شكل من أشكال التحرش.</li>
                        <li><strong style={{color: "#CE1126"}}>التصوير والتسجيل:</strong> لا يُسمح للمشاركين بتسجيل أو التقاط صور للحدث دون إذن مسبق من المنظمين. سيكون هناك مصورون رسميون يقومون بالتصوير خلال الحدث.</li>
                        <li><strong style={{color: "#CE1126"}}>قواعد الملابس:</strong> يرجى ارتداء الملابس المحتشمة والمناسبة للحدث. يشجع TEDx على ارتداء الملابس المهنية والمحترمة بما يتماشى مع المعايير الثقافية المحلية.</li>
                        <li><strong style={{color: "#CE1126"}}>الالتزام بالمواعيد:</strong> يُنصح المشاركون بالوصول في الوقت المحدد لتجنب أي انقطاع. قد لا يُسمح بدخول المتأخرين حسب جدول الحدث.</li>
                        <li><strong style={{color: "#CE1126"}}>الصحة والسلامة:</strong>الالتزام بأي بروتوكولات صحية وإجراءات السلامة التي يضعها المنظمون. إذا شعرت بأي توعك أثناء الحدث، يرجى إبلاغ أحد أفراد الطاقم على الفور.</li>
                        <li><strong style={{color: "#CE1126"}}>سياسة عدم التسامح:</strong> سيتم التعامل بجدية مع أي انتهاكات للقواعد المذكورة أعلاه، وقد تؤدي إلى الإبعاد من الحدث دون استرداد رسوم التسجيل.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

