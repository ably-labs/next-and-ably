# Realtime Edge Messaging in your [NextJS](https://nextjs.org/) apps with [Ably](https://ably.com/)

Build engaging and dependable realtime experiences into your apps with [Ably](https://ably.com/) without the infrastructure overhead.

Use Ably in your Next application using idiomatic, easy to use hooks.

Using this demo you can:

- [Send and receive](https://ably.com/docs/realtime/messages) realtime messages
- Get notifications of [user presence](https://ably.com/docs/realtime/presence) on channels
- Send [presence updates](https://ably.com/docs/api/realtime-sdk/presence#update) when a new client joins or leaves the demo

This demo is a [Next.js](https://nextjs.org/) project, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses the [Ably React Hooks package](https://www.npmjs.com/package/@ably-labs/react-hooks), a symplified syntax for interacting with Ably, which manages the lifecycle of the Ably SDK instances for you taking care to subscribe and unsubscribe to channels and events when your components re-render).

## Getting Started

### Ably Setup

In order to send and receive messages you will need an Ably API key.
If you are not already signed up, you can [sign up now for a free Ably account](https://www.ably.io/signup). Once you have an Ably account:

1. Log into your app dashboard.
2. Under **“Your apps”**, click on **“Manage app”** for any app you wish to use for this tutorial, or create a new one with the “Create New App” button.
3. Click on the **“API Keys”** tab.
4. Copy the secret **“API Key”** value from your Root key.
5. Create a .env file in the root of the demo repository
6. Paste the API key into your new env file, along with a env variable for your localhost:

```bash
ABLY_API_KEY=your-ably-api-key:goes-here
API_ROOT=http://localhost:3000
```

### Running the Demo

First cd into the project root and install the dependencies, then run the development server:

```bash
cd next-and-ably

npm install
npm run dev

# or

yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the running demo.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Using Ably

### Configuration

[pages/\_app.js](pages/_app.js) is where the Ably SDK is configured:

```js
import { configureAbly } from "@ably-labs/react-hooks";

const prefix = process.env.API_ROOT || "";
const clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

configureAbly({ authUrl: `${prefix}/api/createTokenRequest?clientId=${clientId}`, clientId: clientId });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

`configureAbly` matches the method signature of the Ably SDK - and requires either a string or a [AblyClientOptions](https://ably.com/docs/api/realtime-sdk#client-options) object. You can use this configuration object to setup your [tokenAuthentication](https://ably.com/docs/core-features/authentication#token-authentication). If you want to use the usePresence function, you'll need to explicitly provide a `clientId`.

You can do this anywhere in your code before the rest of the library is used.

### useChannel (Publishing and Subscribing to Messages)

The useChannel hook lets you subscribe to a channel and receive messages from it:

```js
import { useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";

export default function Home() {
  const [channel] = useChannel("your-channel", async (message) => {
    console.log("Received Ably message", message);
  });
}
```

Every time a message is sent to `your-channel` it will be logged to the console. You can do whatever you need to with those messages.
You can see an example of this in [pages/index.js line 11](https://github.com/ably-labs/next-and-ably/blob/6fe198ccf36920ee44983719b39c90a76d5169e1/pages/index.js#L11).

#### Publishing a message

The `channel` instance returned by `useChannel` can be used to send messages to the channel. It is a regular Ably JavaScript SDK `channel` instance.

```javascript
channel.publish("test-message", { text: "message text" });
```

You can see an example of this in [pages/index.js line 51](https://github.com/ably-labs/next-and-ably/blob/6fe198ccf36920ee44983719b39c90a76d5169e1/pages/index.js#L51)

### usePresence

The usePresence hook lets you subscribe to presence events on a channel - this will allow you to get notified when a user joins or leaves the channel. The presence data is automatically updated and your component re-rendered when presence changes:

```js
import { useState } from "react";
import { usePresence } from "@ably-labs/react-hooks";

export default function Home() {
  const [presenceData, updateStatus] = usePresence("your-channel-name");

  const presentClients = presenceData.map((msg, index) => (
    <li key={index}>
      {msg.clientId}: {msg.data}
    </li>
  ));

  return <ul>{presentClients}</ul>;
}
```

You can see an example of this in use in [pages/index.js line 16](https://github.com/ably-labs/next-and-ably/blob/6fe198ccf36920ee44983719b39c90a76d5169e1/pages/index.js#L16s).

You can read more about the hooks available with the Ably Hooks package on the [@ably-labs/ably-hooks documentation on npm](https://www.npmjs.com/package/@ably-labs/react-hooks).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Want to contribute to this project? Have a look at our [contributing guide](CONTRIBUTING.md)!

## More info

- [Join our Discord server](https://discord.gg/q89gDHZcBK)
- [Follow us on Twitter](https://twitter.com/ablyrealtime)
- [Use our SDKs](https://github.com/ably/)
- [Visit our website](https://ably.com)

---

[![Ably logo](https://static.ably.dev/badge-black.svg?next-and-ably)](https://ably.com)
