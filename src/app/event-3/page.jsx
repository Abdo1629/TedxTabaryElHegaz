"use client";
import { useState } from "react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="event-page">
            <div className="season-header">
                <span className="season-number">الموسم 3</span>
                <h1 className="event-title">عودٌ على بدء</h1>
            </div>

            <div className="event-info">
                <div className="info-row">
                    <span className="info-label">التاريخ:</span>
                    <span>15 فبراير 2025</span>
                </div>
                <div className="info-row">
                    <span className="info-label">الوقت:</span>
                    <span>10:00 صباحاً - 6:00 مساءً</span>
                </div>
                <div className="info-row">
                    <span className="info-label">العنوان:</span>
                    <span>القاهرة، مصر</span>
                </div>
            </div>

            <div className="event-description">
                <h3>الوصف:</h3>
                <p>الحياة مسرحٌ مليء بالتحديات يواجه المرء منها صعوبة مستسلماً بمعطيات يكمن نصفها في إرادته متحدياً نفسه أن "ليس سوى أن نريد"</p>
                <p>كما يمكن خلق يدٍ خالقه يمنحنا إياها ما بين من عزمه "فعلى قدر أهل العزم تأتي العزائم"</p>
                <p>وها نحن نعود لنبدأ قصص رجعٍ عَوْدٌيٌ على بدءٍ لم يقطع ذهابه حتى يصله برجوعه نعود من حيث توقفنا فنمس في أذن الحياة صارخين بالتغيير "قَوْقَعَةٌ على بَدْء"</p>
            </div>

            <div className="map-section">
                <span className="section-title arabic-content">العنوان على الخريطة</span>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.5761963015786!2d31.233367!3d30.044420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjkiTiAzMcKwMTQnMDAuMSJF!5e0!3m2!1sen!2seg!4v1635959562548!5m2!1sen!2seg"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <div className="registration-section">
                <h2>حجز تذكرة</h2>
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-group">
                        <label htmlFor="name">الاسم ثلاثي:</label>
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
                        <label htmlFor="email">البريد الإلكتروني:</label>
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
                        <label htmlFor="phone">رقم الهاتف:</label>
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
                        <label htmlFor="ticketType">نوع التذكرة:</label>
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
                        <label htmlFor="paymentMethod">وسيلة الدفع:</label>
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
                        <label htmlFor="referralCode">كود خصم (اختياري):</label>
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
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="questions">أي أسئلة؟</label>
                        <textarea
                            id="questions"
                            name="questions"
                            value={formData.questions}
                            onChange={handleChange}
                        />
                    </div>

                    <p className="payment-note">
                        الرجاء إرسال صورة التحويل على رقم واتساب التالي: 201014735800+
                    </p>

                    <button type="submit" className="submit-button">
                        إرسال
                    </button>
                </form>
            </div>

            <div className="event-rules">
                <h2>قوانين الحدث</h2>
                <ol>
                    <li>التذكرة وإثبات الهوية: يجب على كل مشارك إظهار تذكرة صالحة عند الدخول تأكد من أن لديك إثبات هوية جاهز عند الطلب من قبل موظفي الحدث.</li>
                    <li>ترتيبات الجلوس: لضمان خصوصية وراحة جميع المشاركين، سيتم فصل أماكن الجلوس. سيكون هناك أقسام مخصصة للرجال وأخرى للنساء نطلب من جميع المشاركين احترام هذه الترتيبات والجلوس في الأماكن المخصصة لهم.</li>
                    <li>الاحترام والسلوك: يلتزم TEDx ببنية شاملة ومحترمة وإيجابية. لن يتم التسامح مع أي سلوك مزعج أو غير محترم. يجب على المشاركين الامتناع عن استخدام لغة مسيئة أو إيماءات عبر اللغة أو أي شكل من أشكال التحرش.</li>
                    <li>التصوير والتسجيل: لا يُسمح للمشاركين بتسجيل أو التقاط صور للحدث دون إذن مسبق من المنظمين. سيكون هناك مصورون وسيقومون بالتصوير خلال الحدث.</li>
                    <li>قواعد اللباس: يرجى ارتداء الملابس المحتشمة والمناسبة للحدث. يشجع TEDx على ارتداء الملابس المهنية والمحترمة بما يتماشى مع المعايير الثقافية المحلية.</li>
                    <li>الالتزام بالمواعيد: يُنصح المشاركون بالوصول في الوقت المحدد لتجنب أي انقطاع. قد لا يُسمح بدخول المتأخرين حسب جدول الحدث.</li>
                    <li>الصحة والسلامة: الالتزام بأي بروتوكولات صحية وإجراءات السلامة التي يضعها المنظمون. إذا اشتعرت بأي توعك أثناء الحدث، يرجى إبلاغ أحد أفراد الطاقم على الفور.</li>
                    <li>سياسة عدم التسامح: سيتم التعامل بجدية مع أي انتهاكات للقواعد المذكورة أعلاه، وقد تؤدي إلى الإبعاد من الحدث دون استرداد رسوم التسجيل.</li>
                </ol>
            </div>
        </div>
    );
}

