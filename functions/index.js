const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { Resend } = require("resend");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

const discordWebhookUrl = defineSecret("DISCORD_WEBHOOK_URL");
const resendApiKey = defineSecret("RESEND_API_KEY");

exports.sendErrorAlert = onDocumentCreated(
  {
    document: "error_logs/{docId}",
    secrets: [discordWebhookUrl],
  },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const { type, message, userName, major, timestamp, userAgent } = data;

    const embed = {
      title: `\u26a0\ufe0f [${type}] ${message}`,
      color: type === "submit_failed" ? 0xff0000 : 0xffa500,
      fields: [
        { name: "\ucc38\uac00\uc790", value: userName || "\ubbf8\uc785\ub825", inline: true },
        { name: "\uc804\uacf5", value: major || "\ubbf8\uc120\ud0dd", inline: true },
        {
          name: "\ubc1c\uc0dd \uc2dc\uac01",
          value: timestamp
            ? new Date(timestamp).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
            : new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          inline: false,
        },
        { name: "\ube0c\ub77c\uc6b0\uc800", value: userAgent || "\uc54c \uc218 \uc5c6\uc74c", inline: false },
      ],
      timestamp: new Date().toISOString(),
    };

    const body = JSON.stringify({
      username: "\ucf69\ucfe4 \uc5d0\ub7ec \uc54c\ub9bc",
      embeds: [embed],
    });

    await fetch(discordWebhookUrl.value(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  },
);

exports.sendReceptionEmail = onDocumentCreated(
  {
    document: "reception2026/{docId}",
    secrets: [resendApiKey, discordWebhookUrl],
  },
  async (event) => {
    const data = event.data?.data()?.reception;
    if (!data) return;

    const { name, email, major, grade, artTitle, timestamp } = data;
    const resend = new Resend(resendApiKey.value());

    const dateStr = (typeof timestamp?.toDate === "function" ? timestamp.toDate() : new Date(timestamp)).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    const ADMIN_EMAIL = "dance0604@skku.edu";

    const infoTable = `
      <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9;"><b>이름</b></td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9;"><b>이메일</b></td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9;"><b>전공</b></td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${major}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9;"><b>학년</b></td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${grade}</td>
        </tr>
        ${artTitle ? `
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9;"><b>작품 제목</b></td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${artTitle}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9;"><b>접수 시각</b></td>
          <td style="padding: 8px 12px; border: 1px solid #ddd;">${dateStr}</td>
        </tr>
      </table>
    `;

    await Promise.all([
      resend.emails.send({
        from: "성균관대학교 무용학과 <noreply@skkudanceconcours.kr>",
        to: email,
        subject: "[ 성균관대 무용학과 ] 콩쿨 접수가 완료되었습니다.",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="margin-bottom: 8px;">접수 완료 안내</h2>
            <p>${name}님, 접수가 정상적으로 완료되었습니다.</p>
            ${infoTable}
            <p style="margin-top: 24px; color: #666; font-size: 14px;">참가비 입금 관련하여 공지사항을 꼭 확인해주시기 바랍니다.<br>별도 문의사항은 <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a>로 보내주시길 바랍니다.</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: "성균관대학교 무용학과 <noreply@skkudanceconcours.kr>",
        to: ADMIN_EMAIL,
        subject: `[ 관리자 ] 새 접수 알림 - ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <h2 style="margin-bottom: 8px;">새 접수가 도착했습니다</h2>
            <p>새로운 콩쿨 접수가 완료되었습니다.</p>
            ${infoTable}
          </div>
        `,
      }),
    ]);

    // 이메일 전송량 카운터 업데이트 및 threshold 모니터링
    const today = new Date().toISOString().slice(0, 10);
    const month = new Date().toISOString().slice(0, 7);

    const dailyRef = db.collection("email_stats").doc(`daily_${today}`);
    const monthlyRef = db.collection("email_stats").doc(`monthly_${month}`);

    const [dailySnap, monthlySnap] = await Promise.all([
      dailyRef.get(),
      monthlyRef.get(),
    ]);

    const prevDaily = dailySnap.exists ? (dailySnap.data().count ?? 0) : 0;
    const prevMonthly = monthlySnap.exists ? (monthlySnap.data().count ?? 0) : 0;

    await Promise.all([
      dailyRef.set({ count: FieldValue.increment(2) }, { merge: true }),
      monthlyRef.set({ count: FieldValue.increment(2) }, { merge: true }),
    ]);

    const nextDaily = prevDaily + 2;
    const nextMonthly = prevMonthly + 2;

    const alerts = [];
    if (prevDaily < 70 && nextDaily >= 70) {
      alerts.push(`⚠️ [이메일 경보] 일별 발송량 70% 초과 — 오늘 ${nextDaily}/100건`);
    }
    if (prevMonthly < 2400 && nextMonthly >= 2400) {
      alerts.push(`🚨 [이메일 경보] 월별 발송량 80% 초과 — 이번 달 ${nextMonthly}/3000건`);
    }

    for (const msg of alerts) {
      await fetch(discordWebhookUrl.value(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "이메일 모니터", content: msg }),
      });
    }
  },
);
