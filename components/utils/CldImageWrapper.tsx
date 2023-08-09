'use client';

import React from "react";
import Image, {ImageProps} from "next/image";
import cloudinaryLoader from "@blog/_lib/cloudinaryLoader";

export default function CldImageWrapper(
  props: Omit<ImageProps, 'loader'>
) {
  return (
    <Image
      {...props}
      loader={cloudinaryLoader}
    />
  )
}
