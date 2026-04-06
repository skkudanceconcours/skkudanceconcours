const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");

const discordWebhookUrl = defineSecret("DISCORD_WEBHOOK_URL");

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
