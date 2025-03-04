// Copyright 2017-2020 @canvas-ui/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from "i18next";
import { Option } from "./types";

interface LinkOption extends Option {
  dnslink?: string;
}

function createDev(t: TFunction): LinkOption[] {
  return [
    {
      dnslink: "local",
      info: "local",
      shortText: t<string>("rpc.local.short", "Local Node", { ns: "apps-config" }),
      text: t<string>("rpc.local", "Local Node (Own, 127.0.0.1:9944)", { ns: "apps-config" }),
      value: "ws://127.0.0.1:9944/",
    },
  ];
}

function createLive(t: TFunction): LinkOption[] {
  return [
    {
      dnslink: "reef",
      info: "reef",
      shortText: t<string>("Mainnet", { ns: "apps-config" }),
      text: t<string>("rpc.hosted.by", "Reef", {
        ns: "apps-config",
        replace: { host: "Reef" },
      }),
      value: "wss://rpc.reefscan.com/ws",
    },
    {
      dnslink: "reef",
      info: "reef",
      shortText: t<string>("Testnet (Maldives)", { ns: "apps-config" }),
      text: t<string>("rpc.hosted.by", "Reef", {
        ns: "apps-config",
        replace: { host: "Reef" },
      }),
      value: "wss://rpc-testnet.reefscan.com/ws",
    },
  ];
}

// function createTest (t: <T= string> (key: string, text: string, options: { ns: string }) => T): LinkOption[] {
//   return [
//     // {
//     //   info: 'substrate',
//     //   shortText: t<string>('rpc.flamingfir.short', 'Flaming Fir', { ns: 'apps-config' }),
//     //   text: t<string>('rpc.flamingfir', 'Flaming Fir (Substrate Testnet, hosted by Parity)', { ns: 'apps-config' }),
//     //   value: 'wss://substrate-rpc.parity.io/'
//     // }
//   ];
// }

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../logos, specifically in namedLogos
//   text: The text to display on teh dropdown
//   value: The actual hosted secure websocket endpoint
export default function create(t: TFunction): LinkOption[] {
  const ENV: LinkOption[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const WS_URL = process.env.WS_URL || ((window as any).process_env?.WS_URL as string);

  if (WS_URL) {
    ENV.push({
      info: "WS_URL",
      shortText: "WS_URL",
      text: `WS_URL: ${WS_URL}`,
      value: WS_URL,
    });
  }

  let endpoints = [
    ...createLive(t),
    // {
    //   isHeader: true,
    //   text: t<string>('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
    //   value: ''
    // },
    // {
    //   isHeader: true,
    //   text: t<string>('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
    //   value: ''
    // },
    // ...createTest(t),
    // {
    //   isHeader: true,
    //   text: t<string>('rpc.header.dev', 'Development', { ns: 'apps-config' }),
    //   value: ''
    // },
    ...createDev(t),
  ];

  if (ENV.length > 0) {
    endpoints = [
      {
        isHeader: true,
        text: t<string>("rpc.custom", "Custom environment", { ns: "apps-config" }),
        value: "",
      },
      ...ENV,
    ].concat(endpoints);
  }

  return endpoints;
}
