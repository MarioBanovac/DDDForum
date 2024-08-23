export interface IVote {
  id: number,
  memberId: number,
  postId: number,
  voteType: 'Upvote' | 'DownVote'
}
