import Ably from "ably/promises";

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY);

  const channel = client.channels.get("some-channel-name");
  channel.publish("test-message", { text: `Server sent a message on behalf of ${req.body.sender}` });

  res.status(200);
}
