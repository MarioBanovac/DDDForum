export interface IComment {
  id: number,
  memberId: number,
  parentCommentId: null | number
  postId: number
  text: string
}
