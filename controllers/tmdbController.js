const axios = require("axios");
const token = process.env.API_TOKEN;
const api_key = process.env.API_KEY;

class Controller {
  static async getPopular(req, res) {
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = response.data.results.map((el, i) => {
        let obj = {
          id: i + 1,
          title: el.title,
          imageUrl: `https://image.tmdb.org/t/p/original` + el.poster_path,
          synopsis: el.overview,
          rating: el.vote_average,
          movieId: el.id
        };
        return obj;
      });
      let sliceData = data.slice(0, 8);
    
      res.status(200).json(sliceData);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getNowPlaying(req, res) {
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.results.map((el, i) => {
        let obj = {
          id: i + 1,
          title: el.title,
          imageUrl: `https://image.tmdb.org/t/p/original` + el.poster_path,
          synopsis: el.overview,
          rating: el.vote_average,
          movieId: el.id
        };
        return obj;
      });
      let sliceData = data.slice(0, 8);
      res.status(200).json(sliceData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUpcoming(req, res) {
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.results.map((el, i) => {
        let obj = {
          id: i + 1,
          title: el.title,
          imageUrl: `https://image.tmdb.org/t/p/original` + el.poster_path,
          synopsis: el.overview,
          rating: el.vote_average,
          movieId: el.id
        };
        return obj;
      });

      let sliceData = data.slice(0, 8);
      res.status(200).json(sliceData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMovieById(req, res) {
    const {movieId} = req.params
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const genre = response.data.genres
    
      res.status(200).json({
        title: response.data.title,
        imageUrl: `https://image.tmdb.org/t/p/original` + response.data.poster_path,
        synopsis: response.data.overview,
        genre: `${response.data.genres[0].name}, ${response.data.genres[1].name}, ${response.data.genres[2].name}`
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
