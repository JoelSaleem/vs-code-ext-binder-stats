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

  let users = [];

  const usersQuery = query(USERS_ONLINE);

  usersQuery
    .result()
    .then((d) => {
      users = d.data.sessions.map(({ id, userId: { email } }) => [id, email]);
    })
    .catch((e) => {
      console.log(e);
    });
</script>

<div>
  <h2>Users</h2>

  <div>
    {#if users.length > 0}
    <ul>
      {#each users as [id, email], i}
      <li>{i + 1}: {id} - {email}</li>
      {/each}
    </ul>
    {:else}
    <p>No users online</p>
    {/if}
  </div>
</div>
