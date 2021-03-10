import { ActionType, createAction, createReducer } from 'typesafe-actions';

const FETCH_VIDEO = 'video/FETCH_VIDEO'

export type Video = {
  id: number ,
  title: string,
  description: string ,
  director: string ,
  actor: string ,
  runtime: string,
  ageLimit: string,
  releaseYear: string,
  posterUrl: string,
  bannerUrl: string,
  netflixUrl: string,
  type: string,
  createdAt: string,
  updatedAt: string,
  rating: number,
  genres: string[]
}

export const fetchVideo = createAction(FETCH_VIDEO)<Video>();

const actions = { fetchVideo }
type VideoAction = ActionType<typeof actions>

export type VideoState = Video

export const initialVideoState: VideoState = {
  id: 0,
  title: '',
  description: '',
  director: '',
  actor: '',
  runtime: '',
  ageLimit: '',
  releaseYear: '',
  posterUrl: '',
  bannerUrl: '',
  netflixUrl: '',
  type: '',
  createdAt: '',
  updatedAt: '',
  rating: 0,
  genres: []
}

const video = createReducer<VideoState, VideoAction>(initialVideoState, {
  [FETCH_VIDEO]: (state, {payload: video}) => ({
    ...video
  })
})

export default video