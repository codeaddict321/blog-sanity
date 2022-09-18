import React from "react";
import { useParams } from "react-router-dom";
import client from "./client";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

export default function SinglePost() {
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    const img = builder.image(source);
    const imgLink = img.options.source.asset._ref;
    const imgId = imgLink.slice(6).slice(0, imgLink.length - 10);
    return `${img.options.baseUrl}/images/${img.options.projectId}/${img.options.dataset}/${imgId}.jpg`;
  }
  const myPortableTextComponents = {
    types: {
      image: ({ value }) => <img src={urlFor(value)} />,
      code: ({ value }) => <code>{value.code}</code>,
    },
  };

  const [post, setPost] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {}, []);
  const { slug } = useParams("slug");

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug.slice(1)}"] {
    _updatedAt,title,body
    ,slug,
    mainImage {
        asset -> {
            _id,url
        }
    },
    
    
}`
      )
      .then((data) => {
        setIsLoading(false);
        setPost(data[0]);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <div>
      {isLoading ? (
        <div id="loading-container">
          <img id="loading-img" src="/loading.png" alt="" />
        </div>
      ) : (
        <section>
          <div className="blog-container  mycontainer   bg-white py-12 px-4 sm:px-8">
            <h2 className="text-3xl md:text-5xl text-gray-900 text-center mb-4">
              {post.title}
            </h2>
            <p className="text-center mb-4 text-gray-700">
              Updated : {post._updatedAt.slice(0, 10)}
            </p>
            <div>
              <img src={post.mainImage.asset.url} alt="" />
            </div>
            <div className="mt-6 text-md my-text">
              <PortableText
                value={post.body}
                components={myPortableTextComponents}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
