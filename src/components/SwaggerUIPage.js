import React from 'react';

/**
 * Embeds a standalone Swagger UI page (same style as https://antmedia.io/rest/).
 */
export default function SwaggerUIPage({src, title}) {
  return (
    <div className="ams-swagger-frame-wrap">
      <iframe
        className="ams-swagger-frame"
        src={src}
        title={title}
        loading="lazy"
      />
    </div>
  );
}
