export type Author = {
  _id: string;
  name: string;
  date: Date | undefined;
};

export type CreateAuthor = Pick<Author, "name" | "date">;

export type AuthorResponse = Omit<Author, "_id" | "date"> & {
  date: string;
};
