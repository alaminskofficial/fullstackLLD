const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "4c313798f81c746532759e15b9f0ff0f",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
