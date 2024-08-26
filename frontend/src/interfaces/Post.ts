import { IComment } from "./Comment";
import { IMember } from "./Member";
import { IVote } from "./Vote";

export interface IPost {
  comments: Array<IComment>;
  content: string;
  dateCreated: string;
  id: number;
  memberId: number;
  memberPostedBy: IMember;
  postType: string;
  title: string;
  votes: Array<IVote>;
}
