<script>
  import { query } from "svelte-apollo";
  import { gql } from "@apollo/client";

  const halfAnHourAgoEpoch = Date.now() - 1000 * 60 * 30;
  const halfAnHourAgoStr = new Date(halfAnHourAgoEpoch).toISOString();

  const USERS_ONLINE = gql`
    {
      sessions(where: { updatedAt_gt: "${halfAnHourAgoStr}" }) {
        id
        updatedAt

        userId {
          email
        }
      }
    }
  `;
  const Stuck_source_vids = gql`
    {
      sourceVideos(
        where: {
          stateValue_not: Complete
          updatedAt_lt: "2021-08-26T09:31:30.828Z"
          createdAt_gt: "2021-08-01T10:31:30.828Z"
        }
      ) {
        id
        title
      }
    }
  `;
  const stuck_output_groups = gql`
    {
      outputGroups(
        where: {
          stateValue_not: Complete
          updatedAt_lt: "2021-08-26T09:31:30.828Z"
          createdAt_gt: "2021-08-01T10:31:30.828Z"
        }
      ) {
        id
        translatedVideo {
          sourceVideo {
            title
          }
        }
      }
    }
  `;
  const stuck_tvs = gql`
    {
      translatedVideos(
        where: {
          stateValue_not_in: [
            ReadyToQA
            InProgressQA
            OutputGenerated
            Complete
            ReadyForPublish
          ]
          updatedAt_lt: "2021-08-26T08:31:30.828Z"
          createdAt_gt: "2021-08-01T10:31:30.828Z"
        }
      ) {
        id
        title
        stateValue
      }
    }
  `;

  let users = [];

  const a = query(USERS_ONLINE);
  $: {
    console.log("hello world foo", users);
  }

  a.result()
    .then((d) => {
      users = d.data.sessions.map(({ id, userId: { email } }) => [id, email]);

      console.log(users);
    })
    .catch((e) => {
      console.log(e);
    });
</script>

<div>
  users

  <ul>
    {#each users as [id, email], i}
    <li>{id}: {email}</li>
    {/each}
  </ul>
</div>
