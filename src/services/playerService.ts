interface PlayerResponse {
    id: number;
    name: string;
    wins: number;
    losses: number;
    totalScore: number;
}

interface PlayerRatingResponse {
    id: number;
    name: string;
    calculatedRating: string;
    totalGames: number;
}

const playerList: Array<PlayerResponse> = [
    { id: 1, name: "ShadowStrike", wins: 15, losses: 5, totalScore: 28500 },
    { id: 2, name: "NoobMaster", wins: 3, losses: 12, totalScore: 4200 },
    { id: 3, name: "ProGamer99", wins: 0, losses: 0, totalScore: 0 },
    { id: 27, name: "TheLegend27", wins: 1, losses: 0, totalScore: 1000 }
]

const getPlayers = (): any => {
    return playerList;
}

const getPlayer = (id: number): any => {
    return playerList.find(x => x.id === id)
}

const getPlayerRating = (id: number): any => {
    const player = getPlayer(id)
    const totalGames = (getPlayer(id).wins + getPlayer(id).losses)
    const ratingResponse: PlayerRatingResponse = {
        id: id,
        name: player.name,
        calculatedRating: totalGames > 0 ? Number((player.wins / totalGames) * 100 + (player.totalScore / totalGames)).toFixed(2) : "0.00",
        totalGames: totalGames
    }

    return ratingResponse
}

export { getPlayers, getPlayer, getPlayerRating } 