"use client";

import { useEffect, useRef } from "react";

const BANNER_UNITS = {
  desktop: {
    height: 90,
    key: "ebf6ebd9b637b8bf7ed49c4860199790",
    width: 728,
  },
  mobile: {
    height: 50,
    key: "98cf6dcf986936eb452487b348d010ac",
    width: 320,
  },
} as const;

const NATIVE_UNIT = {
  containerId: "container-bb7b665cbb0825e760e8cd50beb993b6",
  source:
    "https://pl31071899.profitableratecpmnetwork.com/bb7b665cbb0825e760e8cd50beb993b6/invoke.js",
} as const;

function renderBanner(host: HTMLDivElement, mobile: boolean) {
  const unit = mobile ? BANNER_UNITS.mobile : BANNER_UNITS.desktop;
  const configuration = document.createElement("script");
  const invocation = document.createElement("script");

  configuration.text = `atOptions = ${JSON.stringify({
    format: "iframe",
    height: unit.height,
    key: unit.key,
    params: {},
    width: unit.width,
  })};`;
  invocation.async = true;
  invocation.src = `https://www.highrevenueformat.com/${unit.key}/invoke.js`;

  host.replaceChildren(configuration, invocation);
}

export function AdsterraResponsiveBanner() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const media = window.matchMedia("(max-width: 760px)");
    const refresh = () => renderBanner(host, media.matches);

    refresh();
    media.addEventListener("change", refresh);

    return () => {
      media.removeEventListener("change", refresh);
      host.replaceChildren();
    };
  }, []);

  return (
    <aside className="adsterra-placement adsterra-banner no-print" aria-label="Publicité">
      <span>Transmission sponsorisée</span>
      <div ref={hostRef} className="adsterra-banner-host" />
    </aside>
  );
}

export function AdsterraNativeBanner() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const invocation = document.createElement("script");
    const container = document.createElement("div");

    invocation.async = true;
    invocation.dataset.cfasync = "false";
    invocation.src = NATIVE_UNIT.source;
    container.id = NATIVE_UNIT.containerId;
    host.replaceChildren(invocation, container);

    return () => host.replaceChildren();
  }, []);

  return (
    <aside className="adsterra-placement adsterra-native no-print" aria-label="Publicité native">
      <span>Contenu sponsorisé</span>
      <div ref={hostRef} className="adsterra-native-host" />
    </aside>
  );
}
