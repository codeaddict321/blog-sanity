import client from "@sanity/client";

export default client({
  projectId: "rz5upz2y",
  dataset: "production",
  apiVersion: "2022-09-14", // use current UTC date - see "specifying API version"!
  // token: "sanity-auth-token", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
