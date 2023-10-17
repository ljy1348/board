export default interface IBoardList {
    id:number;
    title:string;
    author:string;
    insertDate:string;
    vote:number;
    attachmentsData:string;
    isPinned:boolean;
    commentCount:number;
}

// export default interface IBoardList {
//     data:Array<IBoardList>;
// }