import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  img: (props) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={800}
      height={450}
      className="my-6 rounded-lg"
      loading="lazy"
    />
  ),
  a: (props) => {
    const isExternal = props.href?.startsWith("http");
    return (
      <a
        {...props}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      />
    );
  },
};
