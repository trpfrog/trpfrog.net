/**
 * This is a wrapper for NextSeo to prevent the Server Component error.
 */

'use client';

import LiteYouTubeEmbed, {LiteYouTube} from "react-lite-youtube-embed";
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function LiteYouTubeEmbedWrapper(props: LiteYouTube) {
  return <LiteYouTubeEmbed {...props} />;
}
