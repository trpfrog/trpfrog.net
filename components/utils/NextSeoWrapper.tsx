/**
 * This is a wrapper for NextSeo to prevent the Server Component error.
 */

'use client';

import {NextSeo, NextSeoProps} from "next-seo";

export default function NextSeoWrapper(props: NextSeoProps) {
  return <NextSeo {...props} />;
}
