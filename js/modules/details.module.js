const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0e01d8fb2bmshd337779274ea968p12081bjsnc6054484bcb0",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

export class GameDetails {
  async getGameDetails(gameID) {
    var details = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`,
      options
    );
    let response = await details.json().then((res) => {
      return res;
    });
    return response;
  }
}
