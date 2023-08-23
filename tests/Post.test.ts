import { Post } from "../api/db";
import { createTestContext } from "./__helpers";

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
})