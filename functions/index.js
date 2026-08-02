const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

// Fires at 10:00 Europe/Prague every Monday.
exports.weeklyMeterReminder = onSchedule(
  { schedule: "0 10 * * 1", timeZone: "Europe/Prague" },
  async () => {
    const db = getFirestore();
    const snapshot = await db.collection("fcmTokens").get();
    if (snapshot.empty) return;

    const tokens = snapshot.docs.map((d) => d.id);
    const response = await getMessaging().sendEachForMulticast({
      tokens,
      notification: {
        title: "Odečet vodoměru",
        body: "Nezapomeň zapsat stav vodoměru.",
      },
    });

    const staleTokens = [];
    response.responses.forEach((r, i) => {
      if (!r.success && (r.error?.code === "messaging/registration-token-not-registered")) {
        staleTokens.push(tokens[i]);
      }
    });
    await Promise.all(staleTokens.map((t) => db.collection("fcmTokens").doc(t).delete()));
  },
);
