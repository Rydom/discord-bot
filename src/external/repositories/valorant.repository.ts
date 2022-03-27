import { AxiosInstance, AxiosResponse } from 'axios'
import valorantApi from '../api/valorant'

type LeaderParams = {
  size: number
  startIndex: number
}

type ValorantPlayer = {
  puuid: string
  gameName: string
  tagLine: string
  leaderboardRank: number
  rankedRating: number
  numberOfWins: number
  competitiveTier: number
}

export type LeaderBoard = {
  actId: string
  players: ValorantPlayer[]
}

export class ValorantRepository {
  private api: AxiosInstance
  private readonly actId: string
  constructor() {
    this.api = valorantApi
    this.actId = 'd929bc38-4ab6-7da4-94f0-ee84f8ac141e'
  }

  getLeaderboards(
    leaderParams?: LeaderParams
  ): Promise<AxiosResponse<LeaderBoard>> {
    const defaultParams = { size: 10, startIndex: 0 }
    const params = {
      params: leaderParams || defaultParams,
    }
    return this.api.get(`/ranked/v1/leaderboards/by-act/${this.actId}`, params)
  }
}
