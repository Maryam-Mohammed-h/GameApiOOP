const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0e01d8fb2bmshd337779274ea968p12081bjsnc6054484bcb0",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

export class Games {
  async getGames(category) {
    var games = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    let response = await games.json().then((res) => {
      return res;
    });
    return response;
  }
}
