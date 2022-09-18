import React from "react";
import client from "./client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const myPortableTextComponents = {
    types: {
      image: ({ value }) => <img src={value.imageUrl} />,
    },
  };

  function Content({ bodynew }) {
    const neededText = [];
    const data = (
      <PortableText value={[bodynew]} components={myPortableTextComponents} />
    );
    const { children } = data.props.value[0];

    for (let i = 0; i < 15; i++) {
      if (children && children[i] && children[i].text)
        neededText.push(children[i].text);
    }

    return (
      <p className="contentText text-sm text-gray-700">
        {neededText.map((text) => {
          return text;
        })}
      </p>
    );
  }

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
    _updatedAt,body[0] ,author->{ 
  name,
  "image":image.asset -> url
},title,slug,
    mainImage {
        asset -> {
            _id,url
        }
    },
    
    
}`
      )
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .then((err) => {
        if (err) console.log(err);
      });
  }, []);

  return (
    <section>
      <div className="mycontainer">
        {isLoading ? (
          <div id="loading-container">
            <img id="loading-img" src="/loading.png" alt="" />
          </div>
        ) : (
          posts.length > 0 && (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3  gap-6">
              {posts.map((post, index) => {
                return (
                  <li
                    id="blog-container"
                    className="bg-white relative  rounded-lg   mx-auto w-full pb-12"
                    key={
                      `${post.slug.curent}` == "undefined"
                        ? index
                        : `${post.slug.curent}`
                    }
                  >
                    {
                      <>
                        <Link to={`/blog:${post.slug.current}`}>
                          <img
                            className="rounded-md"
                            src={post.mainImage.asset.url}
                            alt="img"
                          />
                          <div className="px-4 pb-4 pt-1">
                            <h2 className="text-2xl font-bold">{post.title}</h2>

                            <Content bodynew={post.body} />
                            <div className="flex items-center mt-auto gap-1.5 absolute bottom-3">
                              <img
                                src={post.author.image}
                                className="w-10"
                                alt=""
                              />
                              <p className="text-sm">{post.author.name}</p>
                              <p className="text-gray-600 text-sm">
                                on {post._updatedAt.slice(0, 10)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </>
                    }
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
