import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      sponsor,
      prize,
      player,
      time,
      userAgent,
    }: {
      sponsor?: string;
      prize?: string;
      player?: { name?: string; phone?: string; email?: string };
      time?: string;
      userAgent?: string;
    } = data || {};

    // ======== Server-side Validation ========
    const errors: Record<string, string> = {};

    const isString = (v: unknown): v is string => typeof v === "string";
    const trimOrEmpty = (v?: string) => (isString(v) ? v.trim() : "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const digitsOnly = /^\d+$/;

    const _sponsor = trimOrEmpty(sponsor);
    const _prize = trimOrEmpty(prize);
    const _name = trimOrEmpty(player?.name);
    const _phone = trimOrEmpty(player?.phone);
    const _email = trimOrEmpty(player?.email).toLowerCase();

    if (!_sponsor) errors["sponsor"] = "حقل الراعي (sponsor) مطلوب";
    if (!_prize) errors["prize"] = "حقل الجائزة (prize) مطلوب";

    // player object and fields required
    if (!player) {
      errors["player"] = "بيانات اللاعب مطلوبة";
    }

    // name: required and at least 6 characters (after trim)
    if (!_name) {
      errors["player.name"] = "الاسم مطلوب";
    } else if (_name.replace(/\s+/g, "").length < 6) {
      errors["player.name"] = "الاسم يجب أن يكون 6 حروف على الأقل";
    }

    // phone: required, digits only, length between 8 and 15
    if (!_phone) {
      errors["player.phone"] = "رقم الموبايل مطلوب";
    } else if (!digitsOnly.test(_phone)) {
      errors["player.phone"] = "رقم الموبايل يجب أن يحتوي على أرقام فقط";
    } else if (_phone.length < 8 || _phone.length > 15) {
      errors["player.phone"] = "رقم الموبايل يجب أن يكون بين 8 و 15 رقم";
    }

    // email: required and valid
    if (!_email) {
      errors["player.email"] = "البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(_email)) {
      errors["player.email"] = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "فشل التحقق من صحة البيانات",
          fieldErrors: errors,
        },
        { status: 400 }
      );
    }

    // === إرسال البيانات إلى Google Apps Script ===
    const scriptUrl = "https://script.google.com/macros/s/AKfycbzFX2cy6HZEy20-cx-1h4MRYQnDi_9INzsxAvUTFxubLhTAfS3y1RKe4UJ36zL6LHM/exec";
    
    // add a timeout to avoid hanging if Apps Script is slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify({
        sponsor: _sponsor,
        prize: _prize,
        player: { name: _name, phone: _phone, email: _email },
        time: time || new Date().toISOString(),
        userAgent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // تحقق من نجاح الإرسال لـ Google Sheets
    if (!response.ok) {
      console.error("Google Scripts error:", await response.text());
      return NextResponse.json(
        { ok: false, error: "Failed to save to Google Sheets" },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("Google Sheets response:", result);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Invalid JSON" },
      { status: 400 }
    );
  }
}