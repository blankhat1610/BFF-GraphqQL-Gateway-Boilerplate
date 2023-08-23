import { createTestContext } from "./__helpers";
import { Post } from "../api/graphql";

const ctx = createTestContext()

type Draft = {
    "createDraft": Post
}

it('ensures that a draft can be created and published', async () => {
    // Create a new draft
    const draftResult = await ctx.client.request<Promise<Draft>>(`
        mutation {
            createDraft(title: "Nexus", body: "..") {
                id
                title
                body
                published
            }
        }
    `)

    expect(draftResult).toMatchInlineSnapshot(`
{
  "createDraft": {
    "body": "..",
    "id": 1,
    "published": false,
    "title": "Nexus",
  },
}
`)

    // Publish the draft
    const publishResult = await ctx.client.request(`
        mutation publishDraft($draftId: Int!) {
            publish(draftId: $draftId) {
                id
                title
                body
                published
            }
        }
    `, { draftId: draftResult.createDraft.id })

    expect(publishResult).toMatchInlineSnapshot(`
{
  "publish": {
    "body": "..",
    "id": 1,
    "published": true,
    "title": "Nexus",
  },
}
`)

const persistedData = await ctx.db.post.findMany()
expect(persistedData).toMatchInlineSnapshot(`
[
  {
    "body": "body 2",
    "id": 2,
    "published": false,
    "title": "title 2",
  },
  {
    "body": "body 1",
    "id": 1,
    "published": true,
    "title": "title 1",
  },
  {
    "body": "..",
    "id": 3,
    "published": true,
    "title": "Nexus",
  },
  {
    "body": "..",
    "id": 4,
    "published": true,
    "title": "Nexus",
  },
  {
    "body": "..",
    "id": 5,
    "published": true,
    "title": "Nexus",
  },
  {
    "body": "..",
    "id": 6,
    "published": true,
    "title": "Nexus",
  },
]
`)
})