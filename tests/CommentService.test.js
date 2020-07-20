// jest test --runInBand --detectOpenHandles

const CommentService = require("../service/CommentService");

// Update with your config settings.
require("dotenv").config();

const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

let commentService;

describe("CommentService testing with commentservice", () => {
  let new_comment = {
    title: "Time for a great comment",
    body: "We should support this post more",
    user_id: 3,
    blog_id: 1,
  };

  let altered_comment = {
    title: "And great times were had by all",
    body: "^ Such inspirational titles",
    user_id: 1,
    blog_id: 2,
  };

  let new_like = {
    user_id: 2,
    comment_id: 3,
    like: true,
  };

  let altered_like = {
    user_id: 2,
    comment_id: 1,
    like: false,
  };

  beforeEach(async () => {
    await knex.migrate.rollback([{ directory: "../migrations" }]);
    await knex.migrate.latest([{ directory: "../migrations" }]);
    await knex.seed.run([{ directory: "../seeds" }]);

    commentService = new CommentService(knex);
  });

  afterAll(async () => {
    await knex.migrate.rollback([{ directory: "../migrations" }]);
    await knex.migrate.latest([{ directory: "../migrations" }]);
    await knex.seed.run([{ directory: "../seeds" }]);
  });

  test("commentService should call listComments", () => {
    expect.assertions(5);

    let id = 1;

    return commentService.listComments(id).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe("Who wrote this trash!");
      expect(results[0].body).toBe("Better go back to studying english!");
      expect(results[0].user_id).toBe(1);
      expect(results[0].blog_id).toBe(1);
    });
  });

  test("commentService should call getComment", () => {
    expect.assertions(5);

    let id = 2;

    return commentService.getComment(id).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe("Some great points!");
      expect(results[0].body).toBe("What genius wrote this!");
      expect(results[0].user_id).toBe(2);
      expect(results[0].blog_id).toBe(2);
    });
  });

  test("commentService should call addComment", () => {
    expect.assertions(5);

    return commentService.addComment(new_comment).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe(new_comment.title);
      expect(results[0].body).toBe(new_comment.body);
      expect(results[0].user_id).toBe(new_comment.user_id);
      expect(results[0].blog_id).toBe(new_comment.blog_id);
    });
  });

  test("commentService should call updateComment", () => {
    expect.assertions(5);

    let id = 2;

    return commentService.updateComment(altered_comment, id).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe(altered_comment.title);
      expect(results[0].body).toBe(altered_comment.body);
      expect(results[0].user_id).toBe(altered_comment.user_id);
      expect(results[0].blog_id).toBe(altered_comment.blog_id);
    });
  });

  test("commentService should call deleteComment", () => {
    expect.assertions(1);

    let id = 2;

    return commentService.deleteComment(id).then((result) => {
      expect(result).toBe(true);
    });
  });

  test("commentService should call listLikes", () => {
    expect.assertions(3);

    let id = 1;

    return commentService.listLikes(id).then((results) => {
      expect(results.length).toBe(2);
      expect(results[0]).toBe(0);
      expect(results[1]).toBe(1);
    });
  });

  test("commentService should call getLike", () => {
    expect.assertions(4);

    let id = 2;

    return commentService.getLike(id).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].like).toBe(true);
      expect(results[0].user_id).toBe(2);
      expect(results[0].comment_id).toBe(3);
    });
  });

  test("commentService should call addLike", () => {
    expect.assertions(4);

    return commentService.addLike(new_like).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].like).toBe(new_like.like);
      expect(results[0].comment_id).toBe(new_like.comment_id);
      expect(results[0].user_id).toBe(new_like.user_id);
    });
  });

  test("commentService should call updateLike", () => {
    expect.assertions(5);

    let id = 2;

    return commentService.updateLike(altered_like, id).then((results) => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe(altered_like.title);
      expect(results[0].body).toBe(altered_like.body);
      expect(results[0].user_id).toBe(altered_like.user_id);
      expect(results[0].blog_id).toBe(altered_like.blog_id);
    });
  });

  test("commentService should call deleteLike", () => {
    expect.assertions(1);

    let id = 2;

    return commentService.deleteLike(id).then((result) => {
      expect(result).toBe(true);
    });
  });
});
